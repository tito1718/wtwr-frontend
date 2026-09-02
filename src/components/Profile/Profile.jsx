import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  clothingItems,
  handleCardClick,
  handleCardLike,
  handleAddClick,
  handleEditProfileClick,
  handleSignOut,
  handleDeleteAccountClick,
  isLoggedIn,
}) {
  return (
    <main className="profile">
      <SideBar
        handleEditProfileClick={handleEditProfileClick}
        handleSignOut={handleSignOut}
        handleDeleteAccountClick={handleDeleteAccountClick}
      />

      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleCardLike={handleCardLike}
        handleAddClick={handleAddClick}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}

export default Profile;
