// google-api.js
// ---------------------------------------------
// Google Places Autocomplete + Place Details demo
// Using: Places API (New) over plain fetch — no extra packages needed
//
// This script shows how to:
// 1. Get address suggestions as the user types (autocomplete)
// 2. Fetch detailed info (latitude & longitude) for a selected place
//
// Run it with Node.js 18+:  GOOGLE_MAPS_KEY=your_key node google-api.js
//
// Note: the legacy Places API (maps/api/place/...) and the
// @googlemaps/google-maps-services-js library that wraps it are not
// available to new Google Cloud projects. Use Places API (New) as shown here.
// ---------------------------------------------

// Your Google Cloud API key (with Places API (New) enabled)
const API_KEY = process.env.GOOGLE_MAPS_KEY;

// Main async function to run the autocomplete + details example
async function runAutocompleteExample() {
  try {
    // ---------------------------------------------
    // STEP 1️⃣ — Autocomplete: get suggested places
    // ---------------------------------------------
    const autoRes = await fetch("https://places.googleapis.com/v1/places:autocomplete", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Goog-Api-Key": API_KEY,
      },
      body: JSON.stringify({
        // Text input from the user (simulate typing)
        input: "350 5th Ave New York", // Try other examples like "Barclays Center"

        // Restrict results to the United States
        includedRegionCodes: ["us"],
      }),
    });
    const autoData = await autoRes.json();
    if (!autoRes.ok) throw new Error(autoData.error?.message);

    // Extract predictions (list of suggested addresses/places)
    const predictions = (autoData.suggestions ?? [])
      .map((s) => s.placePrediction)
      .filter(Boolean);

    // If no results, stop
    if (predictions.length === 0) {
      console.log("No predictions found.");
      return;
    }

    // Log all predictions with numbering
    console.log("Autocomplete predictions:");
    predictions.forEach((p, i) => {
      console.log(`${i + 1}. ${p.text.text} (place_id: ${p.placeId})`);
    });

    // ---------------------------------------------
    // STEP 2️⃣ — Place Details: get more info about one place
    // ---------------------------------------------
    // Choose the first suggestion from the list
    const placeId = predictions[0].placeId;

    // Request only the fields we need (required by Places API (New))
    const detailsRes = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": API_KEY,
        "X-Goog-FieldMask": "displayName,formattedAddress,location",
      },
    });
    const place = await detailsRes.json();
    if (!detailsRes.ok) throw new Error(place.error?.message);

    // Extract latitude & longitude from the location field
    const { latitude, longitude } = place.location;

    // Print out the result nicely
    console.log("\n📍 Place Details:");
    console.log(`Name: ${place.displayName?.text}`);
    console.log(`Address: ${place.formattedAddress}`);
    console.log(`Latitude: ${latitude}`);
    console.log(`Longitude: ${longitude}`);

    // Done!
  } catch (err) {
    // Handle errors (e.g., invalid key, API not enabled, quota exceeded, etc.)
    console.error("❌ Error:", err.message);
  }
}

// Run the example
runAutocompleteExample();
