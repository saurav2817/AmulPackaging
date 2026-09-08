# Google Sheet Integration Setup Guide

This guide explains how to connect your contact form to your Google Sheet:
**[Amul Packaging Lead Sheet](https://docs.google.com/spreadsheets/d/1bvMV5e2jUIRL5oNPcnIvUv97jK9mMrV8rY8F7LridTw/edit?gid=0#gid=0)**

---

## Step 1: Open Apps Script in Your Google Sheet

1. Open your Google Sheet in your browser:
   `https://docs.google.com/spreadsheets/d/1bvMV5e2jUIRL5oNPcnIvUv97jK9mMrV8rY8F7LridTw/edit?gid=0#gid=0`
2. In the top menu bar, click on **Extensions** → **Apps Script**.
3. A new tab will open with the Apps Script editor.

---

## Step 2: Paste the Script Code

1. Delete any existing sample code in the editor (`function myFunction() { ... }`).
2. Copy all code from the file [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) and paste it into the editor.
3. Click the **Save project** icon (floppy disk) or press `Ctrl + S`.

---

## Step 3: Deploy as Web App

1. Click the blue **Deploy** button in the top right corner → select **New deployment**.
2. Click the gear icon (**Select type**) next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Amul Packaging Contact Form`
   - **Execute as**: `Me (your email)`
   - **Who has access**: `Anyone` *(Crucial: must be 'Anyone' so the website can submit leads without logging in)*
4. Click **Deploy**.
5. Google will ask you to **Authorize access**:
   - Click **Authorize access**.
   - Select your Google account.
   - Click **Advanced** (bottom left of modal).
   - Click **Go to Untitled project (unsafe)**.
   - Click **Allow**.
6. Google will provide you with a **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).
7. Copy this **Web app URL**.

---

## Step 4: Add the URL to Your Project

You can add the copied URL in either of two ways:

### Method A: In `.env` file (Recommended)
Add this line to your `.env` or `.env.local` file:
```env
VITE_GOOGLE_SHEET_WEBHOOK_URL="YOUR_COPIED_WEB_APP_URL_HERE"
```

### Method B: Directly in `src/config/googleSheet.js`
Open `src/config/googleSheet.js` and paste your URL in `DEFAULT_WEBHOOK_URL`:
```javascript
const DEFAULT_WEBHOOK_URL = "YOUR_COPIED_WEB_APP_URL_HERE";
```

---

## Sheet Column Mapping

The script automatically maps submissions to your exact sheet headers:
| Form Field | Sheet Column Header | Description |
|---|---|---|
| `name` | `names` | Customer's full name |
| `phone` | `Phone ` | Phone number (with leading 0/+ preserved) |
| `email` | `email-id` | Customer's email address |
| `message` | `Message` | Customer's inquiry message |
| *(auto)* | `Date & Time` | Timestamp in IST (Indian Standard Time) |

Both email sending (via SMTP) and Google Sheet logging will execute simultaneously upon submission!
