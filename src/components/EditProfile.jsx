import React, { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age);
  const [about, setAbout] = useState(user.about);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    try {
      // Log the payload being sent to ensure it's correct
      console.log({
        firstName,
        lastName,
        photoUrl,
        age,
        gender,
        about,
      });

      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl, age, gender, about },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.data));

      // Clear error if successful
      setError("");
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (err) {
      // Log full error to see what went wrong
      console.error("Error response:", err?.response);

      // Set error message for user
      setError(
        err?.response?.data?.message || "An error occurred. Please try again."
      );
    }
  };

  return (
    <>
      <div className="flex justify-center gap-4">
        <div className="flex justify-center my-3">
          <div className="card bg-base-300 w-80 shadow-xl">
            <div className="card-body p-2">
              <h2 className="card-title justify-center mb-4">Edit Profile</h2>
              <div>
                <label className="form-control w-full max-w-xs mb-3">
                  <span className="label-text">First Name:</span>
                  <input
                    type="text"
                    value={firstName}
                    className="input input-bordered w-full max-w-xs bg-black"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs mb-3">
                  <span className="label-text">Last Name:</span>
                  <input
                    type="text"
                    value={lastName}
                    className="input input-bordered w-full max-w-xs bg-black"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs mb-3">
                  <span className="label-text">Profile Photo Url:</span>
                  <input
                    type="text"
                    value={photoUrl}
                    className="input input-bordered w-full max-w-xs bg-black"
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
                <label className="form-control w-full max-w-xs mb-3">
                  <span className="label-text">Age:</span>
                  <input
                    type="number" // Ensure age is a number
                    value={age}
                    className="input input-bordered w-full max-w-xs bg-black"
                    onChange={(e) => setAge(Number(e.target.value))} // Convert string to number
                  />
                </label>
                

                <label className="form-control w-full max-w-xs mb-3">
                  <span className="label-text">About:</span>
                  <input
                    type="text"
                    value={about}
                    className="input input-bordered w-full max-w-xs bg-black"
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>
              {error && <div className="alert alert-error mt-2">{error}</div>}
              <div className="card-actions justify-center">
                <button
                  className="btn btn-primary cursor-pointer"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <UserCard
  user={{ firstName, lastName, photoUrl, age, gender, about }}
  showActions={false} // Hide buttons in EditProfile
/>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile updated successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
