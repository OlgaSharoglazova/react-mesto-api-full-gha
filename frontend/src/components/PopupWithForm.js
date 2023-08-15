function PopupWithForm({
  title,
  name,
  children,
  isOpen,
  onClose,
  buttonTitle,
  onSubmit,
}) {
  return (
    <div className={`popup popup-${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container container">
        <h2 className="popup__title">{title}</h2>
        <form
          className={`form popup__form form-${name}`}
          name={`form-${name}`}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`button popup__button popup-${name}__button`}
            type="submit"
          >
            {buttonTitle}
          </button>
        </form>
        <button
          className={`popup__close popup-${name}__close`}
          type="button"
          aria-label="закрыть"
          onClick={onClose}
        />
      </div>
    </div>
  );
}

export default PopupWithForm;
