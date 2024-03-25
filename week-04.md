# Week 4: Integrating Parcels Source and Layers into the Map

This week, you'll enhance the map functionality by adding a parcels source and creating layers to highlight these parcels. You will work with specific source URLs and layer attributes to integrate this new data into your map effectively.

## Tasks

✅ - Required Task
🌟 - Optional Task


- ✅ **Add Parcels Source to the Map:**
  - Integrate the parcels source from the provided URL into your map component. Use the source URL: `"mapbox://svayser.ae1mculr"`.

- ✅ **Add Layers to Highlight Parcels:**
  - Your task is to add at least two layers to the map to visualize the parcels data effectively.
  
    1. **Line Layer:**
       - Create a layer of type `'line'` to draw the boundaries of the parcels.
       - Ensure that this layer includes the `source-layer` attribute set to `"manhattan_staten_island_parce-7ng65o"`.
       - Assign a unique `id` to this layer for identification.

    2. **Fill Layer:**
       - Add another layer of type `'fill'` to fill the parcels with color.
       - This layer should also have the `source-layer` attribute set to `"manhattan_staten_island_parce-7ng65o"`.
       - Like the line layer, make sure to provide a unique `id` to this fill layer.

- ✅ **Handle Clicks on Parcels:**
  - Implement a click event handler within your map component to respond to user interactions with the parcels layers.
  
    - **Click Event Handling:**
      - Attach a click event listener to the map.
      - Within the click handler function, extract the `ID` attribute from the feature properties of the clicked parcel. This `ID` will be used in subsequent GraphQL queries as a "parcel id".
      
      Example JavaScript code for the click handler:

      ```javascript
      (event) => {
          if (event.features.length > 0) {
              setParcelId(event.features[0].properties.ID);
          }
      }
      ```
      
    - **Interactive Layers:**
      - To ensure that your parcels layers are interactive and can trigger click events, specify your custom layer IDs in the `interactiveLayerIds` property of the map. This step is crucial for making your layers respond to click events.
      
      Reference for `interactiveLayerIds`: [react-map-gl Map Documentation](https://visgl.github.io/react-map-gl/docs/api-reference/map#interactivelayerids)

## Add Hover Effects

- 🌟 **Parcel Hover Effect:**
  - Implement a hover effect for the parcels. When the user hovers the cursor over a parcel, change its color to indicate that it's an interactive element.
  - You might need to dynamically adjust the style of the parcel layer based on the hover state.

## Highlight Clicked Parcel

- 🌟 **Maintain Highlight on Clicked Parcel:**
  - After a parcel is clicked, keep it highlighted to provide visual feedback that it has been selected.
  - This could involve changing the style of the clicked parcel or maintaining its 'selected' state until another action is taken.

## Summary 
By completing the tasks for Week 4, you're taking significant steps in adding interactivity to your map, a key skill in modern web development. Here's a closer look at what you'll achieve:

When you enable users to click on parcels on your map, you're not just making your map interactive; you're creating a bridge between the user and the data. For instance, by extracting the parcel ID from a click event, you open up a plethora of possibilities. You could use this ID to fetch more details about the parcel, display them on the map or in a separate component, or even link the map data to other aspects of your application. This interaction is a fundamental skill in creating dynamic, data-driven web applications.

Moreover, by adding and configuring different types of layers—like the line and fill layers for your parcels—you gain a more nuanced understanding of how maps can represent complex data in an accessible and user-friendly way. You'll learn how to manipulate these layers to highlight specific data points or to enhance the visual appeal and usability of your map.

In essence, the knowledge and skills you acquire from these tasks will not only make your map more interactive and informative but also enhance your overall ability to craft engaging web experiences that effectively convey data and respond to user inputs.


## Useful Links

- [How to Style Map Layers](https://www.lostcreekdesigns.co/writing/how-to-style-map-layers-in-mapbox-gl-js)
- [Example: Implementing Hover Effect on Layer](https://github.com/visgl/react-map-gl/tree/7.1-release/examples/filter)
- [Tutorial: Interactive Layers Effects with Mapbox GL JS](https://docs.mapbox.com/help/tutorials/create-interactive-hover-effects-with-mapbox-gl-js/)
