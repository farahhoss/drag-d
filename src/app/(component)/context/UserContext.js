// context/UserContext.js
import React, { createContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userImage, setUserImage] = useState(1);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const validImageTypes = ["image/jpeg", "image/png", "image/jpg"];
  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && validImageTypes.includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      alert("Only .jpg, .jpeg, and .png files are allowed.");
    }
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && validImageTypes.includes(file.type)) {
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    } else {
      alert("Only .jpg, .jpeg, and .png files are allowed.");
    }
  };

  const handleAvatarClick = () => {
    document.getElementById("fileInput").click();
  };

  const deleteUserImage = () => {
    setUploadedImage(null);
  };

  return (
    <UserContext.Provider
      value={{
        userImage,
        setUserImage,
        handleDrop,
        handleAvatarClick,
        handleDragOver,
        handleDragLeave,
        handleImageChange,
        deleteUserImage,
        uploadedImage,
        setUploadedImage,
        isDragging,
        setIsDragging,
        validImageTypes,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
