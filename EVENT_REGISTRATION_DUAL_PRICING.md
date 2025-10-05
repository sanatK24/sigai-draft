# Event Registration - Dual Pricing System

## Overview
The event registration system now supports **two different pricing tiers**:
- **ACM Member Rate** - Discounted price for ACM members
- **Non-Member Rate** - Standard price for non-members

## How It Works

### 1. Event Data Structure
Each event in `events_local.json` can now have:

```json
{
  "registration_fee": 200,              // Backward compatibility (non-member rate)
  "registration_fee_member": 100,       // ACM Member discounted rate
  "registration_fee_non_member": 200    // Non-member standard rate
}
```

### 2. Dynamic Fee Calculation
- When user selects **"Yes"** for ACM membership → Shows member rate
- When user selects **"No"** for ACM membership → Shows non-member rate
- QR code updates automatically with the correct amount

### 3. Display Logic

#### Event Details Page (Top-right card):
```
Registration Fees
ACM Members:     ₹100
Non-Members:     ₹200
```

#### Event Badge:
```
₹100 - ₹200
```

#### Payment Page QR Code:
```
₹100 (ACM Member Rate)
or
₹200 (Non-Member Rate)
```

## Example Event Configurations

### Paid Event with Dual Pricing
```json
{
  "title": "AI Workshop 2025",
  "registration_fee": 200,
  "registration_fee_member": 100,
  "registration_fee_non_member": 200
}
```

### Free Event
```json
{
  "title": "Tech Talk",
  "registration_fee": 0,
  "registration_fee_member": 0,
  "registration_fee_non_member": 0
}
```

### Legacy Event (Single Price)
```json
{
  "title": "Old Event",
  "registration_fee": 150
}
```
*Note: Will work as before, showing ₹150 for everyone*

## Features Implemented

✅ **Dynamic QR Code** - Amount updates based on membership selection
✅ **Fee Display** - Shows both rates in event details
✅ **Form Validation** - Ensures ACM ID is entered when claiming membership
✅ **Backward Compatibility** - Old events with single `registration_fee` still work
✅ **Visual Indicators** - Color-coded badges (green for member, blue for non-member)

## User Flow

1. **User fills registration form**
2. **Selects ACM membership status**
   - If "Yes" → Must enter ACM Membership ID
   - If "No" → Membership ID field hidden
3. **Fee updates dynamically**
4. **Clicks "Continue to Payment"**
5. **QR code shows correct amount**
6. **User scans and pays**
7. **Enters transaction ID**
8. **Submits registration**

## Payment Screenshot (Currently Commented Out)

The payment proof upload field is commented out but can be re-enabled by uncommenting lines in the registration form.

## UPI Payment String Format

```
upi://pay?pa=sanat.karkhanis2@okicici&am=<AMOUNT>&cu=INR
```

Where `<AMOUNT>` is dynamically set based on:
- `registration_fee_member` if ACM member
- `registration_fee_non_member` if non-member

## Next Steps (Pending Approval)

### Database Options for Storing Registrations:
1. **Google Sheets API** (Recommended)
2. **Google Apps Script**
3. **Airtable API**
4. **MongoDB Atlas Free Tier**
5. **Vercel KV (Redis)**

Choose one and we'll implement the backend to save registration data!
