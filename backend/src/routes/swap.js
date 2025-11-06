const express = require('express');
const router = express.Router();

module.exports = (prisma) => {
  // GET /api/swaps/swappable-slots
  router.get('/swappable-slots', async (req,res) => {
    const slots = await prisma.event.findMany({
      where: { status: 'SWAPPABLE', NOT: { ownerId: req.user.id } },
      include: { owner: { select: { id: true, name: true, email: true } } }
    });
    res.json(slots);
  });

  // POST /api/swaps/request
  // { mySlotId, theirSlotId }
  router.post('/request', async (req,res) => {
    try {
      const { mySlotId, theirSlotId } = req.body;
      console.log('Swap request received:', { mySlotId, theirSlotId, userId: req.user.id });
      
      if (!mySlotId || !theirSlotId) return res.status(400).json({ error: 'missing ids' });

      // verify ownership and status
      const [myEvent, theirEvent] = await Promise.all([
        prisma.event.findUnique({ where: { id: mySlotId } }),
        prisma.event.findUnique({ where: { id: theirSlotId } }),
      ]);

      console.log('Events found:', { myEvent, theirEvent });

      if (!myEvent || myEvent.ownerId !== req.user.id) return res.status(400).json({ error: 'invalid mySlot' });
      if (!theirEvent || theirEvent.ownerId === req.user.id) return res.status(400).json({ error: 'cannot swap with yourself' });
      if (myEvent.status !== 'SWAPPABLE' || theirEvent.status !== 'SWAPPABLE') {
        return res.status(400).json({ error: 'one or both slots not swappable' });
      }

      // create swap request and set both events to SWAP_PENDING
      const swap = await prisma.$transaction(async (tx) => {
        const created = await tx.swapRequest.create({
          data: {
            proposerId: req.user.id,
            responderId: theirEvent.ownerId,
            myEventId: myEvent.id,
            theirEventId: theirEvent.id,
            status: 'PENDING'
          }
        });
        await tx.event.updateMany({
          where: { id: { in: [myEvent.id, theirEvent.id] } },
          data: { status: 'SWAP_PENDING' }
        });
        console.log('Swap request created:', created);
        return created;
      });

      res.json(swap);
    } catch (error) {
      console.error('Error creating swap request:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // POST /api/swaps/response/:requestId  with { accept: true|false }
  router.post('/response/:requestId', async (req,res) => {
    const requestId = parseInt(req.params.requestId);
    const { accept } = req.body;
    const swap = await prisma.swapRequest.findUnique({ where: { id: requestId } });
    if (!swap) return res.status(404).json({ error: 'request not found' });
    if (swap.responderId !== req.user.id) return res.status(403).json({ error: 'not authorized' });
    if (swap.status !== 'PENDING') return res.status(400).json({ error: 'request not pending' });

    if (!accept) {
      // reject flow: mark REJECTED and set events back to SWAPPABLE
      const updated = await prisma.$transaction(async (tx) => {
        await tx.swapRequest.update({ where:{ id: requestId }, data: { status: 'REJECTED' } });
        await tx.event.updateMany({
          where: { id: { in: [swap.myEventId, swap.theirEventId] } },
          data: { status: 'SWAPPABLE' }
        });
        return { status: 'REJECTED' };
      });
      return res.json(updated);
    }

    // ACCEPT flow: swap ownership atomically and mark events BUSY, mark swap ACCEPTED
    const result = await prisma.$transaction(async (tx) => {
      // re-fetch events inside tx to ensure current status
      const myEvent = await tx.event.findUnique({ where: { id: swap.myEventId }});
      const theirEvent = await tx.event.findUnique({ where: { id: swap.theirEventId }});
      if (!myEvent || !theirEvent) throw new Error('events missing');
      if (myEvent.status !== 'SWAP_PENDING' || theirEvent.status !== 'SWAP_PENDING') {
        throw new Error('one or both events not in SWAP_PENDING');
      }

      // swap ownerId values
      const proposerId = swap.proposerId;
      const responderId = swap.responderId;

      // update events: swap ownerId, set status BUSY
      await tx.event.update({ where: { id: myEvent.id }, data: { ownerId: responderId, status: 'BUSY' }});
      await tx.event.update({ where: { id: theirEvent.id }, data: { ownerId: proposerId, status: 'BUSY' }});

      // mark swap ACCEPTED
      await tx.swapRequest.update({ where: { id: requestId }, data: { status: 'ACCEPTED' }});

      return { status: 'ACCEPTED' };
    }).catch(err => { throw err; });

    res.json(result);
  });

  // list incoming/outgoing for the user
  router.get('/requests', async (req,res) => {
    try {
      console.log('Fetching requests for user:', req.user.id);
      
      const incoming = await prisma.swapRequest.findMany({
        where: { responderId: req.user.id },
        include: { myEvent: true, theirEvent: true, proposer: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' }
      });
      const outgoing = await prisma.swapRequest.findMany({
        where: { proposerId: req.user.id },
        include: { myEvent: true, theirEvent: true, responder: { select: { id: true, name: true } } },
        orderBy: { createdAt: 'desc' }
      });
      
      console.log('Requests found:', { incoming: incoming.length, outgoing: outgoing.length });
      res.json({ incoming, outgoing });
    } catch (error) {
      console.error('Error fetching requests:', error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
