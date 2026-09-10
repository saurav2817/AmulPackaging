# Product Enquiry Google Sheet Integration Setup Guide

This guide explains how to connect your **Product Enquiry Modal** (`enquiryModal.jsx`) to your Google Sheet:
👉 **[Amul Packaging Product Enquiry Sheet](https://docs.google.com/spreadsheets/d/1wTgzaGYerR60YS_aITWjVpQgAxE2vAPmvgSuWskQkmI/edit?usp=sharing)**

---

## ⚠️ Important: Access Setting
When deploying Google Apps Script as a Web App:
- **"Who has access" MUST be set to "Anyone"** so that form submissions from the website can be received without requiring the user to log in.
- If left as "Only myself", Google blocks submissions with a `401 Unauthorized`.

---

## Step 1: Open Apps Script in Your Google Sheet

1. Open your Google Sheet in your browser:  
   👉 `https://docs.google.com/spreadsheets/d/1wTgzaGYerR60YS_aITWjVpQgAxE2vAPmvgSuWskQkmI/edit?usp=sharing`
2. In the top menu bar, click on **Extensions** → **Apps Script**.
3. A new tab will open with the Apps Script editor.

---

## Step 2: Paste the Script Code

1. In the Apps Script editor, delete any default code inside `Code.gs`.
2. Copy all code from the project file [`google-apps-script/EnquiryCode.gs`](./google-apps-script/EnquiryCode.gs).
3. Paste the code into the Apps Script editor.
4. Click the **Save project** icon (floppy disk) or press `Ctrl + S`.

---

## Step 3: Deploy as Web App

1. Click the blue **Deploy** button (top-right corner) → **New deployment**.
2. Click the gear icon (**Select type**) next to "Select type" and choose **Web app**.
3. Fill in the deployment details:
   - **Description**: `Amul Packaging Enquiry Modal Webhook`
   - **Execute as**: `Me (your google account email)`
   - **Who has access**: `Anyone` 🔴 *(Crucial: Do NOT choose "Only myself")*
4. Click **Deploy**.
5. When Google prompts for authorization:
   - Click **Authorize access**.
   - Select your Google account.
   - Click **Advanced** (small text in lower left).
   - Click **Go to Untitled project (unsafe)** (or project title).
   - Click **Allow**.
6. Google will give you your **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).
7. **Copy this Web app URL**.

---

## Step 4: Test Web App URL in Your Browser

Open a new browser tab and paste your Web app URL:
- You should see:
  ```json
  {
    "status": "active",
    "service": "Amul Packaging Product Enquiry Webhook",
    "connectedSheet": "Sheet1",
    "spreadsheetId": "1wTgzaGYerR60YS_aITWjVpQgAxE2vAPmvgSuWskQkmI"
  }
  ```

---

## Step 5: Add Webhook URL to Your Project

Add or update the URL in your environment file:

### Option A: In `.env` (Recommended)
Add this line to your `.env` file:
```env
VITE_ENQUIRY_GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

### Option B: In `src/config/enquiryGoogleSheet.js`
Update `DEFAULT_ENQUIRY_WEBHOOK_URL`:
```javascript
const DEFAULT_ENQUIRY_WEBHOOK_URL = "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec";
```

---

## Sheet Column Structure

The script automatically initializes and fills these 8 columns in your spreadsheet:
| Column | Header | Description |
|---|---|---|
| A | `Name` | Customer's full name |
| B | `Email` | Customer's email address |
| C | `Phone` | Customer's phone number |
| D | `Company Name` | Company name |
| E | `Company Website` | Company website URL |
| F | `Product` | Product being enquired about |
| G | `Message` | Requirement / message |
| H | `Date & Time` | Submission timestamp in IST |
