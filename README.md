# 🌍 Local Vibes

**Local Vibes** is a React application for visualizing events on an interactive map.  
The app allows users to search for events based on keywords and locations, view event details directly on the map, and
navigate through events with ease.  
It provides features such as clustering markers, displaying event details in popups, and an integrated location search
with autocomplete.

---

## 🚀 Features

### 🗺️ Event Management

- **Event Visualization**: Displays events on a map using interactive markers.
- **Marker Clustering**: Groups markers together for events in nearby locations, with dynamic zoom-based expansion.
- **Event Details**: Shows event details (e.g., name, date, image) in a popup when clicking on a marker.

### 🔍 Search and Filters

- **Location Search**: Users can search for locations with an autocomplete feature powered by OpenStreetMap's Nominatim
  API.
- **Keyword Search**: Filter events based on search terms like event name or description.
- **Date Range Filter**: Refine events displayed by selecting a specific date range.

### 📦 Pagination and Data Handling

- **Incremental Pagination**: Fetch and load more events dynamically when navigating through pages.
- **Smart Fetching**: Ensures the event list is updated only when search filters change or new data is required.

### ⭐ Favorites

- **Favorite Events**: Mark events as favorites for quick access.
- **Favorites View**: A dedicated section to view and manage all your favorite events.

### UI and User Experience

- **Responsive Design**: Optimized for different screen sizes using Tailwind CSS.
- **Map and List Synchronization**: Hovering over events in the list highlights the corresponding marker on the map.
- **Loading Indicators**: Displays loading spinners during data fetches for

### 🖥️ Live Demo

Link to the live app: [https://local-vibes.vercel.app/](https://local-vibes.vercel.app/)