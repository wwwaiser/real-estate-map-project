# Week 2: Integrating Mapbox GL with react-map-gl

This week you'll add interactive maps to your application using `react-map-gl`, a React wrapper around Mapbox GL. Make sure all required tasks from Week 1 are completed before proceeding.

> **Reminder:** Do not push changes directly to the main branch. Create a separate branch (e.g., `week-02-map`) and open a Pull Request for review.

## Task Legend

- ✅ Required task — must be completed this week
- ☑️ Optional task — recommended but not required
- 🌟 Advanced task — attempt only after completing all required tasks

---

## 1. Finish Week 1 Setup

- ✅ **Complete all Week 1 required tasks:**
  Make sure your development environment, Next.js project, and GitHub repository are fully set up.

## 2. Deploy on Vercel

- ✅ **Host your application on Vercel:**
  Deploy your Next.js app so you have a live URL. Follow the [Vercel Getting Started Guide](https://vercel.com/docs/getting-started-with-vercel/import) to import your existing project.

## 3. Create a Basic Layout

- ✅ **Build a page layout:**
  If you haven't already, create a simple layout with a header, sidebar, and content area using Tailwind CSS. This will frame the map component you'll add next.

## 4. Add a Map with react-map-gl

- ✅ **Install and set up `react-map-gl`:**
  Install `react-map-gl` together with `mapbox-gl` (the map engine it wraps):

  ```bash
  npm install react-map-gl mapbox-gl
  ```

  Add the project's Mapbox access token to a `.env.local` file in the project root (this file is already in `.gitignore`, so it won't be committed). **Use this token for the project — don't create your own:**

  ```bash
  NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1Ijoic3ZheXNlciIsImEiOiJjbGgwbzl5NXcwdmMzM2VwdTkya2J6cDVmIn0.VrQewCt9w1K8QPsLzuDZjg
  ```

  Create `components/MapView.tsx`. Note three things that trip people up:
  - Import from **`react-map-gl/mapbox`** — the plain `react-map-gl` import doesn't exist in version 8, and older tutorials that use it (or `ReactMapGL`, `onViewportChange`, `mapboxApiAccessToken`) won't work.
  - Import **`mapbox-gl/dist/mapbox-gl.css`**, or markers, popups and controls will render in the wrong place.
  - The map is interactive, so the file must start with **`'use client'`**.

  ```tsx
  'use client';

  import Map from 'react-map-gl/mapbox';
  import 'mapbox-gl/dist/mapbox-gl.css';

  export default function MapView() {
    return (
      <Map
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
        initialViewState={{ latitude: 40.7484, longitude: -73.9857, zoom: 15 }}
        mapStyle="mapbox://styles/mapbox/streets-v12"
        style={{ width: '100%', height: '100%' }}
      />
    );
  }
  ```

  Render `<MapView />` in the content area of your layout. The map fills its parent, so **the parent needs a height** (for example Tailwind's `h-screen` or `flex-1` inside a full-height flex container) — otherwise the map is 0px tall and you'll see a blank page.

  More in the [react-map-gl Get Started guide](https://visgl.github.io/react-map-gl/docs/get-started).

- ✅ **Add the token to Vercel:**
  `.env.local` is not uploaded to Vercel, so your deployed map will be blank until you add the same variable there: Vercel project → **Settings** → **Environment Variables** → add `NEXT_PUBLIC_MAPBOX_TOKEN`, then redeploy. Do the same later for any other `NEXT_PUBLIC_...` variable you add.

- ✅ **Add Pins and Popups:**
  Place markers (pins) on the map and implement popups that display information when a pin is clicked. Use the [`Marker`](https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/marker) and [`Popup`](https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/popup) components as children of `<Map>`.

  > **Tip:** in a marker's `onClick`, call `e.originalEvent.stopPropagation()`. Otherwise the click also reaches the map, which closes the popup you just opened.

- ☑️ **Experiment with Layers:**
  Explore adding layers to customize the map's appearance and interactivity. Check out these react-map-gl examples:
  - [Adding Custom Data](https://visgl.github.io/react-map-gl/docs/get-started/adding-custom-data) — using Source and Layer components with GeoJSON data
  - [Layer API Reference (Mapbox)](https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/layer) — layer configuration and styling options
  - [Examples](https://visgl.github.io/react-map-gl/examples) — interactive demos including GeoJSON, Heatmap, Clusters, and more

---

## Advanced Tasks

- 🌟 **Advanced Map Features:**
  Try integrating more complex features such as dynamic data layers, navigation controls, or custom-styled markers. Explore these resources:
  - [NavigationControl](https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/navigation-control) — add zoom and rotation controls to the map
  - [Marker](https://visgl.github.io/react-map-gl/docs/api-reference/mapbox/marker) — custom and draggable markers
  - [GeoJSON Animation Example](https://visgl.github.io/react-map-gl/examples/mapbox/geojson-animation) — dynamically updating data on the map
  - [Draggable Marker Example](https://visgl.github.io/react-map-gl/examples/mapbox/draggable-markers) — interactive marker positioning

## Resources

- [react-map-gl Documentation](https://visgl.github.io/react-map-gl/)
- [Mapbox GL JS Documentation](https://docs.mapbox.com/mapbox-gl-js/guides/)
