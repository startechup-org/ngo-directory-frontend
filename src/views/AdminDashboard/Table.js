import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';


export default function Datat(props) {
  const { type, headers, data } = props;
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {type}
      </Typography>
      <span align="right"><AddIcon /></span>
      <Table size="small">
        <TableHead>
          <TableRow>
            {headers.map((header) => (
              <TableCell>{header}</TableCell>
            ))}
            {/* <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>City</TableCell>
            <TableCell>Country</TableCell> */}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {type === "Organizations" && (
            data.map((eachdata) => {
              return (
                <TableRow key={eachdata._id}>
                  <TableCell>{eachdata.org_name}</TableCell>
                  <TableCell>{eachdata.org_description}</TableCell>
                  <TableCell>{eachdata.org_city}</TableCell>
                  <TableCell>{eachdata.org_country}</TableCell>
                  <TableCell>
                    <CreateIcon />
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              )
           
            })           
          )}

          {type === "Users" && (
            data.map((eachdata) => {
              return (
                <TableRow key={eachdata._id}>
                  <TableCell>{eachdata.username}</TableCell>
                  <TableCell>{eachdata.name}</TableCell>
                  <TableCell>{eachdata.email}</TableCell>
                  <TableCell>{eachdata.language}</TableCell>
                  <TableCell>{eachdata.country}</TableCell>
                  <TableCell>
                    <CreateIcon />
                    <DeleteIcon />
                  </TableCell>
                </TableRow>
              )
            })           
          )}
        </TableBody>
      </Table>
      <br></br>
    </React.Fragment>
  );
}