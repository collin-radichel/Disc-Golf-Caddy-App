import React, {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import axios from 'axios';

function UserPage() {

  const dispatch = useDispatch();
  const [profilePic, setProfilePic] = useState('')

  const handleFileChange = (event) => {
    console.log(event.target.files[0]);
    setProfilePic(event.target.files[0])
  }

  const handleFileUpload = () => {
    dispatch({ type: "UPDATE_PROFILE_PIC", payload: profilePic });
  }


  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div>
        <h1>ADD PROFILE PIC:</h1>
        <input
        type="file"
        onChange={handleFileChange}
        />
        <button onClick={handleFileUpload}>Upload</button>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
