# Microinternship Week 5: Leveraging GraphQL with Mapbox

This week, we're going to integrate the GraphQL API with our Mapbox GL vector map to display detailed information about selected parcels. You'll need to use the parcel ID obtained from the map to fetch and display data using our GraphQL endpoint.

## Interactive Parcel Information Display

- ✅ **Mapbox GL Interaction:**
  - Implement functionality where clicking on a parcel on the Mapbox GL vector map displays the parcel's ID. This ID is found in the feature property named "ID."

- ✅ **Fetch Data with GraphQL:**
  - Use the parcel ID to fetch building information from the `reonomyProperties` object in our GraphQL API.
  - The `reonomyProperties` object contains a field named `parcel_id`, which corresponds to the "ID" field from the mapbox parcel.

- ✅ **Display Data on Sidebar:**
  - Ensure that the sidebar updates with information fetched from the `reonomyProperties` object whenever a new parcel is selected.
  - Refer to the provided file for descriptions of all labels and values to display from the `reonomyProperties` object: [Link to File](./additional-materials/building-and-lot-fields-description.json)
  
- ✅ **Design Reference:**
  - Use the provided image as a design reference for how to display the information: [Link to Design Reference](./additional-materials/building-and-lot-design.png)

## Optional Tasks

- 🌟 **Implement Loading States:**
  - Enhance user experience by displaying loading states (like spinners) when data is being fetched.
  - Show an error message if the GraphQL API call fails or does not return an HTTP status code of 200.

- 🌟 **Persistent Parcel Selection:**
  - Modify the URL to include the selected parcel's information. This allows the webpage to retain the selected parcel data after a refresh.

This week's tasks will deepen your understanding of integrating various technologies and enhancing user experience with thoughtful design and functionality. Good luck!
