function fetchandjson(url, error='') {
  return fetch(url).then((response) => {
    
    //To check if response is fulfilled
    if (!response.ok) throw new Error(error);
    return response.json();
    
  });
}

const getcitycoords = async function (city) {
  //Please input your api key at Your_API_Key
  try {
    const countrycoords = await fetchandjson(
      `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=Your_API_Key`
    );
    
    const countrydata = countrycoords[0];
    const latitude = countrydata.lat;
    const longitude = countrydata.lon;

    const weather = await fetchandjson(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=Your_API_Key`)
    //console.log(weather);

    const temp_in_kelvin = weather.main.temp;
    const kelvin_to_farenheit = Math.ceil((temp_in_kelvin - 273.15) * 1.8 + 32) + "℗F";
    const show_values = [weather.name,weather.sys.country,kelvin_to_farenheit ,weather.weather[0].description]
    console.log(show_values);


  } catch (err) {
    return err.message;
  }
};
getcitycoords("cityname");
