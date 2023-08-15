import editAvatar from "../images/pencil.svg";
import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__info">
          <div className="profile__avatar">
            <img
              className="profile__avatar-img"
              src={currentUser.avatar}
              alt="аватар"
            />
            <button
              className="profile__avatar-button"
              type="button"
              onClick={onEditAvatar}
            >
              <img
                className="profile__avatar-pen"
                alt="карандаш"
                src={editAvatar}
              />
            </button>
          </div>
          <div className="profile__title">
            <div className="profile__name-edit">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="button profile__edit-button"
                type="button"
                aria-label="редактировать профиль"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__profession">{currentUser.about}</p>
          </div>
        </div>
        <button
          className="button profile__add-button"
          type="button"
          aria-label="добавить фото"
          onClick={onAddPlace}
        />
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
