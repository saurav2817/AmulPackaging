/**
 * Google Sheet Integration Configuration & Service
 * Sheet: https://docs.google.com/spreadsheets/d/1bvMV5e2jUIRL5oNPcnIvUv97jK9mMrV8rY8F7LridTw/edit?gid=0#gid=0
 */

// Replace this placeholder or set VITE_GOOGLE_SHEET_WEBHOOK_URL in your .env file
const DEFAULT_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbyIsC3OX523OF7DBa6h2l53LjQMh6FlesG9zhO9U6xc5PXwLYyQPfrSyWRXZuIEpzQL-A/exec";

export const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1leOIaXJ6P76W0v3-frfHm-sTUIjbqtbEhXFhHna4ssc/edit?gid=0#gid=0";

export const getGoogleSheetWebhookUrl = () => {
  return import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL || DEFAULT_WEBHOOK_URL;
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
      "[Google Sheet] Webhook URL is not configured yet. Set VITE_GOOGLE_SHEET_WEBHOOK_URL in your .env file or update src/config/googleSheet.js. See GOOGLE_SHEET_SETUP.md for instructions."
    );
    return { success: false, message: "Webhook URL not configured" };
  }

  const payload = {
    names: name,
    name: name,
    "Phone ": phone,
    phone: phone,
    "email-id": email,
    email: email,
    Message: message,
    message: message,
  };

  try {
    // Note: mode: "no-cors" with "text/plain;charset=utf-8" prevents CORS preflight issues with Google Apps Script
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    return { success: true };
  } catch (error) {
    console.error("[Google Sheet] Failed to save lead:", error);
    return { success: false, error: error.message };
  }
};
