import { Header } from "./components";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <div>
        <Header />
        {/* {restaurants && restaurants.map((rest) => <h3>{rest.name}</h3>)} */}
        <div id="map"></div>
      </div>
    </RestaurantsContextProvider>
  );
}

export default App;
