import React from 'react';

export const Worning = ({
    handleIsWorning = () => { },
}) => {

  return (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__text">
              Максимальна кількість міст - 5, потрібно видалити одне місто 
            </div>
          </div>

          <div className="modal__buttons">
            <button
              className="modal__button-delete"
              onClick={() => handleIsWorning(false)}
            >
              Зрозуміло
            </button>
          </div>
        </div>
      )
}
