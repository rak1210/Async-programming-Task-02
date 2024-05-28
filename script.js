var container = document.createElement("div");
container.className = "container";

var row = document.createElement("div");
row.className = "row";

async function fetchData() {
    try {
        let response = await fetch("https://restcountries.com/v3.1/all");
        let countries = await response.json();
        console.log(countries);

        for (let i = 0; i < countries.length; i++) {
            let country = countries[i];

            let col = document.createElement("div");
            col.className = "col-lg-4";

            let lat = country.latlng[0];
            let lon = country.latlng[1];

           // let weatherResponse = await fetchWeather(lat, lon);
           // let weatherData = await weatherResponse.json();

            col.innerHTML = `  
            <div class="card" style="width: 18rem;">
                <img src="${country.flags.png}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">Name: ${country.name.common}</h5>
                    <p class="card-text">Capital: ${country.capital}</p>
                    <p class="card-text">Region: ${country.region}</p>
                    <p class="card-text">Latlng: ${country.latlng}</p>
                    <p class="card-text">Code: ${country.cca3}</p>
                    <button onclick="fetchWeather(${lat},${lon})" class="btn btn-primary">Click for Weather</button>
                </div>
            </div>      
            `;

            row.appendChild(col);
        }

        container.appendChild(row);
        document.body.appendChild(container);
    } catch (error) {
        console.log(error);
    }
}

async function fetchWeather(lat, lon) {
    try {
        let response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=e21b69db72ebd651ddf1f1e4afb49bf8`
        );
        response=await response.json();
        console.log(response);
        alert(response.main.temp);
        return response;
    } catch (error) {
        console.log(error);
    }
}

fetchData();