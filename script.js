/* 
Don't abuse my key, I just don't think this project
is worth posting on Vercel and Github Pages forces me
to leave all assets as public >:(
*/
let APIKey = "2a3062d4f768ab9b55d40dd617c386c3";

document.querySelector(".search").addEventListener("submit", async (e) => {
  e.preventDefault();

  let unit = document.querySelector('input[name="units"]:checked').value;

  let unitSymbol = defineSymbol(unit);

  let input = document.querySelector("#searchInput").value;

  if (input == "") {
    clearInfo();
    showWarning("First, type something to be searched!");
  } else {
    clearInfo();
    showWarning("Loading....");

    let result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
        input
      )}&appid=${APIKey}&units=${unit}`
    );

    let json = await result.json();

    if (json.cod === 200) {
      showInfo(
        {
          name: json.name,
          country: json.sys.country,
          temp: json.main.temp,
          tempIcon: json.weather[0].icon,
        },
        unitSymbol
      );
    } else {
      clearInfo();
      showWarning("Location not found.");
    }
  }
});

function showInfo(json, unitSymbol) {
  clearInfo();

  document.querySelector(".panel").style.display = "block";

  document.querySelector(".title").innerHTML = `${json.name}, ${json.country}`;
  document.querySelector(
    ".tempInfo"
  ).innerHTML = `${json.temp} <sup>${unitSymbol}</sup>`;
  document
    .querySelector(".temp img")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
    );
}

function showWarning(errorMessage) {
  document.querySelector(".warning").innerHTML = errorMessage;
}

function clearInfo() {
  showWarning("");
  document.querySelector(".panel").style.display = "none";
}

function defineSymbol(unit) {
  const result = unit === "metric" ? "ºC" : "ºF";
  return result;
}
