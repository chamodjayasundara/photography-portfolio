export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const data = req.body;

    // Prepare email content
    const emailContent = generateEmailContent(data);

    // Send to Google Sheets via Google Apps Script Web App
    // IMPORTANT: Replace this URL with your actual Google Apps Script Web App URL
    const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL || "";
    
    if (GOOGLE_SCRIPT_URL) {
      try {
        const response = await fetch(GOOGLE_SCRIPT_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
          redirect: "follow",
        });
        
        const result = await response.text();
        console.log("Google Script Response:", result);
      } catch (error) {
        console.error("Error sending to Google Sheets:", error);
        // Don't fail the request if Google Sheets fails
      }
    } else {
      console.log("⚠️ GOOGLE_SCRIPT_URL not configured");
      console.log("Quote Request Received:", data);
      console.log("Email Content:", emailContent);
    }

    return res.status(200).json({ 
      message: "Quote request submitted successfully",
      data: data 
    });

  } catch (error) {
    console.error("Error processing quote request:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

function generateEmailContent(data) {
  let content = `
    <h2>New Quote Request</h2>
    <h3>Contact Information</h3>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Email:</strong> ${data.email}</p>
    <p><strong>Phone:</strong> ${data.phone}</p>
    <p><strong>Services:</strong> ${data.services}</p>
    <p><strong>Date:</strong> ${new Date(data.timestamp).toLocaleString()}</p>
  `;

  if (data.propertyName) {
    content += `
      <h3>Architecture Photography Details</h3>
      <p><strong>Property Name:</strong> ${data.propertyName}</p>
      <p><strong>Property Type:</strong> ${data.propertyType}</p>
      <p><strong>Bedrooms:</strong> ${data.bedrooms || "N/A"}</p>
      <p><strong>Areas to Shoot:</strong> ${data.areasToShoot}</p>
      ${data.otherAreas ? `<p><strong>Other Areas:</strong> ${data.otherAreas}</p>` : ''}
      <p><strong>Location:</strong> ${data.location}</p>
      <p><strong>Aerial Photography Required:</strong> ${data.aerialPhotography}</p>
      <p><strong>FPV Cinematic Video Required:</strong> ${data.fpvVideo}</p>
    `;
  }

  if (data.productName) {
    content += `
      <h3>Product Photography Details</h3>
      <p><strong>Product:</strong> ${data.productName}</p>
      <p><strong>Number of Products:</strong> ${data.numberOfProducts}</p>
      <p><strong>Model Required:</strong> ${data.modelRequired}</p>
      <p><strong>Background Type:</strong> ${data.backgroundType}</p>
      <p><strong>Styling Required:</strong> ${data.stylingRequired}</p>
    `;
  }

  if (data.foodItems) {
    content += `
      <h3>Food Photography Details</h3>
      <p><strong>Number of Items:</strong> ${data.foodItems}</p>
      <p><strong>Location:</strong> ${data.foodLocation}</p>
    `;
  }

  if (data.numberOfDays) {
    content += `
      <h3>Lifestyle Photography Details</h3>
      <p><strong>Number of Days:</strong> ${data.numberOfDays}</p>
      <p><strong>Details:</strong> ${data.lifestyleDetails}</p>
    `;
  }

  return content;
}
