import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IPost } from "../models/IPost";

export const postsApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["Posts"],
  endpoints: (build) => ({
    // fetch all posts from the server
    fetchAllPosts: build.query<IPost[], number>({
      query: (limit: number = 5) => ({
        url: "/posts",
        method: "GET",
        params: {
          _limit: limit,
        },
      }),
      providesTags: ["Posts"],
    }),

    // create a new post
    createPost: build.mutation<IPost, IPost>({
      query: (post: IPost) => ({
        url: "/posts",
        method: "POST",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),

    // update a post
    updatePost: build.mutation<IPost, IPost>({
      query: (post: IPost) => ({
        url: `/posts/${post.id}`,
        method: "PUT",
        body: post,
      }),
      invalidatesTags: ["Posts"],
    }),

    // delete a post
    deletePost: build.mutation<IPost, IPost>({
      query: (post: IPost) => ({
        url: `/posts/${post.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Posts"],
    }),
  }),
});
