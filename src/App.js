import {
  Footer,
  Header,
  Pagination,
  RestaurantsList,
  Sort,
} from "./components";
import { RestaurantsContextProvider } from "./context/RestaurantsContext";

function App() {
  return (
    <RestaurantsContextProvider>
      <Header />
      <div id="map"></div>
      <Sort />
      <RestaurantsList />
      <Pagination />
      <Footer />
    </RestaurantsContextProvider>
  );
}

export default App;
