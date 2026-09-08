# Google Sheet Integration Setup Guide

This guide explains how to connect your contact form to your Google Sheet:
**[Amul Packaging Lead Sheet](https://docs.google.com/spreadsheets/d/1leOIaXJ6P76W0v3-frfHm-sTUIjbqtbEhXFhHna4ssc/edit?gid=0#gid=0)**

---

## ⚠️ Why Form Submissions Might Not Save (The #1 Common Issue)

When deploying Google Apps Script as a Web App:
- If **"Who has access"** is left as **"Only myself"** (the default), Google will **block all incoming form submissions** with a `401 Unauthorized` or redirect to Google Login.
- **You MUST set "Who has access" to "Anyone"** so the website can submit leads without requiring Google login.

---

## Step 1: Open Apps Script in Your Google Sheet

1. Open your Google Sheet in your browser:  
   👉 `https://docs.google.com/spreadsheets/d/1leOIaXJ6P76W0v3-frfHm-sTUIjbqtbEhXFhHna4ssc/edit?gid=0#gid=0`
2. In the top menu bar, click on **Extensions** → **Apps Script**.
3. A new tab will open with the Apps Script editor.

---

## Step 2: Paste the Updated Script Code

1. Delete any existing code in the editor (`Code.gs`).
2. Copy all code from the project file [`google-apps-script/Code.gs`](./google-apps-script/Code.gs) and paste it into the editor.
3. Click the **Save project** icon (floppy disk) or press `Ctrl + S`.

---

## Step 3: Deploy as Web App (CRITICAL SETTINGS)

1. Click the blue **Deploy** button in the top right corner.
2. Select **New deployment** (or **Manage deployments** → edit pencil icon → **Version: New version**).
3. If creating a new deployment:
   - Click the gear icon (**Select type**) next to "Select type" and choose **Web app**.
4. Fill in the deployment details:
   - **Description**: `Amul Packaging Contact Form`
   - **Execute as**: `Me (your Google account email)`
   - **Who has access**: `Anyone` 🔴 **(MUST BE "Anyone" - DO NOT select "Only myself" or "Anyone with Google Account")**
5. Click **Deploy**.
6. If Google asks you to **Authorize access**:
   - Click **Authorize access**.
   - Select your Google account.
   - Click **Advanced** (small text in the bottom left).
   - Click **Go to Untitled project (unsafe)** (or your project name).
   - Click **Allow**.
7. Google will provide you with your **Web app URL** (starts with `https://script.google.com/macros/s/.../exec`).
8. Copy this **Web app URL**.

---

## Step 4: Verify Your Web App URL in Your Browser

Before updating your project, open a new browser tab and paste your Web app URL:
- You should see a JSON response like:
  ```json
  {"status":"active","service":"Amul Packaging Contact Form Webhook","connectedSheet":"Sheet1",...}
  ```
- If it asks you to log in to Google or shows an error, check that **"Who has access"** is set to **"Anyone"**.

---

## Step 5: Update Your Web App URL in the Project

Add or update the URL in:

### 1. `.env` and `.env.local` file:
```env
VITE_GOOGLE_SHEET_WEBHOOK_URL="https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
```

### 2. `src/config/googleSheet.js`:
Update `DEFAULT_WEBHOOK_URL` to match your new URL.

---

## Sheet Column Mapping

The script automatically maps submissions to your exact sheet headers:
| Form Field | Sheet Column Header | Description |
|---|---|---|
| `name` | `names` | Customer's full name |
| `phone` | `Phone` | Phone number (with leading 0/+ preserved) |
| `email` | `email-id` | Customer's email address |
| `message` | `Message` | Customer's inquiry message |
| *(auto)* | `Date & Time` | Timestamp in IST (Indian Standard Time) |
