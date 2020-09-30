import React from "react";
import { Table as MUITable } from "@material-ui/core";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

export default function Table(props) {
  const { label, type, headers, data, actions } = props;

  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        {label}
      </Typography>
      <span align="right">
        <AddIcon onClick={() => actions.onAdd()} />
      </span>
      <MUITable size="small">
        <TableHead>
          <TableRow>
            {headers
              .filter((header) => header && !header.hide)
              .map((header) => (
                <TableCell key={header.key}>{header.label}</TableCell>
              ))}
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((eachdata) => (
            <TableRow key={eachdata._id}>
              {headers
                .filter((header) => header && !header.hide)
                .map((header) => (
                  <TableCell key={`${eachdata._id}-${eachdata[header.key]}`}>{eachdata[header.key]}</TableCell>
                ))}
              {/* {eachdata.map((val) => (
                <TableCell>{val}</TableCell>
              ))} */}
              <TableCell>
                <EditIcon
                  onClick={() => actions.onEdit({ type, eachdata, headers })}
                />
                <DeleteIcon
                  onClick={() => actions.onDelete({ type, eachdata, headers })} 
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MUITable>
    </React.Fragment>
  );
}