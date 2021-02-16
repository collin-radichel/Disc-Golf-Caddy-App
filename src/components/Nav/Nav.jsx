import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import {useSelector} from 'react-redux';
import Typography from "@material-ui/core/Typography"

function Nav() {
  const user = useSelector((store) => store.user);

  let loginLinkData = {
    path: '/login',
    text: 'Login / Register',
  };

  if (user.id != null) {
    loginLinkData.path = '/user';
    loginLinkData.text = 'Home';
  }

  return (
    <div className="nav">
      <Link to="/user">
        <h2 className="nav-title">DGC</h2>
      </Link>
      <div>
        <Link className="navLink" to={loginLinkData.path}>
        <Typography>{loginLinkData.text}</Typography>
        </Link>

        <Link className="navLink" to="/inventory">
          <Typography>Inventory</Typography>
        </Link>

        <Link className="navLink" to="/addDisc">
          <Typography>Add Disc</Typography>
        </Link>

        {user.id && (
          <>
            {/* <Link className="navLink" to="/info">
             <Typography>About</Typography>
            </Link> */}
            <LogOutButton className="navLink" />
          </>
        )}
      </div>
    </div>
  );
}

export default Nav;
