import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { READ_THESIS, POST_THESIS, CATEGORY, THESIS_STATE, USER } from "../types";

export const fetchAsyncGetTheses = createAsyncThunk("thesis/getThesis", async () => {
  const res = await axios.get<READ_THESIS[]>(`${process.env.REACT_APP_API_URL}/api/theses/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncGetUsers = createAsyncThunk("thesis/getUsers", async () => {
  const res = await axios.get<USER[]>(`${process.env.REACT_APP_API_URL}/api/users/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncGetCategory = createAsyncThunk("thesis/getCategory", async () => {
  const res = await axios.get<CATEGORY[]>(`${process.env.REACT_APP_API_URL}/api/category/`, {
    headers: {
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncCreateCategory = createAsyncThunk("thesis/createCategory", async (item: string) => {
  const res = await axios.post<CATEGORY>(
    `${process.env.REACT_APP_API_URL}/api/category/`,
    { item: item },
    {
      headers: {
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    }
  );
  return res.data;
});

export const fetchAsyncCreateThesis = createAsyncThunk("thesis/createThesis", async (thesis: POST_THESIS) => {
  const res = await axios.post<READ_THESIS>(`${process.env.REACT_APP_API_URL}/api/theses/`, thesis, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return res.data;
});

export const fetchAsyncUpdateThesis = createAsyncThunk("thesis/updateThesis", async (thesis: POST_THESIS) => {
  const res = await axios.put<READ_THESIS>(
    `${process.env.REACT_APP_API_URL}/api/theses/${thesis.id}/`,
    thesis,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `JWT ${localStorage.localJWT}`,
      },
    }
  );
  return res.data;
});

export const fetchAsyncDeleteThesis = createAsyncThunk("thesis/deleteThesis ", async (id: number) => {
  await axios.delete(`${process.env.REACT_APP_API_URL}/api/theses/${id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `JWT ${localStorage.localJWT}`,
    },
  });
  return id;
});

export const initialState: THESIS_STATE = {
  theses: [
    {
      id: 0,
      title: "",
      authors: "",
      year: 2000,
      evaluation: "",
      evaluation_score: "",
      url: "...",
      introducer: 0,
      introducer_username: "",
      citaiton: "",
      summary: "",
      comment: "",
      category: 0,
      category_item: "",
      created_at: "",
      updated_at: "",
    },
  ],
  editedThesis: {
    id: 0,
    title: "",
    authors: "",
    year: 0,
    evaluation: "",
    url: "",
    citaiton: "",
    summary: "",
    comment: "",
    category: 0,
  },
  selectedThesis: {
    id: 0,
    title: "",
    authors: "",
    year: 0,
    evaluation: "",
    evaluation_score: "",
    url: "",
    introducer: 0,
    introducer_username: "",
    citaiton: "",
    summary: "",
    comment: "",
    category: 0,
    category_item: "",
    created_at: "",
    updated_at: "",
  },
  users: [
    {
      id: 0,
      username: "",
    },
  ],
  category: [
    {
      id: 0,
      item: "",
    },
  ],
};

export const thesisSlice = createSlice({
  name: "thesis",
  initialState,
  reducers: {
    editThesis(state, action: PayloadAction<POST_THESIS>) {
      state.editedThesis = action.payload;
    },
    selectThesis(state, action: PayloadAction<READ_THESIS>) {
      state.selectedThesis = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAsyncGetTheses.fulfilled, (state, action: PayloadAction<READ_THESIS[]>) => {
      return {
        ...state,
        theses: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetTheses.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(fetchAsyncGetUsers.fulfilled, (state, action: PayloadAction<USER[]>) => {
      return {
        ...state,
        users: action.payload,
      };
    });
    builder.addCase(fetchAsyncGetCategory.fulfilled, (state, action: PayloadAction<CATEGORY[]>) => {
      return {
        ...state,
        category: action.payload,
      };
    });
    builder.addCase(fetchAsyncCreateCategory.fulfilled, (state, action: PayloadAction<CATEGORY>) => {
      return {
        ...state,
        category: [...state.category, action.payload],
      };
    });
    builder.addCase(fetchAsyncCreateCategory.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(fetchAsyncCreateThesis.fulfilled, (state, action: PayloadAction<READ_THESIS>) => {
      return {
        ...state,
        theses: [action.payload, ...state.theses],
        editedThesis: initialState.editedThesis,
      };
    });
    builder.addCase(fetchAsyncCreateThesis.rejected, () => {
      window.location.href = "/Auth";
    });
    builder.addCase(fetchAsyncUpdateThesis.fulfilled, (state, action: PayloadAction<READ_THESIS>) => {
      return {
        ...state,
        theses: state.theses.map((t) => (t.id === action.payload.id ? action.payload : t)),
        editedThesis: initialState.editedThesis,
        selectedThesis: initialState.selectedThesis,
      };
    });
    builder.addCase(fetchAsyncUpdateThesis.rejected, () => {
      window.location.href = "/";
    });
    builder.addCase(fetchAsyncDeleteThesis.fulfilled, (state, action: PayloadAction<number>) => {
      return {
        ...state,
        theses: state.theses.filter((t) => t.id !== action.payload),
        editedThesis: initialState.editedThesis,
        selectedThesis: initialState.selectedThesis,
      };
    });
    builder.addCase(fetchAsyncDeleteThesis.rejected, () => {
      window.location.href = "/";
    });
  },
});

export const { editThesis, selectThesis } = thesisSlice.actions;
export const selectSelectedThesis = (state: RootState) => state.thesis.selectedThesis;
export const selectEditedThesis = (state: RootState) => state.thesis.editedThesis;
export const selectTheses = (state: RootState) => state.thesis.theses;
export const selectUsers = (state: RootState) => state.thesis.users;
export const selectCategory = (state: RootState) => state.thesis.category;
export default thesisSlice.reducer;
