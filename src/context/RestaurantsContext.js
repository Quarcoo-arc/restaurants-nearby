import { createContext, useEffect, useState } from "react";

const RestaurantsContext = createContext(null);

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords.latitude, position.coords.longitude);
        setLocation(() => [
          position.coords.latitude,
          position.coords.longitude,
        ]);
        initMap(position.coords.latitude, position.coords.longitude);
      },
      () => {
        console.log("error");
      }
    );
  }, []);

  const initMap = (lat, lng) => {
    if (location) {
      let map;
      let service;
      let infowindow;

      async function getRestaurants() {
        const sydney = new window.google.maps.LatLng(lat, lng);
        infowindow = new window.google.maps.InfoWindow();
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: sydney,
          zoom: 15,
        });

        console.log(location);

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
            setRestaurants(results);
            computeDistances(results);
            console.log(results);
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
          }
        });
      }

      getRestaurants();

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

      const computeDistances = (places) => {
        if (!places) return;

        const destinations = [];

        places.forEach((place) => {
          destinations.push(
            new window.google.maps.LatLng(
              place.geometry.location.lat(),
              place.geometry.location.lng()
            )
          );
        });

        console.log(destinations);

        let distanceService = new window.google.maps.DistanceMatrixService();
        distanceService.getDistanceMatrix(
          {
            origins: [new window.google.maps.LatLng(...location)],
            destinations,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK" && response) {
              console.log(response);
              const data = restaurants.map((rest, idx) => {
                rest.distance = response.rows[0].elements[idx].distance.text;
                return rest;
              });
              setRestaurants(data);
              console.log(data);
            }
          }
        );
      };
    }
  };
  window.initMap = initMap;

  //   useEffect(() => {
  //     if (restaurants) {
  //       const destinations = [];

  //       restaurants.forEach((res) => {
  //         destinations.push(
  //           new window.google.maps.LatLng(
  //             res.geometry.location.lat(),
  //             res.geometry.location.lng()
  //           )
  //         );
  //       });

  //       console.log(destinations);

  //       let distanceService = new window.google.maps.DistanceMatrixService();
  //       distanceService.getDistanceMatrix(
  //         {
  //           origins: [new window.google.maps.LatLng(...location)],
  //           destinations,
  //           travelMode: window.google.maps.TravelMode.DRIVING,
  //         },
  //         (response, status) => {
  //           if (
  //             status === window.google.maps.DistanceMatrixService.OK &&
  //             response
  //           ) {
  //             console.log(response);
  //           }
  //         }
  //       );
  //     }
  //   }, [restaurants, location]);

  return (
    <RestaurantsContext.Provider value={{ restaurants }}>
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContext;
