import { Route, Routes } from "react-router-dom";
import "./App.css";
import Weather from "./Components/Weather";
import axios from "axios";

axios.defaults.baseURL = "https://api.openweathermap.org/data/2.5/forecast";
axios.defaults.params = {};
axios.defaults.params["appid"] = process.env.API_KEY;

function App() {
  return (
    <>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Weather />}/>
          <Route path="/:location" element={<Weather />}/>
        </Routes>
      </div>
    </>
  );
}

export default App;
