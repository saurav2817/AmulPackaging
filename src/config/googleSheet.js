/**
 * Google Sheet Integration Configuration & Service
 * Sheet: https://docs.google.com/spreadsheets/d/1leOIaXJ6P76W0v3-frfHm-sTUIjbqtbEhXFhHna4ssc/edit?gid=0#gid=0
 */

// Default fallback webhook URL (can be overridden via VITE_GOOGLE_SHEET_WEBHOOK_URL in .env or .env.local)
const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbzyFSuZWErG5NVrYZ3_GdYvApfYDtTx_9UcmjG90S2FQPfRMrWHWuCDl_F0kmx7TeyzDA/exec";

export const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1leOIaXJ6P76W0v3-frfHm-sTUIjbqtbEhXFhHna4ssc/edit?gid=0#gid=0";

export const getGoogleSheetWebhookUrl = () => {
  const envUrl = import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL;
  return (envUrl && envUrl.trim()) ? envUrl.trim() : DEFAULT_WEBHOOK_URL;
};

/**
 * Submit contact form lead details to Google Sheet.
 * Maps:
 * - name    -> names
 * - phone   -> Phone 
 * - email   -> email-id
 * - message -> Message
 * 
 * @param {Object} data - { name, phone, email, message }
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const submitToGoogleSheet = async ({ name, phone, email, message }) => {
  const webhookUrl = getGoogleSheetWebhookUrl();

  if (!webhookUrl) {
    console.warn(
      "[Google Sheet] Webhook URL is not configured yet. Set VITE_GOOGLE_SHEET_WEBHOOK_URL in your .env or .env.local file. See GOOGLE_SHEET_SETUP.md for instructions."
    );
    return { success: false, message: "Webhook URL not configured" };
  }

  const payload = {
    names: name || "",
    name: name || "",
    "Phone ": phone || "",
    Phone: phone || "",
    phone: phone || "",
    "email-id": email || "",
    emailId: email || "",
    email: email || "",
    Message: message || "",
    message: message || "",
  };

  try {
    console.log("[Google Sheet] Dispatching lead to Google Apps Script webhook...");

    // Note: mode: "no-cors" with "text/plain;charset=utf-8" prevents CORS preflight issues with Google Apps Script
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log("[Google Sheet] Lead successfully dispatched to webhook!");
    return { success: true };
  } catch (error) {
    console.error("[Google Sheet] Failed to save lead:", error);
    return { success: false, error: error.message };
  }
};
