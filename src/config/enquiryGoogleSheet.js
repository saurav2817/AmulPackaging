/**
 * Google Sheet Integration for Product Enquiry Modal
 * Sheet: https://docs.google.com/spreadsheets/d/1wTgzaGYerR60YS_aITWjVpQgAxE2vAPmvgSuWskQkmI/edit?usp=sharing
 */

// Default fallback webhook URL (can be overridden via VITE_ENQUIRY_GOOGLE_SHEET_WEBHOOK_URL in .env)
const DEFAULT_ENQUIRY_WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbx0gWx4Ji7lmje6kkwbM2heFmpoqjhLBy8WC2jMfMNQWz3uyEAOwIsVxsEoq_58epou/exec";

export const ENQUIRY_GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/1wTgzaGYerR60YS_aITWjVpQgAxE2vAPmvgSuWskQkmI/edit?usp=sharing";

export const getEnquiryGoogleSheetWebhookUrl = () => {
  const envUrl = import.meta.env.VITE_ENQUIRY_GOOGLE_SHEET_WEBHOOK_URL;
  return (envUrl && envUrl.trim()) ? envUrl.trim() : DEFAULT_ENQUIRY_WEBHOOK_URL;
};

/**
 * Submit Product Enquiry lead details to Google Sheet.
 * Maps:
 * - name            -> Name
 * - email           -> Email
 * - phone           -> Phone
 * - companyName     -> Company Name
 * - companyWebsite  -> Company Website
 * - product         -> Product
 * - message         -> Message
 * 
 * @param {Object} data - { name, email, phone, companyName, companyWebsite, product, message }
 * @returns {Promise<{ success: boolean, message?: string }>}
 */
export const submitEnquiryToGoogleSheet = async ({
  name,
  email,
  phone,
  companyName,
  companyWebsite,
  product,
  message
}) => {
  const webhookUrl = getEnquiryGoogleSheetWebhookUrl();

  if (!webhookUrl) {
    console.warn(
      "[Enquiry Google Sheet] Webhook URL is not configured yet. Set VITE_ENQUIRY_GOOGLE_SHEET_WEBHOOK_URL in your .env file. See ENQUIRY_SHEET_SETUP.md for instructions."
    );
    return { success: false, message: "Webhook URL not configured" };
  }

  const payload = {
    name: name || "",
    names: name || "",
    email: email || "",
    "email-id": email || "",
    phone: phone || "",
    "Phone ": phone || "",
    companyName: companyName || "",
    companyWebsite: companyWebsite || "",
    CompanyWebsite: companyWebsite || "",
    product: product || "",
    message: message || "",
    Message: message || ""
  };

  try {
    console.log("[Enquiry Google Sheet] Dispatching enquiry to Google Apps Script webhook...");

    // Note: mode: "no-cors" with "text/plain;charset=utf-8" avoids CORS preflight issues with Google Apps Script
    await fetch(webhookUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log("[Enquiry Google Sheet] Enquiry successfully dispatched to webhook!");
    return { success: true };
  } catch (error) {
    console.error("[Enquiry Google Sheet] Failed to save enquiry:", error);
    return { success: false, error: error.message };
  }
};
