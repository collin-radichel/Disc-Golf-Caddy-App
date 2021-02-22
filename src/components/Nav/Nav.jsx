import LogOutButton from "../LogOutButton/LogOutButton";
import { makeStyles } from "@material-ui/core/styles";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
const useStyles = makeStyles((theme) => ({
  fullList: {
    width: "auto",
  },
  navIcon: {
    color: "white",
    display: "flex-end",
  },
  navContainer: {
    backgroundColor: theme.palette.primary.dark,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: "25px",
    marginLeft: "10px",
    fontFamily: "'Stick', sans-serif;",
  },
  homeLink: {
    textDecoration: "none",
  }
}));
function Nav() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const [state, setState] = useState(false);
  const user = useSelector((store) => store.user);
  const toggleDrawer = (open) => (e) => {
    if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
      return;
    }
    setState(!state);
  };
  let loginLinkData = {
    path: "/login",
    text: "Login / Register",
  };
  if (user.id != null) {
    loginLinkData.path = "/home";
    loginLinkData.text = "Home";
  }
  const logOut = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
  };

  const handleGoHome = () => {
    history.push("/");
  };

  const discSuggestion = () => {
    history.push("/discSuggestion");
  };

  const addDisc = () => {
    history.push("/addDisc");
  };

  const inventory = () => {
    history.push("/inventory");
  };

  return (
    <div className={classes.navContainer}>
      <Button onClick={handleGoHome}>
        <Typography className={classes.title}>Disc Golf Caddy</Typography>
      </Button>
      <Button className={classes.burgerBtn} onClick={toggleDrawer(true)}>
        <MenuIcon className={classes.navIcon} />
      </Button>
      <Drawer
        className={classes.fullList}
        anchor="top"
        open={state}
        onClose={toggleDrawer({ top: false })}
        onClick={toggleDrawer({ top: false })}
        onKeyDown={toggleDrawer({ top: false })}
      >
        <List>
          <Link className={classes.homeLink} to={loginLinkData.path}>
            <ListItem>
              <ListItemText className={classes.homeLink} primary={loginLinkData.text} />
            </ListItem>
            <Divider />
          </Link>

          <ListItem button onClick={inventory}>
            <ListItemText primary="Inventory" />
          </ListItem>
          <Divider />

          <ListItem button onClick={addDisc}>
            <ListItemText primary="Add Disc" />
          </ListItem>
          <Divider />

          <ListItem button onClick={discSuggestion}>
            <ListItemText primary="Get Disc Suggestion" />
          </ListItem>
          <Divider />
          <ListItem button onClick={logOut}>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
    </div>
  );
}

export default Nav;
