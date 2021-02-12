import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import UserTable from './UserTable'
import Header from './Header';

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" mt={10}>
        <Header/>
        <UserTable />
      </Box>
    </Container>
  );
};

export default App;
