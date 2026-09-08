/**
 * Google Apps Script for Amul Packaging Contact Form
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1leOIaXJ6P76W0v3-frfHm-sTUIjbqtbEhXFhHna4ssc/edit?gid=0#gid=0
 * 
 * Columns mapped:
 * 1. names       (Name of the customer)
 * 2. Phone       (Phone number)
 * 3. email-id    (Email address)
 * 4. Message     (Message / requirements)
 * 5. Date & Time (Submission timestamp in IST)
 */

// Target spreadsheet ID (extracted from sheet URL: /d/1leOIaXJ6P76W0v3-frfHm-sTUIjbqtbEhXFhHna4ssc/edit)
var SPREADSHEET_ID = "1leOIaXJ6P76W0v3-frfHm-sTUIjbqtbEhXFhHna4ssc";

function getTargetSheet() {
  if (SPREADSHEET_ID && SPREADSHEET_ID.length > 10) {
    try {
      var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
      return ss.getSheets()[0];
    } catch (e) {
      Logger.log("openById failed, trying getActiveSpreadsheet: " + e.message);
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet().getSheets()[0];
}

function doPost(e) {
  var lock = LockService.getScriptLock();
  // Wait up to 10 seconds for other operations to finish to prevent collisions
  lock.tryLock(10000);

  try {
    var sheet = getTargetSheet();
    if (!sheet) {
      throw new Error("Could not access Google Sheet. Please check permissions or spreadsheet ID.");
    }

    var data = {};
    if (e && e.postData && e.postData.contents) {
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        data = e.parameter || {};
      }
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    // Extract fields with multiple fallbacks for casing/naming
    var name = data.name || data.names || data.Name || data.fullName || "";
    var phone = data.phone || data.Phone || data["Phone "] || data.mobile || "";
    var email = data.email || data["email-id"] || data.emailId || data.Email || "";
    var message = data.message || data.Message || data.msg || "";
    
    // Format timestamp in IST (Indian Standard Time)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");

    // Ensure header row has 'Date & Time' in column 5 if not present
    var lastCol = sheet.getLastColumn();
    if (lastCol < 5) {
      sheet.getRange(1, 5).setValue("Date & Time");
    }

    // Deduplication check: Ignore identical submission if already logged in the last row
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      var lastValues = sheet.getRange(lastRow, 1, 1, 4).getValues()[0];
      var lastCustName = String(lastValues[0] || "").trim();
      var lastCustEmail = String(lastValues[2] || "").trim();
      var lastCustMsg = String(lastValues[3] || "").trim();

      if (
        lastCustName === String(name).trim() &&
        lastCustEmail === String(email).trim() &&
        lastCustMsg === String(message).trim()
      ) {
        return ContentService
          .createTextOutput(JSON.stringify({ 
            result: "ignored_duplicate", 
            message: "Duplicate lead submission ignored",
            row: lastRow
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Append the row matching the sheet's exact column order:
    // [names, Phone, email-id, Message, Date & Time]
    sheet.appendRow([
      name,
      phone ? "'" + phone : "", // Prepend single quote so Google Sheets doesn't strip leading zeros or plus signs
      email,
      message,
      timestamp
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "success", 
        message: "Lead saved successfully",
        row: sheet.getLastRow()
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "error", 
        message: error.toString() 
      }))
      .setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  try {
    var sheet = getTargetSheet();
    var sheetName = sheet ? sheet.getName() : "Unknown";
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "active",
        service: "Amul Packaging Contact Form Webhook",
        connectedSheet: sheetName,
        spreadsheetId: SPREADSHEET_ID,
        timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss")
      }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({
        status: "error",
        error: err.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
