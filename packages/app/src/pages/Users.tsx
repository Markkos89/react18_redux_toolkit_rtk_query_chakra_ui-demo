import { FC, FormEvent, useState } from "react";
import { Helmet } from "react-helmet";
import { UserItem } from "../components/UserItem";
import { usersApi } from "../services/UsersService";
import { IUser } from "../models/IUser";
import {
  Heading,
  Input,
  Button,
  Spinner,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Grid,
  Container,
  Box,
} from "@chakra-ui/react";
export const Users: FC = () => {
  const [name, setName] = useState("");

  const {
    data: usersData,
    isLoading,
    error: usersError,
  } = usersApi.useFetchAllUsersQuery(100, {
    // pollingInterval: 10000, // every 10 seconds API will get new data
  });
  const [createUser] = usersApi.useCreateUserMutation();
  const [deleteUser] = usersApi.useDeleteUserMutation();
  const [updateUser] = usersApi.useUpdateUserMutation();

  const handleAddNewUser = async (event: FormEvent) => {
    event.preventDefault();

    await createUser({
      name,
    } as IUser);

    setName("");
  };

  const handleDeleteUser = (user: IUser) => {
    deleteUser(user);
  };
  const handleUpdateUser = (user: IUser) => {
    updateUser(user);
  };

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>

      <main>
        <Container maxW="container.xl">
          <Heading m={10}>Users page</Heading>
          <form onSubmit={handleAddNewUser}>
            <Box display={"flex"} m={10}>
              <Input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                marginRight={5}
              />
              <Button type="submit">Add User</Button>
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
          {usersError && (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>Failed to fetch users data.</AlertDescription>
            </Alert>
          )}
          <Grid templateColumns="repeat(auto-fit, minmax(200px, 1fr))" gap={6}>
            {usersData &&
              usersData.map((user) => (
                <UserItem
                  user={user}
                  key={user.id}
                  remove={handleDeleteUser}
                  update={handleUpdateUser}
                />
              ))}
          </Grid>
        </Container>
      </main>
    </>
  );
};
