import React, { useState } from 'react';
import { HourlyWeather } from '../HourlyWeather/HourlyWeather';
import { WeekWeather } from '../WeekWeather/WeekWeather';
import translate from '../../api/translate.json';
import cn from 'classnames';
import './Forecast.scss';

export const Forecast = ({ cityId, language, theme }) => {
    const [activeTab, setActiveTab] = useState('one');

    return (
        <div className="forecast-container forecast">
            <div className="forecast__tabs">
                <div
                    className={(cn('forecast__item forecast__one',
                        { 'forecast__item--active': activeTab === 'one' }
                    ))}
                    onClick={() => setActiveTab('one')}
                >
                    {translate[0][language].oneDay}
                </div>
                <div
                    className={(cn('forecast__item forecast__five',
                        { 'forecast__item--active': activeTab === 'five' }
                    ))}
                    onClick={() => setActiveTab('five')}
                >
                    {translate[0][language].fiveDays}
                </div>
            </div>

            <div className="forecast__content">
                {activeTab === 'one' && (
                    <div className="forecast__one">
                        <HourlyWeather
                            cityId={cityId}
                            language={language}
                            theme={theme}
                        />
                    </div>
                )}

                {activeTab === 'five' && (
                    <div className="forecast__five">
                        <WeekWeather
                            cityId={cityId}
                            language={language}
                            theme={theme}
                        />
                    </div>
                )}
            </div>
        </div>
    )
}