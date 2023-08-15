function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup-img ${card ? "popup_opened" : ""}`}>
      <div className="popup__image container">
        <img
          className="popup__photo"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="popup__caption">{card ? card.name : ""}</h2>
        <button
          className="popup__close popup-img__close"
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default ImagePopup;
