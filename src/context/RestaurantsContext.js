import { createContext, useEffect, useState } from "react";

const RestaurantsContext = createContext(null);

export const RestaurantsContextProvider = ({ children }) => {
  const [restaurants, setRestaurants] = useState([]);
  const [data, setData] = useState(restaurants);
  const [sortBy, setSortBy] = useState("restaurant_name");
  const [pageNum, setPageNum] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    sortData("restaurant_name");
  }, [restaurants]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        initMap(position.coords.latitude, position.coords.longitude);
      },
      (error) => {
        alert(error);
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
            for (let i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }

            map.setCenter(results[0].geometry.location);
          } else {
            setIsLoading(false);
            alert("Something went wrong!\nKindly reload the webpage.");
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

        let distanceService = new window.google.maps.DistanceMatrixService();
        distanceService.getDistanceMatrix(
          {
            origins: [new window.google.maps.LatLng(lat, lng)],
            destinations,
            travelMode: window.google.maps.TravelMode.DRIVING,
          },
          (response, status) => {
            if (status === "OK" && response) {
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
            } else {
              alert("Something went wrong!");
            }
            setIsLoading(false);
          }
        );
      };
    }
  };
  window.initMap = initMap;

  const sortData = (param) => {
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
        isLoading,
      }}
    >
      {children}
    </RestaurantsContext.Provider>
  );
};

export default RestaurantsContext;
