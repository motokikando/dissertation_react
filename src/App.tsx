import React, { useEffect } from "react";
import styles from "./App.module.css";
import { Grid, Avatar } from "@material-ui/core";
import { makeStyles, MuiThemeProvider, Theme, createTheme } from "@material-ui/core/styles";
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

const theme = createTheme({
  palette: {
    secondary: {
      main: "#3cb371",
    },
  },
});

const useStyles = makeStyles((theme: Theme) => ({
  icon: {
    marginTop: theme.spacing(3),
    cursor: "none",
  },
  avatar: {
    marginLeft: theme.spacing(1),
  },
}));

const App: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  const editedThesis = useSelector(selectEditedThesis);
  // const theses = useSelector(selectTheses);
  const loginUser = useSelector(selectLoginUser);
  const profiles = useSelector(selectProfiles);
  //ログインユーザーに対応するプロフィールのオブジェクトをfilterを使って取得
  const loginProfile = profiles.filter((prof) => prof.user_profile === loginUser.id)[0];

  //ログアウト JWTのトークンを削除する関数
  const Logout = () => {
    localStorage.removeItem("localJWT");
    //ログイン画面に遷移
    window.location.href = "/Auth";
  };

  //imageInputをクリックすることでファイルダイアログを開く
  const handlerEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput?.click();
  };

  useEffect(() => {
    //Appcomponentからレンダリングされた時にAPIからまとめて呼び出す
    const fetchBootLoader = async () => {
      await dispatch(fetchAsyncGetTheses());
      await dispatch(fetchAsyncGetMyProf());
      await dispatch(fetchAsyncGetUsers());
      await dispatch(fetchAsyncGetCategory());
      await dispatch(fetchAsyncGetProfs());
    };
    fetchBootLoader();
  }, [dispatch]);

  return (
    <MuiThemeProvider theme={theme}>
      <div className={styles.app__root}>
        <Grid container>
          <Grid item xs={4}>
            <PolymerIcon className={classes.icon}></PolymerIcon>
          </Grid>
          <Grid item xs={4}>
            <h1>Dissertation List Board</h1>
          </Grid>
          <Grid item xs={4}>
            <div className="styles app__logout">
              <button className="styles app__iconLogout" onClick={Logout}>
                <ExitToAppIcon fontSize="large" />
              </button>
              <input
                type="file"
                id="imageInput"
                hidden={true}
                onChange={(e) => {
                  dispatch(
                    fetchAsyncUpdateProf({
                      id: loginProfile.id,
                      img: e.target.files !== null ? e.target.files[0] : null,
                    })
                  );
                }}
              />
              <button className={styles.app__btn} onClick={handlerEditPicture}>
                <Avatar
                  className={classes.avatar}
                  alt="avatar"
                  src={loginProfile?.img !== null ? loginProfile?.img : undefined}
                />
              </button>
            </div>
          </Grid>
          <Grid item >
            <ThesisList />
          </Grid>
          <Grid item xs={4}>
            <Grid
              container
              direction="column"
              alignItems="center"
              justify="center"
              style={{ minHeight: "80vh" }}
            >
              <Grid item>{editedThesis.category ? <ThesisForm /> : <ThesisDisplay />}</Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </MuiThemeProvider>
  );
};

export default App;
