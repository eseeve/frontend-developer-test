import React from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import UserTable from './UserTable'

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" m={2}>
        <UserTable />
      </Box>
    </Container>
  );
};

export default App;
