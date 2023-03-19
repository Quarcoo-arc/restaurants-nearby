import { useContext } from "react";
import {
  Footer,
  Header,
  Pagination,
  RestaurantsList,
  Sort,
  Spinner,
} from "./components";
import RestaurantsContext from "./context/RestaurantsContext";

function App() {
  const { isLoading } = useContext(RestaurantsContext);
  return (
    <>
      <Header />
      <div id="map"></div>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <Sort />
          <RestaurantsList />
          <Pagination />
        </>
      )}

      <Footer />
    </>
  );
}

export default App;
