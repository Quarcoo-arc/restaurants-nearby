import { createContext, useEffect, useState } from "react";

const RestaurantsContext = createContext(null);

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [location, setLocation] = useState([]);
  const [data, setData] = useState(restaurants);
  const [sortBy, setSortBy] = useState("default");
  const [pageNum, setPageNum] = useState(1);

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
    if (lat && lng) {
      let map;
      let service;
      let infowindow;

      function getRestaurants() {
        const sydney = new window.google.maps.LatLng(lat, lng);
        infowindow = new window.google.maps.InfoWindow();
        map = new window.google.maps.Map(document.getElementById("map"), {
          center: sydney,
          zoom: 15,
        });

        console.log(location);

        const request = {
          location: { lat, lng },
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
            computeDistances(results, lat, lng);
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

      const computeDistances = (places, lat, lng) => {
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
            origins: [new window.google.maps.LatLng(lat, lng)],
            destinations,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK" && response) {
              console.log(response);
              setRestaurants((rests) =>
                rests.map((rest, id) => {
                  rest.distance = response.rows[0].elements[id].distance.text;
                  rest.coords = [
                    rest.geometry.location.lat(),
                    rest.geometry.location.lng(),
                  ];
                  return rest;
                })
              );
            }
          }
        );
      };
    }
  };
  window.initMap = initMap;

  const sortData = (param) => {
    console.log("sorting");
    setData(restaurants.sort((a, b) => b.rating - a.rating));
    if (param === "ratings") {
    } else if (param === "distance") {
      setData(
        restaurants.sort(
          (a, b) => +a.distance.split(" ")[0] - +b.distance.split(" ")[0]
        )
      );
    } else if (param === "restaurant_name") {
      setData(
        restaurants.sort((a, b) =>
          a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        )
      );
    }
    setPageNum(1);
  };

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <RestaurantsContext.Provider
      value={{
        restaurants,
        data,
        setData,
        sortData,
        sortBy,
        setSortBy,
        pageNum,
        setPageNum,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContext;
