import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../../models/IUser";
import { fetchUsers } from "./ActionCreators";

interface UsersState {
  usersData: IUser[];
  loading: boolean;
  error: string | null;
}

const initialState: UsersState = {
  usersData: [],
  loading: false,
  error: null,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending.type]: (state) => {
      state.loading = true;
    },
    [fetchUsers.fulfilled.type]: (state, action: PayloadAction<IUser[]>) => {
      state.usersData = action.payload;
      state.loading = false;
    },
    [fetchUsers.rejected.type]: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const usersReducer = usersSlice.reducer;
export const usersActions = usersSlice.actions;
