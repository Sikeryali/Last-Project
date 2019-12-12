$(() => {
    $('#search-form').submit((e) => {
        e.preventDefault();
        const searchTerm = $('#search-input').val();
        getRequest(searchTerm);
    });
    function getRequest(input) {
        const url = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?';
        const parameters = {
            q: input,
            ['api-key']: 'BK3yT3fGOecqnfR1cSFZtJwkLHT5aNic'
        };
        $.getJSON(url, parameters, (response) => {
            showResults(response.response.docs);
        });
        function showResults(articlesearch) {




            $.each(articlesearch, (i, value) => {
                $('#results').html(articlesearch);
                $('#results').append(`<h1>${value.headline.main}</h1>`);
                $('#results').append(`<h3>${value.snippet}</h3>`);
                $('#results').append(`<p>${value.byline.original}</p>`);
                $('#results').append(`<p>${value.lead_paragraph}</p>`);
                $('#results').append(`<p>${value.news_desk}</p>`);
                $('#results').append(`<p>${value.source}</p>`);
            });
        }

    }

});

window.addEventListener("load", () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector('.temperature span');

    if (navigator.geolocation) {
        //esle{ h1.textContext = "hey this is not working because some reason"
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const api = `${proxy}https://api.darksky.net/forecast/3e696a9a074d9410656fa8c37ff6133b/${lat},${long}`;

            fetch(api)
                .then(data => {
                    return data.json();
                })
                .then(data => {
                    const { temperature, summary, icon } = data.currently;
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;

                    let celsius = (temperature - 32) * ( 5 / 9 );

                    setIcons(icon, document.querySelector(".icon"));

                    temperatureSection.addEventListener("click", () => {
                        if (temperatureSpan.textContent === "F") {
                            temperatureSpan.textContent = "° C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        } else {
                            temperatureSpan.textContent = "F";
                            temperatureDegree.textContent = temperature;
                        }
                    });

                });
        });
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: "white" });
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});