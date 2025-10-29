# Quick Setup Guide: Get Quote Email Notifications

Follow these steps to receive quote requests via email and Google Sheets.

## Step 1: Create Google Sheet (2 minutes)

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **"+ Blank"** to create a new spreadsheet
3. Name it **"Photography Quote Requests"**
4. In row 1, add these column headers:
   ```
   Timestamp | Name | Email | Phone | Services | Property Name | Property Type | Bedrooms | Areas to Shoot | Location | Other Areas | Aerial Photography | FPV Video | Product Name | Number of Products | Model Required | Background Type | Styling Required | Food Items | Food Location | Number of Days | Lifestyle Details
   ```

## Step 2: Add Google Apps Script (3 minutes)

1. In your Google Sheet, click **Extensions → Apps Script**
2. Delete any existing code
3. Copy and paste this entire script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
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
    try {
      const emailBody = generateEmailBody(data);
      MailApp.sendEmail({
        to: 'chamodjayasundaraphotography@gmail.com',
        subject: '🎯 New Quote Request from ' + data.name,
        htmlBody: emailBody
      });
    } catch (emailError) {
      Logger.log('Email error: ' + emailError);
    }
    
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'success', message: 'Quote saved and email sent' })
    ).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    Logger.log('Error: ' + error);
    return ContentService.createTextOutput(
      JSON.stringify({ result: 'error', error: error.toString() })
    ).setMimeType(ContentService.MimeType.JSON);
  }
}

function generateEmailBody(data) {
  let html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background-color: #f15a24; padding: 20px; text-align: center;">
        <h1 style="color: white; margin: 0;">New Quote Request</h1>
      </div>
      
      <div style="padding: 20px; background-color: #f9f9f9;">
        <h2 style="color: #f15a24;">Contact Information</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
        <p><strong>Phone:</strong> <a href="tel:${data.phone}">${data.phone}</a></p>
        <p><strong>Services Requested:</strong> ${data.services}</p>
        <p><strong>Date Submitted:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
      </div>
  `;
  
  if (data.propertyName) {
    html += `
      <div style="padding: 20px; background-color: white; margin-top: 10px;">
        <h2 style="color: #f15a24;">Architecture Photography Details</h2>
        <p><strong>Property Name:</strong> ${data.propertyName}</p>
        <p><strong>Property Type:</strong> ${data.propertyType}</p>
        <p><strong>Bedrooms:</strong> ${data.bedrooms || 'N/A'}</p>
        <p><strong>Areas to Shoot:</strong> ${data.areasToShoot}</p>
        ${data.otherAreas ? '<p><strong>Other Areas:</strong> ' + data.otherAreas + '</p>' : ''}
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Aerial Photography:</strong> ${data.aerialPhotography}</p>
        <p><strong>FPV Video:</strong> ${data.fpvVideo}</p>
      </div>
    `;
  }
  
  if (data.productName) {
    html += `
      <div style="padding: 20px; background-color: white; margin-top: 10px;">
        <h2 style="color: #f15a24;">Product Photography Details</h2>
        <p><strong>Product:</strong> ${data.productName}</p>
        <p><strong>Number of Products:</strong> ${data.numberOfProducts}</p>
        <p><strong>Model Required:</strong> ${data.modelRequired}</p>
        <p><strong>Background Type:</strong> ${data.backgroundType}</p>
        <p><strong>Styling Required:</strong> ${data.stylingRequired}</p>
      </div>
    `;
  }
  
  if (data.foodItems) {
    html += `
      <div style="padding: 20px; background-color: white; margin-top: 10px;">
        <h2 style="color: #f15a24;">Food Photography Details</h2>
        <p><strong>Number of Items:</strong> ${data.foodItems}</p>
        <p><strong>Location:</strong> ${data.foodLocation}</p>
      </div>
    `;
  }
  
  if (data.numberOfDays) {
    html += `
      <div style="padding: 20px; background-color: white; margin-top: 10px;">
        <h2 style="color: #f15a24;">Lifestyle Photography Details</h2>
        <p><strong>Number of Days:</strong> ${data.numberOfDays}</p>
        <p><strong>Details:</strong> ${data.lifestyleDetails}</p>
      </div>
    `;
  }
  
  html += `
      <div style="padding: 20px; text-align: center; background-color: #333; color: white; margin-top: 20px;">
        <p>Reply to this request: <a href="mailto:${data.email}" style="color: #f15a24;">${data.email}</a></p>
      </div>
    </div>
  `;
  
  return html;
}

// Test function - you can run this to test the email
function testEmail() {
  const testData = {
    timestamp: new Date().toISOString(),
    name: 'Test Client',
    email: 'test@example.com',
    phone: '+94 77 123 4567',
    services: 'Architecture',
    propertyName: 'Test Hotel',
    propertyType: 'Hotel',
    bedrooms: '10',
    areasToShoot: 'Reception: 1, Bedrooms: 5',
    location: 'Colombo',
    aerialPhotography: 'Yes',
    fpvVideo: 'No'
  };
  
  const emailBody = generateEmailBody(testData);
  MailApp.sendEmail({
    to: 'chamodjayasundaraphotography@gmail.com',
    subject: '🧪 TEST - Quote Request System',
    htmlBody: emailBody
  });
  
  Logger.log('Test email sent!');
}
```

4. Click the **Save** icon (💾) and name it "Quote Handler"

## Step 3: Deploy as Web App (2 minutes)

1. Click **Deploy → New deployment**
2. Click the **gear icon** ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Description**: Quote Form Handler
   - **Execute as**: Me (your email)
   - **Who has access**: Anyone
5. Click **Deploy**
6. Click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to Quote Handler (unsafe)** → **Allow**
9. **COPY THE WEB APP URL** - it looks like:
   ```
   https://script.google.com/macros/s/AKfycby.../exec
   ```

## Step 4: Configure Your Website (1 minute)

1. Create a file in your project root called `.env.local`
2. Add this line (replace with your actual URL):
   ```
   GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_ACTUAL_URL/exec
   ```

## Step 5: Test It! (1 minute)

### Option A: Test from Google Apps Script
1. In Apps Script, select the function dropdown (next to Debug)
2. Choose **testEmail**
3. Click **Run**
4. Check your email: `chamodjayasundaraphotography@gmail.com`

### Option B: Test from your website
1. Restart your Next.js development server:
   ```bash
   npm run dev
   ```
2. Go to your website's `/quote` page
3. Fill out the form and submit
4. Check your email and Google Sheet!

## Troubleshooting

### Email not received?
- Check your spam/junk folder
- Run the `testEmail` function in Apps Script to verify email works
- Check the Apps Script execution logs (View → Executions)

### Google Sheet not updating?
- Make sure the sheet name is "Sheet1" or update the script
- Check Apps Script execution logs for errors

### Website shows error?
- Make sure `.env.local` is in the project root
- Restart your dev server after adding `.env.local`
- Check browser console for errors

## Important Notes

- The `.env.local` file is git-ignored and won't be committed
- When you deploy to production (Vercel/Netlify), add `GOOGLE_SCRIPT_URL` as an environment variable in your hosting dashboard
- Emails are sent from your Google account automatically
- The Google Sheet will keep a permanent record of all quotes

## Need Help?

If emails still aren't working after following these steps:
1. Check the Apps Script execution logs
2. Try running the `testEmail` function
3. Verify your Google account can send emails (not blocked)
