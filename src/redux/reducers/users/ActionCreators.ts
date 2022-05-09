import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUser } from "../../../models/IUser";

// Can be used as option,
// but there is need to handle repeated requests (service/API approach can handle those)
// for example, now users are loaded every time when component is mounted
// which is not good, because there is no caching
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get<IUser[]>(
        "https://jsonplaceholder.typicode.com/users?_limit=20"
      );
      return response.data;
    } catch (error) {
      return rejectWithValue("Could not fetch users...");
    }
  }
);

export const asyncUserActions = {
  fetchUsers,
};
