# Microinternship Week 7: Advanced Features with Google APIs and GraphQL

This week, we'll be enhancing our mapping application by improving our address search capabilities and incorporating a detailed Street View feature using Google's APIs. You'll work to make the map more interactive and provide a richer user experience.

All tasks are optional

> **Google API key:** You need your own key from the [Google Cloud Console](https://console.cloud.google.com/google/maps-apis/overview) with billing enabled (Google gives a monthly free credit that easily covers this project). Enable the **Geocoding API**, **Street View Static API**, and **Places API (New)**. Store the key in `.env.local` (for example `NEXT_PUBLIC_GOOGLE_MAPS_KEY=...`) and never commit it. Restrict the key to your localhost and Vercel domains.
>
> The [google-api.js](./additional-materials/google-api.js) example shows Places Autocomplete and Place Details with **Places API (New)** using plain `fetch`, so the same code works in Node and in the browser. Run it with `GOOGLE_MAPS_KEY=your_key node google-api.js`. Don't use the legacy Places API (`maps/api/place/...`) or the `@googlemaps/google-maps-services-js` library from older tutorials — the legacy API is not available to new Google Cloud projects.
>
> For geocoding, call the [Geocoding REST API](https://developers.google.com/maps/documentation/geocoding/requests-geocoding) with `fetch`: `https://maps.googleapis.com/maps/api/geocode/json?address=...&key=...`

## Enhanced Address Search

- 🌟 **Introduction of Search by Address Feature:**
  Add a search box to your header. When the user submits an address:

  1. **Geocode the address** with the Google Geocoding API to get latitude and longitude:

     ```typescript
     const res = await fetch(
       `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}`,
     );
     const geo = await res.json();
     const location = geo.results?.[0]?.geometry?.location; // { lat, lng }, or undefined if not found
     ```

  2. **Find the parcel at those coordinates** with `executeGetParcelByLocation` from our GraphQL API. It returns a list; take the first item's `id`, which matches the Mapbox parcel `ID` and `reonomyProperties.parcel_id`:

     ```graphql
     query GetParcelByLocation($latitude: Float, $longitude: Float) {
       executeGetParcelByLocation(latitude: $latitude, longitude: $longitude, limit: 1) {
         parcel_id: id
       }
     }
     ```

     `useQuery` runs as soon as the component renders, but this query should only run when the user clicks Search. Use Apollo's `useLazyQuery` instead, which gives you a function to call from your submit handler:

     ```typescript
     const [getParcel] = useLazyQuery(GET_PARCEL_BY_LOCATION);
     // inside the submit handler:
     const { data } = await getParcel({ variables: { latitude: location.lat, longitude: location.lng } });
     const parcelId = data?.executeGetParcelByLocation?.[0]?.parcel_id;
     ```

     > **Uppercase the ID.** The API returns this ID in lowercase, while the Mapbox tiles use uppercase. The `reonomyProperties` lookup ignores case, but a Mapbox highlight expression like `["==", ["get", "ID"], parcelId]` does not. Call `parcelId.toUpperCase()` before storing it.

  3. **Show the result:** set it as the selected parcel so your Week 5-6 sidebar loads the property details and your Week 4 highlight marks it on the map. Then move the map to it with a map ref:

     ```tsx
     const mapRef = useRef<MapRef>(null); // MapRef is imported from 'react-map-gl/mapbox'
     // <Map ref={mapRef} ...>
     mapRef.current?.flyTo({ center: [location.lng, location.lat], zoom: 17 });
     ```

## Detailed Street View Integration

- 🌟 **Google Street View Implementation:**
  - After successfully integrating address search, implement the Google Street View API to provide a street-level view for each located parcel. When a user clicks on a parcel after searching, open a dialog displaying the Street View and address of the selected location. This feature uses the API detailed here: [Google Street View API Documentation](https://developers.google.com/maps/documentation/streetview/overview).
  - The simplest approach is an `<img>` pointing at the Street View Static API: `https://maps.googleapis.com/maps/api/streetview?size=600x300&location=LAT,LNG&source=outdoor&key=...`
  - **Known limitation:** the Static API sometimes returns a user-uploaded panorama instead of Google's street imagery (for example, a rooftop view of the skyline at the Empire State Building). It has no option to exclude those. If you want to fix it, use the [Maps JavaScript API](https://developers.google.com/maps/documentation/javascript/streetview) `StreetViewService` with `sources: [google.maps.StreetViewSource.GOOGLE]` (requires enabling the Maps JavaScript API).

## Optional Tasks

- 🌟 **Loading and Error Handling:**
  - Implement visual feedback through loading indicators when data is being fetched and display error messages for unsuccessful API calls.

- 🌟 **Enhanced User Interaction:**
  - Enable the selection of an address directly from the search suggestions provided by the Google Autocomplete API, improving user interaction and accuracy.

This week's tasks focus on refining web application functionalities by integrating advanced mapping features. These enhancements will provide users with a comprehensive view and greater interactivity on the map. Enjoy the challenge!
