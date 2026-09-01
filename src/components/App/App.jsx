import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

import {
  getItems,
  addItem,
  deleteItem,
  updateUser,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { signup, signin, checkToken } from "../../utils/auth";
import { setToken, getToken, removeToken } from "../../utils/token";
import { coordinates } from "../../utils/constants";
import { getWeather, filterWeatherData } from "../../utils/weatherApi";

import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";
import CurrentUserContext from "../../contexts/CurrentUserContext";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Profile from "../Profile/Profile";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import AddItemModal from "../AddItemModal/AddItemModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temperature: {
      F: 999,
      C: 999,
    },
    city: "",
    condition: "",
    isDay: true,
  });

  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [cardToDelete, setCardToDelete] = useState(null);

  const [currentUser, setCurrentUser] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [registrationError, setRegistrationError] = useState("");
  const [loginError, setLoginError] = useState("");
  const [profileError, setProfileError] = useState("");
  const [addItemError, setAddItemError] = useState("");
  const [deleteItemError, setDeleteItemError] = useState("");

  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [isAddingItem, setIsAddingItem] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);
  const [isDeletingItem, setIsDeletingItem] = useState(false);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit((currentUnit) =>
      currentUnit === "F" ? "C" : "F",
    );
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setActiveModal("preview");
  };

  const handleAddClick = () => {
    setAddItemError("");
    setActiveModal("add-garment");
  };

  const handleRegisterClick = () => {
    setRegistrationError("");
    setLoginError("");
    setActiveModal("register");
  };

  const handleLoginClick = () => {
    setRegistrationError("");
    setLoginError("");
    setActiveModal("login");
  };

  const handleEditProfileClick = () => {
    setProfileError("");
    setActiveModal("edit-profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
    setCardToDelete(null);
    setRegistrationError("");
    setLoginError("");
    setProfileError("");
    setAddItemError("");
    setDeleteItemError("");
  };

  const handleRegistration = ({ name, avatar, email, password }, resetForm) => {
    setRegistrationError("");
    setIsRegistering(true);

    signup({
      name,
      avatar,
      email,
      password,
    })
      .then(() =>
        signin({
          email,
          password,
        }),
      )
      .then(({ token }) => {
        setToken(token);
        return checkToken(token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);

        if (err === "Error: 409") {
          setRegistrationError("An account with this email already exists.");
        } else {
          setRegistrationError("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setIsRegistering(false);
      });
  };

  const handleLogin = ({ email, password }, resetForm) => {
    setLoginError("");
    setIsLoggingIn(true);

    signin({
      email,
      password,
    })
      .then(({ token }) => {
        setToken(token);
        return checkToken(token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);

        if (err === "Error: 401") {
          setLoginError("Email or password incorrect");
        } else {
          setLoginError("Something went wrong. Please try again.");
        }
      })
      .finally(() => {
        setIsLoggingIn(false);
      });
  };

  const handleLogout = () => {
    removeToken();
    setCurrentUser({});
    setIsLoggedIn(false);
  };

  const handleUpdateUser = ({ name, avatar }, resetForm) => {
    setProfileError("");
    setIsUpdatingProfile(true);

    updateUser({
      name,
      avatar,
    })
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setProfileError("Unable to update your profile. Please try again.");
      })
      .finally(() => {
        setIsUpdatingProfile(false);
      });
  };

  const handleCardLike = ({ _id, isLiked }) => {
    const likeAction = isLiked ? removeCardLike : addCardLike;

    likeAction(_id)
      .then((updatedCard) => {
        setClothingItems((items) =>
          items.map((item) => (item._id === _id ? updatedCard : item)),
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const openConfirmationModal = (card) => {
    setDeleteItemError("");
    setCardToDelete(card);
    setActiveModal("delete-confirmation");
  };

  const handleCardDelete = () => {
    if (!cardToDelete) {
      return;
    }

    const cardId = cardToDelete._id;

    setDeleteItemError("");
    setIsDeletingItem(true);

    deleteItem(cardId)
      .then(() => {
        setClothingItems((items) =>
          items.filter((item) => item._id !== cardId),
        );

        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setDeleteItemError("Unable to delete the garment. Please try again.");
      })
      .finally(() => {
        setIsDeletingItem(false);
      });
  };

  const handleAddItemSubmit = (item, resetForm) => {
    setAddItemError("");
    setIsAddingItem(true);

    addItem({
      name: item.name,
      imageUrl: item.imageUrl,
      weather: item.weather,
    })
      .then((newItem) => {
        setClothingItems((items) => [newItem, ...items]);
        resetForm();
        closeActiveModal();
      })
      .catch((err) => {
        console.error(err);
        setAddItemError("Unable to add the garment. Please try again.");
      })
      .finally(() => {
        setIsAddingItem(false);
      });
  };

  useEffect(() => {
    if (!activeModal) {
      return undefined;
    }

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    const fetchWeather = (selectedCoordinates) => {
      getWeather(selectedCoordinates)
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch((err) => {
          console.error(err);
        });
    };

    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by this browser.");
      fetchWeather(coordinates);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userCoordinates = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };

        fetchWeather(userCoordinates);
      },
      (err) => {
        console.error("Error getting geolocation:", err);
        fetchWeather(coordinates);
      },
    );
  }, []);

  useEffect(() => {
    getItems()
      .then((items) => {
        setClothingItems(items);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const token = getToken();

    if (!token) {
      return;
    }

    checkToken(token)
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error(err);
        removeToken();
        setCurrentUser({});
        setIsLoggedIn(false);
      });
  }, []);

  return (
    <CurrentTemperatureUnitContext.Provider
      value={{
        currentTemperatureUnit,
        handleToggleSwitchChange,
      }}
    >
      <CurrentUserContext.Provider value={currentUser}>
        <div className="page">
          <div className="page__content">
            <Header
              weatherData={weatherData}
              handleAddClick={handleAddClick}
              isLoggedIn={isLoggedIn}
              handleRegisterClick={handleRegisterClick}
              handleLoginClick={handleLoginClick}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    clothingItems={clothingItems}
                    handleCardClick={handleCardClick}
                    handleCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute isLoggedIn={isLoggedIn}>
                    <Profile
                      clothingItems={clothingItems}
                      handleCardClick={handleCardClick}
                      handleCardLike={handleCardLike}
                      handleAddClick={handleAddClick}
                      handleEditProfileClick={handleEditProfileClick}
                      handleSignOut={handleLogout}
                      isLoggedIn={isLoggedIn}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>

          <AddItemModal
            isOpen={activeModal === "add-garment"}
            onAddItem={handleAddItemSubmit}
            onCloseModal={closeActiveModal}
            isLoading={isAddingItem}
            serverError={addItemError}
            onClearError={() => setAddItemError("")}
          />

          <RegisterModal
            isOpen={activeModal === "register"}
            onRegister={handleRegistration}
            onCloseModal={closeActiveModal}
            onLoginClick={handleLoginClick}
            serverError={registrationError}
            onClearError={() => setRegistrationError("")}
            isLoading={isRegistering}
          />

          <LoginModal
            isOpen={activeModal === "login"}
            onLogin={handleLogin}
            onCloseModal={closeActiveModal}
            onRegisterClick={handleRegisterClick}
            serverError={loginError}
            onClearError={() => setLoginError("")}
            isLoading={isLoggingIn}
          />

          <EditProfileModal
            isOpen={activeModal === "edit-profile"}
            onClose={closeActiveModal}
            onUpdateUser={handleUpdateUser}
            isLoading={isUpdatingProfile}
            serverError={profileError}
            onClearError={() => setProfileError("")}
          />

          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            onDeleteClick={openConfirmationModal}
          />

          <DeleteConfirmationModal
            isOpen={activeModal === "delete-confirmation"}
            onClose={closeActiveModal}
            onConfirm={handleCardDelete}
            isLoading={isDeletingItem}
            serverError={deleteItemError}
          />
        </div>
      </CurrentUserContext.Provider>
    </CurrentTemperatureUnitContext.Provider>
  );
}

export default App;
