// onepager.js
// ---------------------------------------------
// Google Places Autocomplete + Place Details demo
// Using: @googlemaps/google-maps-services-js
//
// This script shows how to:
// 1. Get address suggestions as the user types (autocomplete)
// 2. Fetch detailed info (latitude & longitude) for a selected place
// ---------------------------------------------

// Import the Google Maps Services client
import { Client } from "@googlemaps/google-maps-services-js";

// Create a new API client instance
const client = new Client({});

// Your Google Cloud API key (with Places API enabled)
const API_KEY = "YOUR_API_KEY_HERE"; // ← Replace with your actual key

// Main async function to run the autocomplete + details example
async function runAutocompleteExample() {
  try {
    // ---------------------------------------------
    // STEP 1️⃣ — Autocomplete: get suggested places
    // ---------------------------------------------
    const autoRes = await client.placeAutocomplete({
      params: {
        // Text input from the user (simulate typing)
        input: "1600 Amphitheatre", // Try other examples like "New York" or "Eiffel Tower"

        // Restrict results to the United States
        components: "country:us",

        // Your API key (required)
        key: API_KEY,
      },
      timeout: 1000, // Optional timeout (milliseconds)
    });

    // Extract predictions (list of suggested addresses/places)
    const predictions = autoRes.data.predictions;

    // If no results, stop
    if (predictions.length === 0) {
      console.log("No predictions found.");
      return;
    }

    // Log all predictions with numbering
    console.log("Autocomplete predictions:");
    predictions.forEach((p, i) => {
      console.log(`${i + 1}. ${p.description} (place_id: ${p.place_id})`);
    });

    // ---------------------------------------------
    // STEP 2️⃣ — Place Details: get more info about one place
    // ---------------------------------------------
    // Choose the first suggestion from the list
    const placeId = predictions[0].place_id;

    // Request full details for that place (includes geometry, name, etc.)
    const detailsRes = await client.placeDetails({
      params: {
        place_id: placeId, // Place ID from autocomplete
        key: API_KEY,
      },
    });

    // Extract the place details
    const result = detailsRes.data.result;

    // Extract latitude & longitude from the geometry field
    const { lat, lng } = result.geometry.location;

    // Print out the result nicely
    console.log("\n📍 Place Details:");
    console.log(`Name: ${result.name}`);
    console.log(`Address: ${result.formatted_address}`);
    console.log(`Latitude: ${lat}`);
    console.log(`Longitude: ${lng}`);

    // Done!
  } catch (err) {
    // Handle errors (e.g., invalid key, quota exceeded, etc.)
    console.error("❌ Error:", err.response?.data || err.message);
  }
}

// Run the example
runAutocompleteExample();
