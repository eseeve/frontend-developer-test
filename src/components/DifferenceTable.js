import React, { useState } from 'react';
import moment from 'moment';

import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';

import api from '../lib/api';
import './DifferenceTable.css'
import usePersistedState from './usePersistedState';

const parseData = (data) => {
  const parsedData = data.map(item => ({
    id: item.id,
    timestamp: moment(item.timestamp).format('YYYY-DD-MM'),
    oldValue: item.diff[0].oldValue,
    newValue: item.diff[0].newValue
  }))
  return parsedData
}

const descendingComparator = (a, b) => {
  if (a.timestamp < b.timestamp) return -1;
  else if (a.timestamp > b.timestamp) return 1;
  else return 0;
}

const getComparator = (order) => {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b)
    : (a, b) => -descendingComparator(a, b)
}

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}


const Row = ({user}) => {
  return (
    <TableRow>
      <TableCell>{user.timestamp}</TableCell>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.oldValue}</TableCell>
      <TableCell>{user.newValue}</TableCell>
    </TableRow>
  )
}

const DifferenceTable = ({ tableType }) => {
  const [ rows, setRows ] = usePersistedState(tableType, [])
  const [ loading, setLoading ] = useState(false)
  const [ error, setError ] = useState(null)
  const [ order, setOrder] = useState('asc')

  const handleRequestSort = (event) => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const fetchData = async () => {
    setLoading(true)
    try {
      let result
      if (tableType === 'User') {
        result = await api.getUsersDiff();
      } else if (tableType === 'Project') {
        result = await api.getProjectsDiff();
      }
      setError(null)
      const newRows = [ ...rows, ...parseData(result.data)]
      setRows(newRows.sort(getComparator(order)))
    } catch (error) {
      setError('We had problems fetching your data. Please try again.')
    }
    setLoading(false)
  };

  const buttonName = () => {
    if (rows.length === 0) {
      return 'Fetch data'
    } else if (error) {
      return 'Retry'
    } else {
      return 'Load more'
    }
  }

  return (
    <Container mt={2}>
      <TableContainer component={Paper}>
        <Table className="user-table" aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                Date
                <TableSortLabel direction={order} onClick={handleRequestSort}></TableSortLabel>
              </TableCell>
              <TableCell>{tableType} ID</TableCell>
              <TableCell>Old value</TableCell>
              <TableCell>New value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.length > 0 &&
             stableSort(rows, getComparator(order)).map((user) => (
              <Row key={user.id} user={user}/>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div className="item-container">
        <Typography color="error">{error}</Typography>
      </div>
      <div className="item-container">
        {loading ?
        <CircularProgress />
        :
        <Button variant="contained" color="primary" onClick={fetchData}>
          {buttonName()}
        </Button> 
        }
      </div>
    </Container>
  )
}

export default DifferenceTable