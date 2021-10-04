import React, { useState, useEffect } from "react";
import styles from "./ThesisList.module.css";
import { makeStyles, Theme } from "@material-ui/core/styles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import DeleteOutlineOutlinedIcon from "@material-ui/icons/DeleteOutlineOutlined";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import {
  Button,
  Avatar,
  Table,
  TableHead,
  TableCell,
  TableRow,
  TableBody,
  TableSortLabel,
} from "@material-ui/core";

import { useSelector, useDispatch } from "react-redux";
import { fetchAsyncDeleteThesis, selectTheses, editThesis, selectThesis } from "./thesisSlice";
import { selectLoginUser, selectProfiles } from "../auth/authSlice";
import { AppDispatch } from "../../app/store";
import { initialState } from "./thesisSlice";
import { SORT_STATE, READ_THESIS } from "../types";

//table button smallの基本的なレイアウト指定
const useStyles = makeStyles((theme: Theme) => ({
  table: {
    tableLayout: "fixed",
  },
  button: {
    margin: theme.spacing(3),
  },
  small: {
    margin: "auto",
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const ThesisList: React.FC = () => {
  const classes = useStyles();
  const dispatch: AppDispatch = useDispatch();
  //一覧情報取得
  const theses = useSelector(selectTheses);
  const loginUser = useSelector(selectLoginUser);
  const profiles = useSelector(selectProfiles);
  //thesesのkeyを取得
  const columns = theses[0] && Object.keys(theses[0]);
  //ソート機能の初期値
  const [state, setState] = useState<SORT_STATE>({
    rows: theses, //rowsのthesesはSliceで定義した初期値
    order: "desc",
    activeKey: "",
  });

  //クリック時にcolumnをソート
  //handleClickSortColumnを定義しsortingの対象になっているラベルの名前READ_THESISを引数として受け取る
  //Readthesisのkeyのどれかが返ってくる
  //isDescはcolumnがactiveKeyと一致するかどうかその場合descとなる
  //newOrderを定義しisDescがTrueの場合”asc”に切り替わる
  //sortedRowsでArray.from(state.rows)行で配列を作成し引数をa,bとしたアロー関数を作成
  //a[column]がb[column]より大きい場合returnで1が返ってきた時
  const handleClickSortColumn = (column: keyof READ_THESIS) => {
    const isDesc = column === state.activeKey && state.order === "desc";
    const newOrder = isDesc ? "asc" : "desc";
    const sortedRows = Array.from(state.rows).sort((a, b) => {
      if (a[column] > b[column]) {
        return newOrder === "asc" ? 1 : -1;
      } else if (a[column] < b[column]) {
        return newOrder === "asc" ? -1 : 1;
      } else {
        return 0;
      }
    });

    setState({
      rows: sortedRows,
      order: newOrder,
      activeKey: column,
    });
  };
  //ローカルの内容を更新
  useEffect(() => {
    setState((state) => ({
      ...state,
      rows: theses,
    }));
  }, [theses]);

  //Avatar画像をidごとに表示
  const conditionalSrc = (user: number) => {
    const loginProfile = profiles.filter((prof) => prof.user_profile === user)[0];
    return loginProfile?.img !== null ? loginProfile?.img : undefined;
  };

  return (
    <>
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        size="small"
        startIcon={<AddCircleOutlineIcon />}
        onClick = {() => {dispatch(editThesis({
          id:0,
          title: "論文1",
          authors: "kando",
          year: 2000,
          evaluation: "3",
          introducer: 0,
          url: "...",
          citaiton: "...",
          summary: "...",
          comment: "...",
          category: 1,
        }));
        dispatch(selectThesis(initialState.selectedThesis));
      }}
      >
        Add new
      </Button>
      {/* thesesの最初の要素に文字列が入っている場合のみ表示 */}
      {theses[0]?.title && (
        <Table size="small" className={classes.table}>
          <TableHead>
            <TableRow>
              {/* columnsを表示 */}
              {/* columnsで{}にcolumnとindexをmapで格納 */}
              {columns.map(
                (column, colIndex) =>
                  (column === "title" ||
                    column === "authors" ||
                    column === "year" ||
                    column === "evaluation" ||
                    column === "url" ||
                    // column === "introducer" ||
                    column === "citaiton" ||
                    column === "summary" ||
                    column === "comment" ||
                    column === "category") && (
                    <TableCell align="center" key={colIndex}>
                      <TableSortLabel
                        active={state.activeKey === column}
                        direction={state.order}
                        onClick={() => handleClickSortColumn(column)}
                      >
                        <strong>{column}</strong>
                      </TableSortLabel>
                    </TableCell>
                  )
              )}
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {state.rows.map((row, rowIndex) => (
              <TableRow hover key={rowIndex}>
                {/* 展開されたkeyの一覧をrowに格納 */}
                {Object.keys(row).map(
                  (key, colIndex) =>
                    (key === "title" ||
                      key === "authors" ||
                      key === "year" ||
                      key === "evaluation_score" ||
                      key === "url" ||
                      // key === "introducer_username" ||
                      key === "citaiton" ||
                      key === "summary" ||
                      key === "comment" ||
                      key === "category_item") && (
                      <TableCell
                        align="center"
                        className={styles.thesislist__hover}
                        key={`${rowIndex}+${colIndex}`}
                        onClick={() => {
                          dispatch(selectThesis(row));
                          dispatch(editThesis(initialState.editedThesis));
                        }}
                      >
                        <span>{row[key]}</span>
                      </TableCell>
                    )
                )}

                <TableCell>
                  <Avatar
                    className={classes.small}
                    alt="introducer"
                    src={conditionalSrc(row["introducer"])}
                  />
                </TableCell>

                <TableCell align="center">
                  <button
                    className={styles.thesislist__icon}
                    onClick={() => {
                      dispatch(fetchAsyncDeleteThesis(row.id));
                    }}
                    disabled={row["introducer"] !== loginUser.id}
                  >
                    <DeleteOutlineOutlinedIcon />
                  </button>
                  <button
                    className={styles.thesislist__icon}
                    onClick={() => dispatch(editThesis(row))}
                    disabled={row["introducer"] !== loginUser.id}
                  >
                    <EditOutlinedIcon />
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
export default ThesisList;
