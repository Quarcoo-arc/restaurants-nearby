import { Header, RestaurantsList } from "./components";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <div>
        <Header />
        <div id="map"></div>
        <RestaurantsList />
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
