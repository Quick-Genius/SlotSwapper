const express = require('express');
const router = express.Router();

module.exports = (prisma) => {
  // create event
  router.post('/', async (req,res) => {
    const { title, startTime, endTime } = req.body;
    const event = await prisma.event.create({
      data: {
        title,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        ownerId: req.user.id,
        status: 'BUSY'
      }
    });
    res.json(event);
  });

  // get user's events
  router.get('/', async (req,res) => {
    const events = await prisma.event.findMany({
      where: { ownerId: req.user.id }
    });
    res.json(events);
  });

  // update event status or details
  router.patch('/:id', async (req,res) => {
    const id = parseInt(req.params.id);
    const event = await prisma.event.findUnique({where:{id}});
    if (!event || event.ownerId !== req.user.id) return res.status(404).json({error:'not found'});
    const { title, startTime, endTime, status } = req.body;
    const updated = await prisma.event.update({
      where: { id },
      data: { title, startTime: startTime ? new Date(startTime) : undefined, endTime: endTime ? new Date(endTime) : undefined, status }
    });
    res.json(updated);
  });

  // delete
  router.delete('/:id', async (req,res) => {
    try {
      const id = parseInt(req.params.id);
      const event = await prisma.event.findUnique({where:{id}});
      if (!event || event.ownerId !== req.user.id) return res.status(404).json({error:'not found'});
      
      // Use transaction to handle deletion safely
      await prisma.$transaction(async (tx) => {
        // Find all swap requests involving this event (pending or not)
        const allSwapRequests = await tx.swapRequest.findMany({
          where: {
            OR: [
              { myEventId: id },
              { theirEventId: id }
            ]
          }
        });

        // Handle pending swap requests
        const pendingSwaps = allSwapRequests.filter(swap => swap.status === 'PENDING');
        for (const swap of pendingSwaps) {
          // Mark swap as rejected
          await tx.swapRequest.update({
            where: { id: swap.id },
            data: { status: 'REJECTED' }
          });

          // Reset the other event back to SWAPPABLE
          const otherEventId = swap.myEventId === id ? swap.theirEventId : swap.myEventId;
          await tx.event.update({
            where: { id: otherEventId },
            data: { status: 'SWAPPABLE' }
          });
        }

        // Delete all swap requests involving this event
        await tx.swapRequest.deleteMany({
          where: {
            OR: [
              { myEventId: id },
              { theirEventId: id }
            ]
          }
        });

        // Now delete the event
        await tx.event.delete({where:{id}});
      });
      
      res.json({ ok: true });
    } catch (error) {
      console.error('Error deleting event:', error);
      res.status(500).json({ error: error.message });
    }
  });

  return router;
}
