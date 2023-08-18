import React from "react";
import success from "../images/success.svg";
import fail from "../images/fail.svg";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
  return (
    <div className={`popup popup-info ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container popup__container-info">
      { isSuccess ? (
            <>
              <img src={success} className="popup__icon" alt="галочка" />
              <p className="popup__text">Вы успешно зарегистрировались!</p>
            </>
          ) : (
            <>
              <img src={fail} className="popup__icon" alt="крестик" />
              <p className="popup__text">Что-то пошло не так! Попробуйте ещё раз.</p>
            </>
          ) }
        <button
          className="popup__close popup-info__close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default InfoTooltip;
