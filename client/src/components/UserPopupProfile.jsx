import React, { useContext, useState } from "react";
import Add from "../img/add_image.png";
import blank from "../img/blank.png";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const UserPopupProfile = () => {
  const { isUserPopup, setIsUserPopup, currentUser, logout } =
    useContext(AuthContext);
  const [email, setEmail] = useState(currentUser.email || "");
  const [username, setUsername] = useState(currentUser.username || "");
  const [file, setFile] = useState("");
  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post("/upload", formData);
      return res.data;
    } catch (error) {}
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let imgUrl;
    if (file) {
      imgUrl = await upload();
    } else {
      imgUrl = "";
    }
    try {
      await axios.put(`/auth/updateUser/${currentUser._id}`, {
        username,
        email,
        profilePicture: imgUrl,
      });
      setIsUserPopup(false);
      await logout();
    } catch (error) {}
  };
  return (
    <div className="userPopupConatiner">
      <button id="close" onClick={() => setIsUserPopup(!isUserPopup)}>
        X
      </button>
      <form onSubmit={handleSubmit}>
        <div className="inputbox">
          <input
            required
            type="text"
            placeholder="username"
            name="username"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="inputbox">
          <input
            required
            type="email"
            placeholder="email"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="inputbox">
          <input
            type="file"
            name="file"
            id="file"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label className="file" htmlFor="file">
            <img src={Add} alt="" /> Change Profile Picture
          </label>
        </div>
        <button type="submit">Update</button>
      </form>
      <div className="profilePicture">
        <img
          src={
            currentUser.profilePicture
              ? `../upload/${currentUser.profilePicture}`
              : blank
          }
          alt=""
        />
      </div>
    </div>
  );
};

export default UserPopupProfile;
