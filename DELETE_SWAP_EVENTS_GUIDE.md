# Guide: Deleting Events in Swap Requests

## Overview

You can now delete events at any time, including events that are part of pending swap requests. The system will automatically handle cleanup and notify affected users.

## Step-by-Step Guide

### Scenario 1: Deleting a Regular Event

**Event Status**: BUSY or SWAPPABLE

1. Go to **Dashboard**
2. Find the event you want to delete
3. Click the **Delete** button
4. Confirm: "Are you sure you want to delete this event?"
5. Event is deleted immediately

**Result**: Event removed from your calendar

---

### Scenario 2: Deleting an Event in a Pending Swap

**Event Status**: SWAP_PENDING

1. Go to **Dashboard**
2. Find the event with "Swap in progress..." status
3. Click the **Delete** button (now enabled!)
4. See enhanced confirmation:
   ```
   This event is part of a pending swap request. 
   Deleting it will cancel the swap and notify the other user. 
   Are you sure you want to delete it?
   ```
5. Click **OK** to confirm
6. See success message: "Event deleted and swap request cancelled."

**Result**: 
- Your event is deleted
- Swap request is cancelled (marked as REJECTED)
- Other user's event returns to SWAPPABLE status
- Other user can see the rejected request in their Requests page

---

## What Happens Behind the Scenes

### When You Delete a SWAP_PENDING Event:

```
Before:
┌─────────────────────────────────────────────────────┐
│ Your Event: "Team Meeting" (SWAP_PENDING)          │
│ Their Event: "Focus Block" (SWAP_PENDING)          │
│ Swap Request: PENDING                               │
└─────────────────────────────────────────────────────┘

You click Delete on "Team Meeting"

After:
┌─────────────────────────────────────────────────────┐
│ Your Event: DELETED ❌                              │
│ Their Event: "Focus Block" (SWAPPABLE) ✅          │
│ Swap Request: REJECTED ❌                           │
└─────────────────────────────────────────────────────┘
```

### Database Operations (Atomic Transaction):

1. Find all pending swap requests involving your event
2. Mark swap requests as REJECTED
3. Find the other event(s) in the swap
4. Reset other event(s) to SWAPPABLE status
5. Delete your event

All operations happen in a single transaction - either all succeed or all fail (no partial updates).

---

## User Experience Examples

### Example 1: You Change Your Mind

**Situation**: You requested a swap but changed your mind

**Action**: Delete your event that's in SWAP_PENDING

**Outcome**:
- Your event is removed
- The other person's event becomes available again
- They see the swap was rejected
- No hard feelings - they can find another swap!

---

### Example 2: Meeting Cancelled

**Situation**: Your meeting was cancelled while a swap was pending

**Action**: Delete the event

**Outcome**:
- Event removed from your calendar
- Swap automatically cancelled
- Other person's slot freed up for other swaps
- Clean and automatic!

---

### Example 3: Stuck in Pending

**Situation**: Event stuck in SWAP_PENDING and you want to move on

**Action**: Delete the event

**Outcome**:
- Clears the pending state
- Frees up the other person's slot
- You can create a new event if needed

---

## Important Notes

### ⚠️ This Action Cannot Be Undone

Once you delete an event:
- The event is permanently removed
- The swap request is cancelled
- You cannot recover the event

### ✅ Safe for Other Users

When you delete:
- Other user's event is NOT deleted
- Their event returns to SWAPPABLE
- They can immediately use it for other swaps
- No data loss for them

### 🔄 Automatic Cleanup

The system automatically:
- Cancels all related swap requests
- Resets other events to proper status
- Maintains database consistency
- No manual cleanup needed

---

## Comparison: Before vs After

### Before This Feature

❌ Delete button disabled for SWAP_PENDING events  
❌ Had to wait for other user to reject  
❌ Events could get stuck in pending  
❌ No way to cancel a swap you initiated  

### After This Feature

✅ Delete button always enabled  
✅ Can cancel swaps anytime  
✅ Clear confirmation dialog  
✅ Automatic cleanup of related data  
✅ Other user's event automatically freed  

---

## FAQ

**Q: What if I accidentally delete an event in a swap?**  
A: The deletion is permanent, but you can create a new event and request a new swap if needed.

**Q: Will the other user be notified?**  
A: They'll see the swap request as REJECTED in their Requests page, and their event will return to SWAPPABLE status.

**Q: Can I delete an event if multiple swaps are pending?**  
A: Yes! The system will cancel ALL pending swaps involving that event.

**Q: What happens to accepted or rejected swaps?**  
A: Only PENDING swaps are affected. Historical swaps (ACCEPTED/REJECTED) remain unchanged.

**Q: Is this safe to use?**  
A: Yes! All operations use database transactions to ensure data consistency.

---

## Testing Checklist

To verify this feature works:

- [ ] Create an event and mark it SWAPPABLE
- [ ] Request a swap (event becomes SWAP_PENDING)
- [ ] Verify Delete button is enabled
- [ ] Click Delete
- [ ] See enhanced confirmation message
- [ ] Confirm deletion
- [ ] Verify event is deleted
- [ ] Check other user's event is SWAPPABLE again
- [ ] Verify swap request shows as REJECTED

---

**Feature Status**: ✅ Live and Ready to Use  
**Last Updated**: November 6, 2025
