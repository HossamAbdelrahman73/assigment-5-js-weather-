"use strict";

const inputSearch = document.getElementById("inp-loc");
const findBtn = document.getElementById("btn-find");
const backgroundContent = document.querySelector(".background-content");

getWeather();

findBtn.addEventListener("click", function (e) {
  getWeather(inputSearch.value);
});

async function getWeather(city = "cairo") {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=7132092baa284197bec201603242106&q=${city}&days=3`
  );
  const data = await response.json();
  localStorage.setItem("weather", data);
  displayWeather(data);
  console.log(data);
}

function displayWeather(data) {
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const d = new Date();
  // console.log();
  const month = d.toLocaleString("default", { month: "long" });
  let day = weekday[d.getDay()];
  let numday = d.getDay();

  if (numday == 6) {
    numday = 0;
  } else {
    numday++;
  }
  let nextday = weekday[numday];

  if (numday == 6) {
    numday = 0;
  } else {
    numday++;
  }

  let nextNextday = weekday[numday];

  let cartona = `
     <div class="row g-0">
            <div class="col-12 col-lg-4">
              <div class="curr-day bg-secondary rounded-4">
                <div class="day-date d-flex p-2 justify-content-between">
                  <span>${day}</span>
                  <span>${d.getDate()}${month}</span>
                </div>
                <div class="weather p-3">
                  <p class="city pt-3">${data.location.name}</p>
                  <p class="temperature">
                    ${
                      data.current.temp_c
                    }<span style="font-size: 90px">&#8451;</span>
                  </p>
                  <span>
                    <img src="${data.current.condition.icon}" alt="" />
                  </span>
                  <p class="situation">${data.current.condition.text}</p>
                  <div class="icon-text-curr d-flex gap-4">
                    <div>
                      <img src="img/icon-umberella.png" alt="" />
                      <span>20%</span>
                    </div>
                    <div>
                      <img src="img/icon-wind.png" alt="" />
                      <span>18km/h</span>
                    </div>
                    <div>
                      <img src="img/icon-compass.png" alt="" />
                      <span>East</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4">
              <div class="next-day h-100">
                <div class="day-date text-center p-2">${nextday}</div>
                <div class="weather text-center pt-5">
                  <span>
                    <img src="${
                      data.forecast.forecastday[1].day.condition.icon
                    }" alt="" />
                  </span>
                  <p class="temperature pt-3 mb-0">${
                    data.forecast.forecastday[1].day.maxtemp_c
                  }&deg;c</p>
                  <span class="special-degree">${
                    data.forecast.forecastday[1].day.mintemp_c
                  }<sup>&deg;</sup></span>
                  <p class="situation mt-3">${
                    data.forecast.forecastday[1].day.condition.text
                  }</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-lg-4">
              <div class="nextNext-day h-100">
                <div class="day-date text-center p-2">${nextNextday}</div>
                <div class="weather text-center pt-5">
                  <span>
                    <img src="${
                      data.forecast.forecastday[2].day.condition.icon
                    }" alt="" />
                  </span>
                  <p class="temperature pt-3 mb-0">${
                    data.forecast.forecastday[2].day.maxtemp_c
                  }&deg;c</p>
                  <span class="special-degree">${
                    data.forecast.forecastday[2].day.mintemp_c
                  }<sup>&deg;</sup></span>
                  <p class="situation mt-3">${
                    data.forecast.forecastday[2].day.condition.text
                  }</p>
                </div>
              </div>
            </div>
          </div>
  `;
  backgroundContent.innerHTML = cartona;
}

// getWeather("cairo");
