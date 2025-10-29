# Google Sheets & Email Integration Setup

This guide will help you set up Google Sheets integration and email notifications for quote requests.

## Option 1: Google Sheets Integration (Recommended)

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet named "Photography Quote Requests"
3. In the first row, add these headers:
   - Timestamp
   - Name
   - Email
   - Phone
   - Services
   - Property Name
   - Property Type
   - Bedrooms
   - Areas to Shoot
   - Location
   - Other Areas
   - Aerial Photography
   - FPV Video
   - Product Name
   - Number of Products
   - Model Required
   - Background Type
   - Styling Required
   - Food Items
   - Food Location
   - Number of Days
   - Lifestyle Details

### Step 2: Create Google Apps Script
1. In your Google Sheet, go to **Extensions > Apps Script**
2. Delete any code in the editor and paste this:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Add row to sheet
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.name || '',
      data.email || '',
      data.phone || '',
      data.services || '',
      data.propertyName || '',
      data.propertyType || '',
      data.bedrooms || '',
      data.areasToShoot || '',
      data.location || '',
      data.otherAreas || '',
      data.aerialPhotography || '',
      data.fpvVideo || '',
      data.productName || '',
      data.numberOfProducts || '',
      data.modelRequired || '',
      data.backgroundType || '',
      data.stylingRequired || '',
      data.foodItems || '',
      data.foodLocation || '',
      data.numberOfDays || '',
      data.lifestyleDetails || ''
    ]);
    
    // Send email notification
    const emailBody = generateEmailBody(data);
    MailApp.sendEmail({
      to: 'chamodjayasundaraphotography@gmail.com',
      subject: 'New Quote Request from ' + data.name,
      htmlBody: emailBody
    });
    
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function generateEmailBody(data) {
  let html = '<h2>New Quote Request</h2>';
  html += '<h3>Contact Information</h3>';
  html += '<p><strong>Name:</strong> ' + data.name + '</p>';
  html += '<p><strong>Email:</strong> ' + data.email + '</p>';
  html += '<p><strong>Phone:</strong> ' + data.phone + '</p>';
  html += '<p><strong>Services:</strong> ' + data.services + '</p>';
  html += '<p><strong>Date:</strong> ' + new Date(data.timestamp).toLocaleString() + '</p>';
  
  if (data.propertyName) {
    html += '<h3>Architecture Photography Details</h3>';
    html += '<p><strong>Property Name:</strong> ' + data.propertyName + '</p>';
    html += '<p><strong>Property Type:</strong> ' + data.propertyType + '</p>';
    html += '<p><strong>Bedrooms:</strong> ' + (data.bedrooms || 'N/A') + '</p>';
    html += '<p><strong>Areas to Shoot:</strong> ' + data.areasToShoot + '</p>';
    if (data.otherAreas) {
      html += '<p><strong>Other Areas:</strong> ' + data.otherAreas + '</p>';
    }
    html += '<p><strong>Location:</strong> ' + data.location + '</p>';
    html += '<p><strong>Aerial Photography Required:</strong> ' + data.aerialPhotography + '</p>';
    html += '<p><strong>FPV Cinematic Video Required:</strong> ' + data.fpvVideo + '</p>';
  }
  
  if (data.productName) {
    html += '<h3>Product Photography Details</h3>';
    html += '<p><strong>Product:</strong> ' + data.productName + '</p>';
    html += '<p><strong>Number of Products:</strong> ' + data.numberOfProducts + '</p>';
    html += '<p><strong>Model Required:</strong> ' + data.modelRequired + '</p>';
    html += '<p><strong>Background Type:</strong> ' + data.backgroundType + '</p>';
    html += '<p><strong>Styling Required:</strong> ' + data.stylingRequired + '</p>';
  }
  
  if (data.foodItems) {
    html += '<h3>Food Photography Details</h3>';
    html += '<p><strong>Number of Items:</strong> ' + data.foodItems + '</p>';
    html += '<p><strong>Location:</strong> ' + data.foodLocation + '</p>';
  }
  
  if (data.numberOfDays) {
    html += '<h3>Lifestyle Photography Details</h3>';
    html += '<p><strong>Number of Days:</strong> ' + data.numberOfDays + '</p>';
    html += '<p><strong>Details:</strong> ' + data.lifestyleDetails + '</p>';
  }
  
  return html;
}
```

### Step 3: Deploy the Web App
1. Click **Deploy > New deployment**
2. Click the gear icon next to "Select type" and choose **Web app**
3. Fill in the details:
   - **Description**: Quote Form Handler
   - **Execute as**: Me
   - **Who has access**: Anyone
4. Click **Deploy**
5. **Copy the Web App URL** - you'll need this!
6. Click **Authorize access** and grant permissions

### Step 4: Update Your API File
1. Open `/pages/api/submit-quote.js`
2. Find this line: `// const GOOGLE_SCRIPT_URL = "YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL";`
3. Replace it with your actual URL and uncomment the code:

```javascript
const GOOGLE_SCRIPT_URL = "YOUR_COPIED_WEB_APP_URL_HERE";

try {
  await fetch(GOOGLE_SCRIPT_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
} catch (error) {
  console.error("Error sending to Google Sheets:", error);
}
```

## Option 2: Alternative Email Services

If you prefer other email services, you can use:

### SendGrid (Popular choice)
1. Sign up at [SendGrid](https://sendgrid.com)
2. Get your API key
3. Install: `npm install @sendgrid/mail`
4. Update the API file with SendGrid integration

### Nodemailer with Gmail
1. Install: `npm install nodemailer`
2. Configure with Gmail SMTP
3. Use an App Password for security

## Testing

1. After setup, go to your website's `/quote` page
2. Fill out the form and submit
3. Check your Google Sheet for the new row
4. Check your email for the notification

## Troubleshooting

- **Not receiving emails?** Check your Google Apps Script execution log
- **Sheet not updating?** Verify the Web App URL is correct in submit-quote.js
- **CORS errors?** Make sure the Web App is deployed with "Anyone" access
- **Gmail blocking?** Use an App Password instead of your regular password

## Security Note

The current setup allows anyone to access your Web App. This is necessary for it to work. Google Apps Script handles the security by not exposing your credentials. However, you may want to add rate limiting or validation in your Next.js API to prevent spam.
