import React, { useState } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { TextField, InputLabel, MenuItem, FormControl, Select, Button, Fab, Modal } from "@material-ui/core";
import SaveIcon from "@material-ui/icons/Save";
import AddIcon from "@material-ui/icons/Add";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsyncCreateThesis,
  fetchAsyncUpdateThesis,
  fetchAsyncCreateCategory,
  // selectUsers,
  selectEditedThesis,
  selectCategory,
  editThesis,
  selectThesis,
} from "./thesisSlice";
import { AppDispatch } from "../../app/store";
import { initialState } from "./thesisSlice";

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    margin: theme.spacing(2),
    minWidth: 240,
  },
  button: {
    margin: theme.spacing(3),
  },
  addIcon: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(2),
  },
  saveModal: {
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(2),
  },
  paper: {
    position: "absolute",
    textAlign: "center",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const ThesisForm: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();

  // const users = useSelector(selectUsers);
  const category = useSelector(selectCategory);
  const editedThesis = useSelector(selectEditedThesis);

  //modalが閉じているか開いているか
  const [open, setOpen] = useState(false);
  const [modalStyle] = useState(getModalStyle);
  const [inputText, setInputText] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  //入力していないフォームがある場合は作成不可
  const isDisabled =
    editedThesis.title.length === 0 ||
    editedThesis.authors.length === 0 ||
    editedThesis.evaluation.length === 0
    ;
  //inputTextが空の時は無効
  const isCatDisabled = inputText.length === 0;

  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value: string | number = e.target.value;
    const name = e.target.name;
    if (name === "evaluation") {
      value = Number(value);
    }
    dispatch(editThesis({ ...editedThesis, [name]: value }));
  };

  // const isValidUrl = (editedThesis.url) => {
  //   try{
  //     new URL(editedThesis.url);
  //   } catch (e) {
  //     console.error(e);
  //     return false;
  //   }
  //   return true;
  // };



  const handleSelectEvaluationChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as string;
    dispatch(editThesis({ ...editedThesis, evaluation: value }));
  };
  const handleSelectCatChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const value = e.target.value as number;
    dispatch(editThesis({ ...editedThesis, category: value }));
  };
  // let userOptions = users.map((user) => (
  //   <MenuItem key={user.id} value={user.id}>
  //     {user.username}
  //   </MenuItem>
  // ));
  let catOptions = category.map((cat) => (
    <MenuItem key={cat.id} value={cat.id}>
      {cat.item}
    </MenuItem>
  ));

  return (
    <div>
      <h2>{editedThesis.id ? "Update Dissertation" : "New Dissertation"}</h2>
      <form>
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="Title"
          type="text"
          name="title"
          value={editedThesis.title}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="Authors"
          type="text"
          name="authors"
          value={editedThesis.authors}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="Year"
          type="text"
          name="year"
          value={editedThesis.year}
          onChange={handleInputChange}
        />
        <br />
        <FormControl className={classes.field}>
          <InputLabel>Evaluation</InputLabel>
          <Select name="evaluation" value={editedThesis.evaluation} onChange={handleSelectEvaluationChange}>
            <MenuItem value={1}>⭐️</MenuItem>
            <MenuItem value={2}>⭐️⭐️</MenuItem>
            <MenuItem value={3}>⭐️⭐️⭐️</MenuItem>
            <MenuItem value={4}>⭐️⭐️⭐️⭐️</MenuItem>
            <MenuItem value={5}>⭐️⭐️⭐️⭐️⭐️</MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="Url"
          type="text"
          name="url"
          value={editedThesis.url}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="Citation"
          type="text"
          name="citaiton"
          value={editedThesis.citaiton}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="Summary"
          type="text"
          name="summary"
          value={editedThesis.summary}
          onChange={handleInputChange}
        />
        <br />
        <TextField
          className={classes.field}
          InputLabelProps={{
            shrink: true,
          }}
          label="Comment"
          type="text"
          name="comment"
          value={editedThesis.comment}
          onChange={handleInputChange}
        />
        <br />

        <FormControl className={classes.field}>
          <InputLabel>Category</InputLabel>
          <Select name="category" value={editedThesis.category} onChange={handleSelectCatChange}>
            {catOptions}
          </Select>
        </FormControl>

        <Fab size="small" color="primary" onClick={handleOpen} className={classes.addIcon}>
          <AddIcon />
        </Fab>

        <Modal open={open} onClose={handleClose}>
          <div style={modalStyle} className={classes.paper}>
            <TextField
              className={classes.field}
              InputLabelProps={{
                shrink: true,
              }}
              label="New category"
              type="text"
              value={inputText}
              onChange={handleInputTextChange}
            />
            <Button
              variant="contained"
              color="primary"
              size="small"
              className={classes.saveModal}
              startIcon={<SaveIcon />}
              disabled={isCatDisabled}
              onClick={() => {
                dispatch(fetchAsyncCreateCategory(inputText));
                handleClose();
              }}
            >
              SAVE
            </Button>
          </div>
        </Modal>
        <br />
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<SaveIcon />}
          disabled={isDisabled}
          onClick={
            editedThesis.id !== 0
              ? () => dispatch(fetchAsyncUpdateThesis(editedThesis))
              : () => dispatch(fetchAsyncCreateThesis(editedThesis))
          }
        >
          {editedThesis.id !== 0 ? "Update" : "Save"}
        </Button>

        <Button
          variant="contained"
          color="default"
          size="small"
          onClick={() => {
            dispatch(editThesis(initialState.editedThesis));
            dispatch(selectThesis(initialState.selectedThesis));
          }}
        >
          Cancel
        </Button>
      </form>
    </div>
  );
};

export default ThesisForm;
