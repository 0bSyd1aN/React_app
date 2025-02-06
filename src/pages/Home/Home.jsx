import React from 'react';
import { Grid,  GridItem } from "@chakra-ui/react";
import { Counter, UserForm, RichTextEditor, UserDataDisplay } from '../../components';
import './Home.css';
import { UserDataProvider } from '../../context/UserDataContext';

function Home() {
  return (
    <Grid templateColumns="repeat(2, 1fr)" gap={4} h="100vh" p={4}>
      <GridItem>
        <Counter />
      </GridItem>
      <GridItem>
        <RichTextEditor />
      </GridItem>
      <UserDataProvider>
        <GridItem>
          <UserDataDisplay />
        </GridItem>
        <GridItem>
          <UserForm />
        </GridItem>
      </UserDataProvider>
    </Grid>
  );
}

export default Home;