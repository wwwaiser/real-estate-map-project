# Microinternship Week 7: Advanced Features with Google APIs and GraphQL

This week, we'll be enhancing our mapping application by improving our address search capabilities and incorporating a detailed Street View feature using Google's APIs. You'll work to make the map more interactive and provide a richer user experience.

All tasks are optional

> **Google API key:** You need your own key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview) with billing enabled (Google gives a monthly free credit that easily covers this project). Enable the **Geocoding API**, **Street View Static API**, and **Places API (New)**. Store the key in `.env.local` (for example `NEXT_PUBLIC_GOOGLE_MAPS_KEY=...`) and never commit it. Restrict the key to your localhost and Vercel domains.
>
> The [google-api.js](./additional-materials/google-api.js) example uses `@googlemaps/google-maps-services-js`, which is a **Node.js (server-side) library** — it cannot run in a browser component. Call it from a Next.js Route Handler or Server Action, or call the [Geocoding REST API](https://developers.google.com/maps/documentation/geocoding/requests-geocoding) directly with `fetch`.

## Enhanced Address Search

- 🌟 **Introduction of Search by Address Feature:**
  - We are introducing a search by address feature to our website. This feature involves using the Google Geocoder API to convert user input into geographical coordinates.
  - After obtaining coordinates, utilize the `executeGetParcelByLocation` function from our GraphQL API to fetch the corresponding parcel ID. Here’s how you can achieve this with an example query:

  ```graphql
  query getParcel($latitude: Single, $longitude: Single) {
    executeGetParcelByLocation(longitude: $longitude, latitude: $latitude) {
      parcel_id: ID
    }
  }

  query getProperty($parcelId: String) {
    reonomyProperties(filter: {parcel_id: {eq: $parcelId}}) {
      items {
        address_line1
      }
    }
  }
  ```

  - Highlight the parcel on the map and display property details based on the search results.

## Detailed Street View Integration

- 🌟 **Google Street View Implementation:**
  - After successfully integrating address search, implement the Google Street View API to provide a street-level view for each located parcel. When a user clicks on a parcel after searching, open a dialog displaying the Street View and address of the selected location. This feature uses the API detailed here: [Google Street View API Documentation](https://developers.google.com/maps/documentation/streetview/overview).

## Optional Tasks

- 🌟 **Loading and Error Handling:**
  - Implement visual feedback through loading indicators when data is being fetched and display error messages for unsuccessful API calls.

- 🌟 **Enhanced User Interaction:**
  - Enable the selection of an address directly from the search suggestions provided by the Google Autocomplete API, improving user interaction and accuracy.

This week's tasks focus on refining web application functionalities by integrating advanced mapping features. These enhancements will provide users with a comprehensive view and greater interactivity on the map. Enjoy the challenge!
