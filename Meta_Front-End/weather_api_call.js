fetch("https://api.openweathermap.org/data/2.5/weather?q=Accra&units=metric&appid=8bf2c24c7cc34818a439f614f1284931")
        .then(response => response.json())
        .then(data => {
                console.log(data);
                // document.getElementById("location").innerHTML = data.name;
                // document.getElementById("temperature").innerHTML = data.main.temp;
                // document.getElementById("conditions").innerHTML = data.weather[0].description;
        })
        .catch(error => console.log(error));