import { AppBar, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import './Header.css'

const Header = () => {
  const displayDesktop = () => {
    return (
    <Toolbar>
      <Typography>Unity Frontend Assingment</Typography>
    </Toolbar>
    )
  };
  
  return (
    <header>
      <AppBar>{displayDesktop()}</AppBar>
    </header>
  );
}

export default Header