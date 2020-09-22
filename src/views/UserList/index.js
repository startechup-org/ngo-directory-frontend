import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";


import {
  allOrganizations,
  
} from "api/organization.api";

export default function NGOList() {
  const classes = useStyles();
  
  
  /* States */
  const [organizations, setOrganizations] = useState([]);

  // Load organizations
  useEffect(() => {
	//side effects in react
    const loadOrganizations = async () => {
	const response = await allOrganizations(); //how to async with 
	console.log('response: ', response.data.data)
      setOrganizations(response.data.data);
    };
    loadOrganizations();
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
      </main>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));