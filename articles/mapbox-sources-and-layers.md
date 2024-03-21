# Understanding Sources and Layers in Mapbox with react-map-gl

Mapbox uses a combination of sources and layers to display data on maps. Here's an in-depth look at what these are and how they work.

## Sources

Sources in Mapbox provide data to be visualized on the map. They define the origin of the data without specifying how it should be displayed. There are several types of sources:

- **GeoJSONSource**: Uses GeoJSON data, which is a format for encoding a variety of geographic data structures.
- **VectorTileSource**: Employs vector tiles, which are compact data formats that divide the world into a grid of square tiles to efficiently deliver geographic data.
- **RasterTileSource**: Utilizes raster tiles, which are map tiles represented as bitmap graphics, ideal for imagery like satellite photos.
- **ImageSource**: Allows the addition of a single image to the map, useful for overlays.
- **VideoSource**: Enables the embedding of a video on the map.

## Layers

Layers in Mapbox dictate how the data from sources is rendered on the map. They define the style of the data, such as its color or size. The main types of layers include:

- **Fill Layer**: Fills a polygon with a color.
- **Line Layer**: Draws a line on the map.
- **Symbol Layer**: Displays an icon or a text label.
- **Circle Layer**: Represents data points as circles.
- **Raster Layer**: Renders raster tiles from a source.
- **FillExtrusion Layer**: Creates 3D extruded polygons based on the data.
- **Background Layer**: Sets the background color or pattern of the map.

## Adding Terrain Data Using `react-map-gl`

This example demonstrates how to add terrain data to your map using `react-map-gl` by incorporating the Mapbox Terrain v2 source. The Source component is used to add the mapbox.mapbox-terrain-v2 vector source, which contains terrain data such as contour lines. The Layer component then uses this source to draw lines representing these contours on the map.

```jsx
import React, { useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

const TerrainMap = () => {
  const [viewport, setViewport] = useState({
    latitude: 37.75,
    longitude: -122.45,
    zoom: 12,
  });

  return (
    <ReactMapGL
      {...viewport}
      width="100%"
      height="100%"
      onViewportChange={setViewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    >
      <Source
        id="mapbox-terrain"
        type="vector"
        url="mapbox://mapbox.mapbox-terrain-v2"
      >
        <Layer
          id="terrain-data"
          source="mapbox-terrain"
          type="line"
          source-layer="contour"
          layout={{
            "line-join": "round",
            "line-cap": "round",
          }}
          paint={{
            "line-color": "#ff69b4",
            "line-width": 1,
          }}
        />
      </Source>
    </ReactMapGL>
  );
};

export default TerrainMap;
```

## Mapbox GL JS vs react-map-gl react wrapper

Understanding the distinction between Mapbox GL JS and `react-map-gl` lib is crucial for developers aiming to integrate Mapbox maps into their applications efficiently. While Mapbox GL JS is a JavaScript library that provides interactive, customizable maps, `react-map-gl` is a React wrapper around Mapbox GL JS, offering an interface that aligns with React's component-based architecture.

To illustrate the differences in adding sources and layers, let's compare examples using both libraries:

### Mapbox GL JS Example
In Mapbox GL JS, adding a source and a layer typically involves directly calling methods on the map instance. For example, to add a GeoJSON source and a corresponding layer, you would do something like this:
```javascript
map.on('load', function() {
  map.addSource('myGeoJSON', {
    type: 'geojson',
    data: 'path/to/data.geojson'
  });

  map.addLayer({
    id: 'myLayer',
    type: 'fill',
    source: 'myGeoJSON',
    paint: {
      'fill-color': '#888888',
      'fill-opacity': 0.5
    }
  });
});
```

### react-map-gl Example
In `react-map-gl`, adding a source and layer is done declaratively by rendering Source and Layer components as part of your React component's render method or return statement. Here's how you would add the same GeoJSON source and layer in `react-map-gl`:
```jsx
import React from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

function MyMap() {
  return (
    <ReactMapGL /* props like initial viewport settings */>
      <Source id="myGeoJSON" type="geojson" data="path/to/data.geojson">
        <Layer
          id="myLayer"
          type="fill"
          source="myGeoJSON"
          paint={{
            'fill-color': '#888888',
            'fill-opacity': 0.5
          }}
        />
      </Source>
    </ReactMapGL>
  );
}
```
By comparing these examples, you can see that `react-map-gl` abstracts away the imperative API calls, allowing you to define sources and layers in a more React-like way, using components and props. This distinction highlights the importance of choosing the right library based on the architecture and paradigms of your application.


### Useful Resources
- [A Complete Guide to Sources and Layers in React and Mapbox GL JS](https://www.lostcreekdesigns.co/writing/a-complete-guide-to-sources-and-layers-in-react-and-mapbox-gl-js)
- [Tilesets & Datasets: Managing Data in Mapbox Studio](https://www.lostcreekdesigns.co/writing/tilesets-and-datasets-managing-data-in-mapbox-studio)
