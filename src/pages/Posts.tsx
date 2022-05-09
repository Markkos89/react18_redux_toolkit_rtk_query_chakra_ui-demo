import { FC, FormEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { postsApi } from "../services/PostsService";
import { PostItem } from "../components/PostItem";
import { IPost } from "../models/IPost";
import {
  Heading,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Container,
  Box,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";

export const Posts: FC = () => {
  const {
    data: postsData,
    isLoading,
    error,
  } = postsApi.useFetchAllPostsQuery(10);
  const [createPost] = postsApi.useCreatePostMutation();
  const [deletePost] = postsApi.useDeletePostMutation();
  const [updatePost] = postsApi.useUpdatePostMutation();

  const [title, setTitle] = useState("");

  const handleAddNewPost = async (event: FormEvent) => {
    event.preventDefault();
    if (title)
      await createPost({
        title,
        body: "",
      } as IPost);

    setTitle("");
  };

  const handleDeletePost = (post: IPost) => {
    deletePost(post);
  };
  const handleUpdatePost = (post: IPost) => {
    updatePost(post);
  };

  return (
    <>
      <Helmet>
        <title>Posts</title>
      </Helmet>

      <main>
        <Container maxW="container.xl">
          <Heading m={10}>Posts page</Heading>

          <form className={"new-post-form"} onSubmit={handleAddNewPost}>
            <Box display={"flex"} m={10}>
              <Input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                marginRight={5}
              />
              <Button type="submit" bg="teal.500">
                Add Post
              </Button>
            </Box>
          </form>
          {isLoading && (
            <Box w={"100%"} textAlign={"center"}>
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="blue.500"
                size="xl"
              />
            </Box>
          )}
          {error && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>Failed to fetch posts data.</AlertDescription>
            </Alert>
          )}
          {postsData && (
            <TableContainer borderRadius={10}>
              <Table variant="striped" bg="teal.500">
                <TableCaption> @ 2022 Copyright</TableCaption>
                <Thead>
                  <Tr>
                    <Th>#</Th>
                    <Th>Title</Th>
                    <Th colSpan={2} textAlign="center">
                      Options
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {postsData.map((post) => (
                    <PostItem
                      post={post}
                      key={post.id}
                      remove={handleDeletePost}
                      update={handleUpdatePost}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          )}
        </Container>
      </main>
    </>
  );
};
