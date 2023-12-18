import React, { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
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
import './HourlyWeather.scss';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const HourlyWeather = ({ cityId, language, theme }) => {
    const [hourlyWeather, setHourlyWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [labels, setLabels] = useState([]);
    const [temperature, setTemperature] = useState([]);

    useEffect(() => {
        if (cityId) {
            setLoading(true);
            getWeatherByCityHourly(cityId)
                .then((response) => {
                    setHourlyWeather(response);
                    prepareData(response.list.slice(0, 4));
                    setLoading(false);
                })
                .catch((error) => {
                    setLoading(false);
                })
        }
    }, [cityId]);

    const prepareData = (hourlyWeather) => {
        const hourLabels = hourlyWeather.map((item) => {
            return item.dt_txt.split(' ')[1].slice(0, 5);
        });

        const hourTemperature = hourlyWeather.map((item) => {
            return Math.round(item.main.temp);
        });
        setLabels(hourLabels);
        setTemperature(hourTemperature);
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
            {hourlyWeather && !loading && (
                <div className="hourly-weather">
                    <div className="hourly-weather__chart">
                        <Line options={options} data={data} />
                    </div>
                </div>
            )}
        </>
    )
}