# Feature Update: Delete Events in SWAP_PENDING Status

## New Feature

You can now delete events that are in `SWAP_PENDING` status (events that are part of an active swap request).

## How It Works

### Backend Logic

When you delete an event that's in `SWAP_PENDING` status:

1. **Finds all pending swap requests** involving the event
2. **Cancels the swap requests** by marking them as `REJECTED`
3. **Resets the other event** back to `SWAPPABLE` status
4. **Deletes your event**

This ensures data consistency and prevents orphaned swap requests.

### Frontend Experience

#### Confirmation Dialog

When deleting an event:

- **Regular events (BUSY/SWAPPABLE)**: 
  - Shows: "Are you sure you want to delete this event?"
  
- **Events in swap (SWAP_PENDING)**:
  - Shows: "This event is part of a pending swap request. Deleting it will cancel the swap and notify the other user. Are you sure you want to delete it?"

#### After Deletion

- Success message: "Event deleted and swap request cancelled."
- The other user's event automatically returns to `SWAPPABLE` status
- The swap request is marked as `REJECTED`

## Use Cases

This feature is useful when:

1. **You change your mind** about a swap before it's accepted
2. **The event is no longer valid** (meeting cancelled, etc.)
3. **You want to cancel** a pending swap request
4. **You need to remove** an event that's stuck in pending

## Technical Implementation

### Backend (routes/events.js)

```javascript
// If event is in SWAP_PENDING, cancel swap and reset other event
if (event.status === 'SWAP_PENDING') {
  await prisma.$transaction(async (tx) => {
    // Find and cancel swap requests
    const swapRequests = await tx.swapRequest.findMany({
      where: {
        OR: [{ myEventId: id }, { theirEventId: id }],
        status: 'PENDING'
      }
    });

    // Cancel swaps and reset other events
    for (const swap of swapRequests) {
      await tx.swapRequest.update({
        where: { id: swap.id },
        data: { status: 'REJECTED' }
      });

      const otherEventId = swap.myEventId === id ? swap.theirEventId : swap.myEventId;
      await tx.event.update({
        where: { id: otherEventId },
        data: { status: 'SWAPPABLE' }
      });
    }

    await tx.event.delete({where:{id}});
  });
}
```

### Frontend (Dashboard.jsx)

```javascript
const handleDeleteEvent = async (eventId, status) => {
  let confirmMessage = 'Are you sure you want to delete this event?';
  
  if (status === 'SWAP_PENDING') {
    confirmMessage = 'This event is part of a pending swap request. Deleting it will cancel the swap and notify the other user. Are you sure you want to delete it?';
  }
  
  if (!confirm(confirmMessage)) return;
  
  // Delete event
  await axios.delete(`/events/${eventId}`);
  
  if (status === 'SWAP_PENDING') {
    alert('Event deleted and swap request cancelled.');
  }
};
```

## Impact on Other Users

When you delete an event in `SWAP_PENDING`:

- **The other user** will see their event return to `SWAPPABLE` status
- **The swap request** will show as `REJECTED` in their Requests page
- **They can immediately** mark their event as swappable again or request other swaps

## Testing

To test this feature:

1. Create two users (User A and User B)
2. Both create swappable events
3. User A requests a swap with User B's event
4. Both events are now `SWAP_PENDING`
5. User A deletes their event
6. Verify:
   - User A's event is deleted
   - User B's event returns to `SWAPPABLE`
   - Swap request shows as `REJECTED`

## Benefits

✅ **Data Consistency** - No orphaned swap requests  
✅ **User Control** - Can cancel swaps by deleting events  
✅ **Clear Communication** - Confirmation dialog explains the impact  
✅ **Automatic Cleanup** - Other user's event is automatically reset  
✅ **Transaction Safety** - Uses database transactions for atomicity

---

**Status**: ✅ Implemented and Ready to Use
