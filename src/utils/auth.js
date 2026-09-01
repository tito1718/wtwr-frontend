import { checkResponse } from "./api";

const baseUrl =
  import.meta.env.VITE_MAIN_API_URL || "http://localhost:3001";

export const signup = ({ name, avatar, email, password }) => {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  }).then(checkResponse);
};

export const signin = ({ email, password }) => {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  }).then(checkResponse);
};

export const checkToken = (token) => {
  return fetch(`${baseUrl}/users/me`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(checkResponse);
};
