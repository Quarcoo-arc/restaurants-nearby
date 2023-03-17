import { Header } from "./components";

function App() {
  navigator.geolocation.getCurrentPosition(
    (position) =>
      console.log(position.coords.latitude, position.coords.longitude),
    () => console.log("error")
  );
  return (
    <div>
      <Header />
    </div>
  );
}

export default App;
