import React, { useEffect, useState } from 'react';
import { getWeatherByCityHourly } from '../../api/weather';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import translate from '../../api/translate.json';
import { Loader } from '../Loader/Loader';
import './WeekWeather.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const WeekWeather = ({ cityId, language, theme }) => {
    const [weekWeather, setWeekWeather] = useState(null);
    const [labels, setLabels] = useState([]);
    const [temperature, setTemperature] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (cityId) {
            setLoading(true);
            getWeatherByCityHourly(cityId)
                .then((response) => {
                    setWeekWeather(response);
                    prepareData(response.list);
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                })
        }
    }, [cityId]);

    const prepareData = (weekWeather) => {
        const labels = [];
        const temperature = [];
        for (let i = 0; i < weekWeather.length; i = i + 8) {

            const date = new Date(weekWeather[i].dt_txt);
            const day = date.getDate();
            const month = date.getMonth() + 1;
            const label = `${day}.${month}`;
            const temperatureArray = weekWeather.slice(i, i + 8);
            const avarageTemperature = Math.round(temperatureArray.reduce((acc, item) => {
                return acc + item.main.temp;
            }, 0) / temperatureArray.length);

            labels.push(label);
            temperature.push(avarageTemperature);
        }
        setLabels(labels);
        setTemperature(temperature);
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: translate[0][language].temperatureChart,
                color: theme === 'light' ? "#000" : "#d3d3dd",
            },
        },
        scales: {
            x: {
                grid: {
                    color: "#d3d3dd",
                },
                ticks: {
                    color: theme === 'light' ? "#000" : "#d3d3dd",
                }
            },
            y: {
                grid: {
                    color: "#d3d3dd",
                },
                ticks: {
                    color: theme === 'light' ? "#000" : "#d3d3dd",
                }
            }
        },
    };

    const data = {
        labels,
        datasets: [
            {
                id: 1,
                label: '',
                data: temperature,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    return (
        <>
            {loading && (
                <Loader />
            )}
            {weekWeather && !loading && (
                <div className="hourly-weather">
                    <div className="hourly-weather__chart">
                        <Line options={options} data={data} />;
                    </div>
                </div>
            )}
        </>
    )
}