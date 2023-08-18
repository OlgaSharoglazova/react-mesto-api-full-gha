import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const nameRef = React.useRef();
  const linkRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameRef.current.value,
      link: linkRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title={"Новое место"}
      name={"add"}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={"Создать"}
      onSubmit={handleSubmit}
    >
      <input
        ref={nameRef}
        type="text"
        id="input-title"
        className="input popup__input popup-add__input popup__input-title"
        placeholder="Название"
        name="name"
        minLength={2}
        maxLength={30}
        required
      />
      <span className="popup__input-error input-title-error popup__input-error_type_title " />
      <input
        ref={linkRef}
        type="url"
        id="input-link"
        className="input popup__input popup__input-link"
        placeholder="Ссылка на картинку"
        name="link"
        required
      />
      <span className="popup__input-error input-link-error popup__input-error_type_link" />
    </PopupWithForm>
  );
}

export default AddPlacePopup;
