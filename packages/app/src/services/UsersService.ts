import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IUser } from "../models/IUser";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    // Get allUsers data with pagination
    fetchAllUsers: build.query<IUser[], number>({
      query: (limit: number = 5) => ({
        url: "/users",
        method: "GET",
        params: {
          _limit: limit,
        },
      }),
      providesTags: (result) => ["Users"],
    }),

    // create a new post
    createUser: build.mutation<IUser, IUser>({
      query: (user: IUser) => ({
        url: "/users",
        method: "POST",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    // update a post
    updateUser: build.mutation<IUser, IUser>({
      query: (user: IUser) => ({
        url: `/users/${user.id}`,
        method: "PUT",
        body: user,
      }),
      invalidatesTags: ["Users"],
    }),

    // delete a post
    deleteUser: build.mutation<IUser, IUser>({
      query: (user: IUser) => ({
        url: `/users/${user.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});
