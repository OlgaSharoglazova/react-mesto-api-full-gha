import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = React.useRef();

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  return (
    <PopupWithForm
      title={"Обновить аватар"}
      name={"avatar"}
      isOpen={isOpen}
      onClose={onClose}
      buttonTitle={"Сохранить"}
      onSubmit={handleSubmit}
    >
      <input
        ref={avatarRef}
        type="url"
        id="input-avatar"
        className="input popup__input popup__input-avatar"
        placeholder="https://somewebsite.com/someimage.jpg"
        name="avatar"
        required
      />
      <span className="popup__input-error input-avatar-error popup__input-error_type_avatar" />
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
