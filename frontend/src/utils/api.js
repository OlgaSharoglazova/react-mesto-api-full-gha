class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(res.status);
  }

  async getProfile() {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return this._checkResponse(response);
  }

  async getInitialCards() {
    const response = await fetch(`${this._baseUrl}/cards`, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return this._checkResponse(response);
  }
 
  async editProfile(dataUser) {
    const response = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify({
        name: `${dataUser.name}`,
        about: `${dataUser.about}`,
      }),
    });
    return this._checkResponse(response);
  }

  async addCard(dataCard) {
    const response = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(dataCard),
    });
    return this._checkResponse(response);
  }

  async deleteCard(id) {
    const response = await fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return this._checkResponse(response);
  }

  async addLikeCard(id) {
    const response = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return this._checkResponse(response);
  }

  async removeLikeCard(id) {
    const response = await fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    return this._checkResponse(response);
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLikeCard(id);
    } else {
      return this.removeLikeCard(id);
    }
  }

  async changeAvatar(avatar) {
    const response = await fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
      body: JSON.stringify(avatar),
    });
    return this._checkResponse(response);
  }
}

export const api = new Api({
  baseUrl: "https://api.bsk.nomoreparties.co",
});
