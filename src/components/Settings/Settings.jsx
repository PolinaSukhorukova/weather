import React from 'react';
import './Settings.scss';

export const Settings = ({
    handleChange = () => {},
    name,
}) => {
    return (
        <div className={name}>
            <label className="switch">
                <input 
                    type="checkbox" 
                    className="switch__input" 
                    onChange={() => handleChange()}
                />
                <span className="switch__slider"></span>
            </label>
        </div>
    )
}