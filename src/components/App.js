import React, { useState } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import DifferenceTable from './DifferenceTable'
import Header from './Header';

export const App = () => {
  const [ tableType, setTableType ] = useState('User')

  return (
    <Container className="app" fixed>
      <Box data-testid="app-box" mt={10}>
        <Header data-testid="app-header" tableType={tableType} setTableType={setTableType}/>
        {tableType === 'User' && <DifferenceTable data-testid="app-table" tableType='User'/>}
        {tableType === 'Project' && <DifferenceTable data-testid="app-table" tableType='Project'/>}
      </Box>
    </Container>
  );
};

export default App;
