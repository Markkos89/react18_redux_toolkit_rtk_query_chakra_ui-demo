import { FC } from 'react';
import { Helmet } from 'react-helmet';
import { Container, Heading } from '@chakra-ui/react';

export const Home: FC = () => {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>

      <main>
        <Container maxW="container.xl">
          <Heading m={10}>
            React 18 + Redux-Toolkit + RKT Query + Chakra UI + React router 6
            DEMO
          </Heading>
        </Container>
      </main>
    </>
  );
};
