import React, { useEffect } from "react";
import styles from "./App.module.css";
import { Grid, Avatar } from "@material-ui/core";
import { makeStyles, MuiThemeProvider, Theme } from "@material-ui/core/styles";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import PolymerIcon from "@material-ui/icons/Polymer";
import { useSelector, useDispatch } from "react-redux";
import {
  selectLoginUser,
  selectProfiles,
  fetchAsyncGetMyProf,
  fetchAsyncGetProfs,
  fetchAsyncUpdateProf,
} from "./features/auth/authSlice";
import {
  fetchAsyncGetTheses,
  fetchAsyncGetUsers,
  fetchAsyncGetCategory,
  selectEditedThesis,
} from "./features/thesis/thesisSlice";
import ThesisList from "./features/thesis/ThesisList";
import ThesisDisplay from "./features/thesis/ThesisDisplay";
import ThesisForm from "./features/thesis/ThesisForm";

import { AppDispatch } from "./app/store";



const App = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedThesis = useSelector(selectEditedThesis);
  // const theses = useSelector(selectTheses);
  const loginUser = useSelector(selectLoginUser);
  const profiles = useSelector(selectProfiles);

  const logiinProfile = profiles.filter(
    
  )


  return <div className="App">App</div>;
};

export default App;
