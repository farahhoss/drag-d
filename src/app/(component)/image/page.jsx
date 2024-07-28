"use client";
import React, { useState, useContext } from "react";
import { Image, Button } from "@nextui-org/react"; // Ensure you import the Image component correctly
import NextImage from "next/image";
import { UserIcon } from "@/app/UserIcon";
import { UserContext } from "../context/UserContext";
import { DeletIcon } from "@/app/DeletIcon";

export default function Page() {
  const {
    handleDrop,
    handleAvatarClick,
    handleDragOver,
    handleDragLeave,
    handleImageChange,
    deleteUserImage,
    uploadedImage,

    isDragging,
  } = useContext(UserContext);

  return (
    <div className="grid  gap-1 ">
      {/* <h1>{userImage}</h1> */}
      <div
        className={`w-80 h-80 flex items-center justify-center relative overflow-hidden cursor-pointer ${
          isDragging ? "border-2 border-dashed border-gray-300" : ""
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        <div
          className="relative w-72 h-72 rounded-full mb-4 cursor-pointer"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={handleAvatarClick}
        >
          <input
            type="file"
            onChange={handleImageChange}
            id="fileInput"
            className="absolute  w-full h-full opacity-0 cursor-pointer"
          />
          <Image
            alt="Profile"
            width={300}
            height={300}
            as={NextImage}
            radius="full"
            className=" object-cover"
            src={
              uploadedImage ||
              "https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
            }
          />
        </div>
      </div>
      <div
        id="deleteButton   "
        className="absolute    top-[262.5px] left-[212px] z-[10000]"
      >
        <Button
          isIconOnly
          color="danger"
          variant="faded"
          onClick={deleteUserImage}
          aria-label="Take a photo"
        >
          <DeletIcon />
        </Button>
      </div>
    </div>
  );
}
