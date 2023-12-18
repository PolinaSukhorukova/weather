const param = {
	"url": "https://api.openweathermap.org/data/2.5/",
	"appid": "4190ce0151574d32435e5fe5058ed272"
};

export const getWeatherByCity = async (cityId, language) => {
    const res = await fetch(`${param.url}weather?id=${cityId}&APPID=${param.appid}&units=metric&lang=${language}`);
    return await res.json();
}

export const getWeatherByCityHourly = async (cityId, language) => {
    const res = await fetch(`${param.url}forecast?id=${cityId}&APPID=${param.appid}&units=metric&lang=${language}`);
    return await res.json();

}