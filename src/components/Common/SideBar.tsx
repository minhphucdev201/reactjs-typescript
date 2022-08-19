import CategoryIcon from '@mui/icons-material/Category';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import StarBorder from '@mui/icons-material/StarBorder';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {},
  link: {
    color: 'inherit',
    textDecoration: 'none',
    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));
export function SideBar() {
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();
  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <NavLink to="/admin/dashboard" className={classes.link}>
        <ListItemButton>
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="DashBoard" />
        </ListItemButton>
      </NavLink>
      <NavLink to="/admin/category" className={classes.link}>
        <ListItemButton>
          <ListItemIcon>
            <CategoryIcon />
          </ListItemIcon>
          <ListItemText primary="Category" />
        </ListItemButton>
      </NavLink>
      <NavLink to="/admin/products" className={classes.link}>
        <ListItemButton>
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>
          <ListItemText primary="Product" />
        </ListItemButton>
      </NavLink>
      <ListItemButton onClick={handleClick}>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Inbox" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <StarBorder />
            </ListItemIcon>
            <ListItemText primary="Starred" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}
