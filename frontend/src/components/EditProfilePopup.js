import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const currentUser = React.useContext(CurrentUserContext);

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  function handleSubmit(evt) {
    // Запрещаем браузеру переходить по адресу формы
    evt.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: name,
      about: description,
    });
  }

  function handleChangeName(evt) {
    setName(evt.target.value);
  }

  function handleChangeDescription(evt) {
    setDescription(evt.target.value);
  }

  return (
    <PopupWithForm
      title={"Редактировать профиль"}
      name={"edit"}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        id="input-name"
        className="input popup__input popup__input-name"
        placeholder="Имя"
        name="user"
        value={name || ""}
        onChange={handleChangeName}
        minLength={2}
        maxLength={40}
        required
      />
      <span className="popup__input-error input-name-error popup__input-error_type_name" />
      <input
        type="text"
        id="input-job"
        className="input popup__input popup__input-job"
        placeholder="О себе"
        name="job"
        value={description || ""}
        onChange={handleChangeDescription}
        minLength={2}
        maxLength={200}
        required
      />
      <span className="popup__input-error input-job-error popup__input-error_type_job" />
    </PopupWithForm>
  );
}

export default EditProfilePopup;
