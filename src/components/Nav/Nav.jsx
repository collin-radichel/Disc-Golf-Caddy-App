import LogOutButton from '../LogOutButton/LogOutButton'
import { makeStyles } from '@material-ui/core/styles'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
const useStyles = makeStyles((theme) => ({
    fullList: {
        width: 'auto'
    },
    navIcon: {
        color: 'white',
    },
    navContainer: {
        backgroundColor: theme.palette.primary.dark
    }
}));
  function Nav() {
    const classes = useStyles()
    const dispatch = useDispatch()
    const history = useHistory()
    const [state, setState] = useState(false)
    const user = useSelector((store) => store.user);
    const toggleDrawer = (open) => (e) => {
        if (e.type === 'keydown' && (e.key === 'Tab' || e.key === 'Shift')) {
            return;
        }
        setState(!state)
    }
    let loginLinkData = {
      path: '/login',
      text: 'Login / Register',
    };
    if (user.id != null) {
      loginLinkData.path = '/home';
      loginLinkData.text = 'Home';
    }
    const logOut = () => {
        dispatch({ type: 'LOGOUT' })
        history.push('/')
    }
    return (
        <div className={classes.navContainer}>
            <Button onClick={toggleDrawer(true)}><MenuIcon className={classes.navIcon} /></Button>
            <Drawer className={classes.fullList} anchor="top" open={state} onClose={toggleDrawer({top: false})} onClick={toggleDrawer({top: false})} onKeyDown={toggleDrawer({top: false})}>
                <List>
                    <Link to={loginLinkData.path}>
                        <ListItem>
                            <ListItemText primary={loginLinkData.text} />
                        </ListItem>
                        <Divider />
                    </Link>
                    <Link to="/inventory">
                        <ListItem>
                            <ListItemText primary="Inventory" />
                        </ListItem>
                        <Divider />
                    </Link>
                    <Link to="/addDisc">
                        <ListItem button>
                            <ListItemText primary="Add Disc" />
                        </ListItem>
                        <Divider />
                    </Link>
                    <Link to="/discSuggestion">
                        <ListItem button>
                            <ListItemText primary="Get Disc Suggestion" />
                        </ListItem>
                        <Divider />
                    </Link>
                    <ListItem button onClick={logOut}>
                        <ListItemText primary="Log Out"  />
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default Nav;
