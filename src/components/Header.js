import { AppBar, Toolbar, Typography, Button, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(() => ({
  header: {
    paddingRight: "5rem",
    paddingLeft: "5rem",
  },
  menuButton: {
    marginLeft: "0.5rem",
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
}));

const Header = ({ setTableType }) => {
  const { header, toolbar, menuButton } = useStyles()

  const changeTable = (tableType) => {
    setTableType(tableType)
  }

  const displayDesktop = () => {
    return (
    <Toolbar className={toolbar}>
      <Typography>Unity Frontend Assingment</Typography>
      <div>
        <Button className={menuButton} color="inherit" onClick={() => changeTable('Project')}>Projects</Button>
        <Button className={menuButton} color="inherit" onClick={() => changeTable('User')}>Users</Button>
      </div>
    </Toolbar>
    )
  };
  
  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
}

export default Header