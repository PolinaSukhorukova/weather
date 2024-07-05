import React from 'react';
import './Modal.scss';
import translate from '../../api/translate.json';

export const Modal = ({
  handleModalDelete = () => { },
  language,
}) => {

  return (
        <div className="modal">
          <div className="modal__content">
            <div className="modal__text">
              {translate[0][language].cityDeliting}
            </div>
          </div>

          <div className="modal__buttons">
            <button
              className="modal__button-delete"
              onClick={() => handleModalDelete(true)}
            >
              {translate[0][language].delete}
            </button>

            <button
              className="modal__button-cancel"
              onClick={() => handleModalDelete(false)}
            >
              {translate[0][language].cancel}
            </button>
          </div>
        </div>
      )
}
