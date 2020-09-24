import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import {
  allUsers,
} from "api/user.api";

export default function UserList() {
  const classes = useStyles();
  
/* States */
  
  const [users, setUsers] = useState([]);

  // Load users
  useEffect(() => {
	//side effects in react
    const loadUsers = async () => {
      const response = await allUsers(); //how to async with 
      console.log('response: ', response.data.data)
      setUsers(response.data.data);
    };
    loadUsers();
  }, []);

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Heading */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h3" align="center" color="textPrimary">
              <span>All Users</span>
            </Typography>
           
          </Container>

        </div>
        <TableContainer component={Paper} align="center">
              <Table className={classes.table} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell>Username</StyledTableCell>
                    <StyledTableCell align="right">Name</StyledTableCell>
                    <StyledTableCell align="right">Email</StyledTableCell>
                    <StyledTableCell align="right">Language</StyledTableCell>
                    <StyledTableCell align="right">Country</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <StyledTableRow key={user.username}>
                      <StyledTableCell component="th" scope="row">
                        {user.username}
                      </StyledTableCell>
                      <StyledTableCell align="right">{user.name}</StyledTableCell>
                      <StyledTableCell align="right">{user.email}</StyledTableCell>
                      <StyledTableCell align="right">{user.language}</StyledTableCell>
                      <StyledTableCell align="right">{user.country}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
          </TableContainer>
      </main>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  table: {
    maxWidth: 1500,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


