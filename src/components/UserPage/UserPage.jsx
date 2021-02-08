import React, {useState} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import {useSelector} from 'react-redux';
import { useDispatch } from "react-redux";
import * as filestack from 'filestack-js';

function UserPage() {

  const dispatch = useDispatch();

  const client = filestack.init('API_KEY_HERE');
  const options = {
    onUploadDone: (file) => {
      console.log('file:', file);
      dispatch({ type: "UPDATE_PROFILE_PIC", payload: { url : file.filesUploaded[0].url, id: user.id }});
    }
  }
  client.picker(options).open();



  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <p>Your ID is: {user.id}</p>
      <div>
        <h1>ADD PROFILE PIC:</h1>
        <img src={user.profile_picture}></img>
      </div>
      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
