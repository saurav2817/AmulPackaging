/**
 * Google Apps Script for Amul Packaging Product Enquiry Modal Form
 * Spreadsheet: https://docs.google.com/spreadsheets/d/1wTgzaGYerR60YS_aITWjVpQgAxE2vAPmvgSuWskQkmI/edit?usp=sharing
 * 
 * Columns:
 * 1. Name             (Customer Full Name)
 * 2. Email            (Email Address)
 * 3. Phone            (Phone Number)
 * 4. Company Name     (Company / Business Name)
 * 5. Company Website  (Website URL)
 * 6. Product          (Product Name enquired about)
 * 7. Message          (Requirement / Message)
 * 8. Date & Time      (Timestamp in IST)
 */

// Target spreadsheet ID (from URL: https://docs.google.com/spreadsheets/d/1wTgzaGYerR60YS_aITWjVpQgAxE2vAPmvgSuWskQkmI/edit)
var SPREADSHEET_ID = "1wTgzaGYerR60YS_aITWjVpQgAxE2vAPmvgSuWskQkmI";

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
    var email = data.email || data["email-id"] || data.emailId || data.Email || "";
    var phone = data.phone || data.Phone || data["Phone "] || data.mobile || "";
    var companyName = data.companyName || data.company || data.CompanyName || data["Company Name"] || "";
    var companyWebsite = data.companyWebsite || data.CompanyWebsite || data.website || data.Website || data["Company Website"] || "";
    var product = data.product || data.Product || data.productName || data["Product Name"] || "";
    var message = data.message || data.Message || data.requirement || data.requirements || "";
    
    // Format timestamp in IST (Indian Standard Time)
    var timestamp = Utilities.formatDate(new Date(), "Asia/Kolkata", "dd/MM/yyyy HH:mm:ss");

    // Initialize headers if sheet is empty or has fewer than 8 columns
    var lastCol = sheet.getLastColumn();
    var lastRow = sheet.getLastRow();
    
    if (lastRow === 0 || lastCol === 0) {
      var defaultHeaders = ["Name", "Email", "Phone", "Company Name", "Company Website", "Product", "Message", "Date & Time"];
      sheet.appendRow(defaultHeaders);
      sheet.getRange(1, 1, 1, defaultHeaders.length).setFontWeight("bold");
    } else if (lastRow === 1 && sheet.getRange(1, 1).getValue() === "") {
      var defaultHeaders = ["Name", "Email", "Phone", "Company Name", "Company Website", "Product", "Message", "Date & Time"];
      sheet.getRange(1, 1, 1, defaultHeaders.length).setValues([defaultHeaders]).setFontWeight("bold");
    }

    // Deduplication check: Ignore identical submission if already logged in the last row
    var currentRowCount = sheet.getLastRow();
    if (currentRowCount > 1) {
      var lastValues = sheet.getRange(currentRowCount, 1, 1, Math.min(sheet.getLastColumn(), 8)).getValues()[0];
      var lastCustName = String(lastValues[0] || "").trim();
      var lastCustEmail = String(lastValues[1] || "").trim();
      var lastCustProduct = String(lastValues[5] || "").trim();
      var lastCustMsg = String(lastValues[6] || "").trim();

      if (
        lastCustName === String(name).trim() &&
        lastCustEmail === String(email).trim() &&
        lastCustProduct === String(product).trim() &&
        lastCustMsg === String(message).trim()
      ) {
        return ContentService
          .createTextOutput(JSON.stringify({ 
            result: "ignored_duplicate", 
            message: "Duplicate enquiry submission ignored",
            row: currentRowCount
          }))
          .setMimeType(ContentService.MimeType.JSON);
      }
    }

    // Append row matching column order:
    // [Name, Email, Phone, Company Name, Company Website, Product, Message, Date & Time]
    sheet.appendRow([
      name,
      email,
      phone ? "'" + phone : "", // Prepend single quote so Google Sheets preserves leading zeros or '+'
      companyName,
      companyWebsite,
      product,
      message,
      timestamp
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ 
        result: "success", 
        message: "Enquiry saved to Google Sheet successfully",
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
        service: "Amul Packaging Product Enquiry Webhook",
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
