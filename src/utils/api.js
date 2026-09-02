import { getToken } from "./token";

export const baseUrl =
  import.meta.env.VITE_MAIN_API_URL || "http://localhost:3001";

export const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }

  return Promise.reject(`Error: ${res.status}`);
};

export const getItems = () => {
  return fetch(`${baseUrl}/items`).then(checkResponse);
};

export const addItem = ({ name, imageUrl, weather }) => {
  const token = getToken();

  return fetch(`${baseUrl}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  }).then(checkResponse);
};

export const deleteItem = (id) => {
  const token = getToken();

  return fetch(`${baseUrl}/items/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const updateUser = ({ name, avatar }) => {
  const token = getToken();

  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      name,
      avatar,
    }),
  }).then(checkResponse);
};

export const addCardLike = (id) => {
  const token = getToken();

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};

export const removeCardLike = (id) => {
  const token = getToken();

  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};


export const deleteAccount = () => {
  const token = getToken();

  return fetch(`${baseUrl}/users/me`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return null;
    }

    return Promise.reject(`Error: ${res.status}`);
  });
};
