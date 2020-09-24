import React, { useState, useEffect } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import {
  allOrganizations,
} from "api/organization.api";

import {
  allUsers,
} from "api/user.api";

export default function Orders() {
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);

    // Load organizations
  useEffect(() => {
    //side effects in react
    const loadOrganizations = async () => {
      const response = await allOrganizations(); //how to async with 
      console.log('response: ', response.data.data)
      setOrganizations(response.data.data);
    };
    
    const loadUsers = async () => {
      const response = await allUsers(); //how to async with 
      console.log('response: ', response.data.data)
      setUsers(response.data.data);
    };
      loadOrganizations();
      loadUsers();
    }, []);

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Organizations
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {organizations.map((org) => (
            <TableRow key={org._id}>
              <TableCell>{org.org_name}</TableCell>
              <TableCell>{org.org_description}</TableCell>
              <TableCell>{org.org_city}</TableCell>
              <TableCell>{org.org_country}</TableCell>
              <TableCell>
                <AddIcon />
                <CreateIcon />
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <br>
      </br>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Users
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Country</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.language}</TableCell>
              <TableCell>{user.country}</TableCell>
              <TableCell>
                <AddIcon />
                <CreateIcon />
                <DeleteIcon />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}