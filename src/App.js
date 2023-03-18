import { Header } from "./components";

let map;
let service;
let infowindow;
let location = [-33.867, 151.195];
let restaurants;

navigator.geolocation.getCurrentPosition(
  (position) => {
    console.log(position.coords.latitude, position.coords.longitude);
    [location[0], location[1]] = [
      position.coords.latitude,
      position.coords.longitude,
    ];
  },
  () => {
    console.log("error");
  }
);

async function initMap() {
  const sydney = new window.google.maps.LatLng(location[0], location[1]);
  infowindow = new window.google.maps.InfoWindow();
  map = new window.google.maps.Map(document.getElementById("map"), {
    center: sydney,
    zoom: 15,
  });

  const request = {
    location: { lat: location[0], lng: location[1] },
    radius: 5500,
    type: ["restaurant"],
  };

  service = new window.google.maps.places.PlacesService(map);
  service.nearbySearch(request, (results, status) => {
    if (
      status === window.google.maps.places.PlacesServiceStatus.OK &&
      results
    ) {
      restaurants = results;
      console.log(results);
      for (let i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }

      map.setCenter(results[0].geometry.location);
    }
  });
}

function createMarker(place) {
  if (!place.geometry || !place.geometry.location) return;

  const marker = new window.google.maps.Marker({
    map,
    position: place.geometry.location,
  });

  window.google.maps.event.addListener(marker, "click", () => {
    infowindow.setContent(place.name || "");
    infowindow.open(map);
  });
}

window.initMap = initMap;

function App() {
  return (
    <div>
      <Header />
      {restaurants && restaurants.map((rest) => <h3>{rest.name}</h3>)}
      <div id="map"></div>
    </div>
  );
}

export default App;
