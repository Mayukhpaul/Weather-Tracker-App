import React, { useEffect } from "react";
import { TiWeatherSunny } from "react-icons/ti";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Weather = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [weatherData, setWeatherData] = useState([]);
  const [onetemp, setOnetemp] = useState(30);
  const [twotemp, setTwotemp] = useState(30);
  const [threetemp, setThreetemp] = useState(30);
  const [fourtemp, setFourtemp] = useState(30);
  const [oneWeather, setOneWeather] = useState("");
  const [oneicon, setoneicon] = useState("");
  const [twoicon, settwoicon] = useState("");
  const [threeicon, setthreeicon] = useState("");
  const [fouricon, setfouricon] = useState("");
  const [humid, setHumid] = useState(0);
  const [wind, setWind] = useState(0);
  const [sea, setSea] = useState();
  const [days, setDays] = useState([]);
  const [date, setDate] = useState([]);
  const [city, setcity] = useState("Kolkata");
  const filter = [];

  const getCurrentAndNextThreeDates = () => {
    const currentDate = new Date();
    const dates = [formatDate(currentDate)]; // Start with the current date

    for (let i = 1; i <= 3; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i); // Add 1, 2, and 3 days to the current date
      dates.push(formatDate(nextDate));
    }

    return dates;
  };

  const getCurrentAndNextThreeDays = () => {
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDate = new Date();
    const days = [daysOfWeek[currentDate.getDay()]]; // Start with the current day

    for (let i = 1; i <= 3; i++) {
      const nextDate = new Date(currentDate);
      nextDate.setDate(currentDate.getDate() + i); // Add 1, 2, and 3 days to the current date
      days.push(daysOfWeek[nextDate.getDay()]);
    }

    return days;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const findFirstOccurrenceByField = (arr, field, searchString) => {
    for (const item of arr) {
      if (item[field].includes(searchString)) {
        return item; // Return the first object with the specified string in the field
      }
    }
    return null; // Return null if the string is not found in the array
  };

  const { location } = useParams();
  useEffect(() => {
    if (location == undefined) {
      setcity("Kolkata");
    } else {
      setcity(location);
    }

    const getWeatherData = async () => {
      const WeatherData = await axios.get(
        `?q=${city}&units=metric&appid=efe2dfe20c39c2680fa554b24b800590`
      );
      setWeatherData(WeatherData.data.list);
    };

    getWeatherData();
  }, [city]);

  useEffect(() => {
    const forecastData = () => {
      const currentAndNextThreeDates = getCurrentAndNextThreeDates();
      setDate(getCurrentAndNextThreeDates);
      const days = getCurrentAndNextThreeDays();
      setDays(days);

      for (let i = 0; i < 4; i++) {
        const fieldToSearch = "dt_txt";
        const searchString = currentAndNextThreeDates[i];

        const firstMatchedObject = findFirstOccurrenceByField(
          weatherData,
          fieldToSearch,
          searchString
        );

        filter[i] = firstMatchedObject;
      }

      if (filter[0] && filter[0].main) {
        console.log(filter);
        console.log(filter[0].weather[0].icon);
        setoneicon(filter[0].weather[0].icon);
        settwoicon(filter[1].weather[0].icon);
        setthreeicon(filter[2].weather[0].icon);
        setfouricon(filter[3].weather[0].icon);
        setOnetemp(Math.floor(filter[0].main.temp));
        setTwotemp(Math.floor(filter[1].main.temp));
        setThreetemp(Math.floor(filter[2].main.temp));
        setFourtemp(Math.floor(filter[3].main.temp));
        setOneWeather(filter[0].weather[0].description);
        setHumid(filter[0].main.humidity);
        setWind(Math.floor(filter[0].wind.speed));
        setSea(filter[0].main.sea_level);
      } else {
        // Handle the case when 'main' is undefined.
      }
    };

    forecastData();
  }, [weatherData]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeLocation = () => {
    let v = document.getElementById("locationInput").value;
    window.location.href = `http://localhost:3000/${v}`;
  };

  return (
    <>
      {isModalOpen && (
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full lg:mt-20 lg:ml-[520px] md:mt-20 md:ml-36"
        >
          <div class="relative w-full max-w-md max-h-full">
            <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                onClick={closeModal}
                class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  class="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span class="sr-only">Close modal</span>
              </button>
              <div class="px-6 py-6 lg:px-8">
                <h3 class="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Change your location
                </h3>
                <form class="space-y-6">
                  <div>
                    <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                      Your Location
                    </label>
                    <input
                      type="text"
                      id="locationInput"
                      class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="location"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    class="w-full text-white bg-blue-400 hover:bg-blue-500 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={changeLocation}
                  >
                    Change Location
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      <div class="w-full mt-8 lg:mt-36 lg:pl-72 justify-center container mx-8 md:mt-32 md:mx-12">
        <div class="flex flex-wrap w-full lg:w-auto">
          <div class="w-full lg:w-96 flex lg:rounded-l-lg bg-auto">
            <div class="lg:rounded-l-lg py-6 pl-8 pr-32 w-full bg-blue-400 opacity-90 text-white">
              <div class="mb-20">
                <h2 class="font-bold text-3xl leading-none pb-1">{days[0]}</h2>
                <h3 class="leading-none pb-2 pl-1">{date[0]}</h3>
                <p class="flex aling-center opacity-75">{city}</p>
              </div>
              <img
                src={`https://openweathermap.org/img/wn/${oneicon}@2x.png`}
              ></img>
              <div>
                <strong class="leading-none text-6xl block font-weight-bolder">
                  {onetemp}ºC
                </strong>
                <b class="text-2xl block font-bold">{oneWeather}</b>
              </div>
            </div>
          </div>
          <div class="w-full lg:w-5/12 flex ml-0">
            <div class=" bg-gray-800 text-white p-8 lg:rounded-r-lg w-full">
              <div class="flex justify-between w-64 mb-4 w-full">
                <div class="w-auto font-bold uppercase text-90">Sea Level</div>
                <div class="w-auto text-right">{sea} m</div>
              </div>
              <div class="flex justify-between w-64 mb-4 w-full">
                <div class="w-auto font-bold uppercase text-90">Humidity</div>
                <div class="w-auto text-right">{humid} %</div>
              </div>
              <div class="flex justify-between w-64 mb-8 w-full">
                <div class="w-auto font-bold uppercase text-90">Wind</div>
                <div class="w-auto text-right">{wind} Mph</div>
              </div>
              <div class="flex flex-row">
                <div class="flex flex-col w-1/4 bg-gray-100 text-black rounded-lg pb-4">
                  <div class="text-center pt-2 mb-2"></div>
                  <div class="text-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${oneicon}@2x.png`}
                    ></img>
                    <b class="font-normal">{days[0]}</b>
                    <br />
                    <strong class="text-xl">{onetemp}ºC</strong>
                  </div>
                </div>
                <div class="flex flex-col w-1/4 bg-gray-900 rounded-lg">
                  <div class="text-center pt-2 mb-2"></div>
                  <div class="text-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${twoicon}@2x.png`}
                    ></img>
                    <b class="font-normal">{days[1]}</b>
                    <br />
                    <strong class="text-xl">{twotemp}ºC</strong>
                  </div>
                </div>
                <div class="flex flex-col w-1/4 bg-gray-900 rounded-lg">
                  <div class="text-center pt-2 mb-2"></div>
                  <div class="text-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${threeicon}@2x.png`}
                    ></img>
                    <b class="font-normal">{days[2]}</b>
                    <br />
                    <strong class="text-xl">{threetemp}ºC</strong>
                  </div>
                </div>
                <div class="flex flex-col w-1/4 bg-gray-900 rounded-lg">
                  <div class="text-center pt-2 mb-2"></div>
                  <div class="text-center">
                    <img
                      src={`https://openweathermap.org/img/wn/${fouricon}@2x.png`}
                    ></img>
                    <b class="font-normal">{days[3]}</b>
                    <br />
                    <strong class="text-xl">{fourtemp}ºC</strong>
                  </div>
                </div>
              </div>
              <button
                data-modal-target="authentication-modal"
                data-modal-toggle="authentication-modal"
                onClick={openModal}
                className="block text-white bg-blue-400 hover:bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center lg:mt-8 lg:ml-36 md:mt-12 md:ml-52 mt-8 ml-12"
                type="button"
              >
                Change Location
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Weather;
