import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import MenuIcon from "@material-ui/icons/Menu";

import Table from "./Table";
import Modal from "./Modal";

import { allOrganizations } from "api/organization.api";
import { allUsers } from "api/user.api";

import { useAuth } from "context/auth";
import OrganizationForm from "./Forms/OrganizationForm";
import UserForm from "./Forms/UserForm";

import { editOrganizationById, addOrganization } from "api/organization.api";
import { user_signup, updateUser } from "api/user.api";

const organizationTableHeaders = ["Name", "Description", "City", "Country"];
const userTableHeaders = ["Username", "Name", "Email", "Language", "Country"];
const drawerWidth = 240;

const Form = (props) => {
  console.log("Form -> props", props);
  return props.activeRecord.type === "organization" ? (
    <OrganizationForm {...props} />
  ) : (
    <UserForm {...props} />
  );
};

export default function AdminDashboard() {
  const { auth, user } = useAuth();
  const classes = useStyles();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);

  const organizationsData = organizations.map((org) => {
    return [org.org_name, org.org_description, org.org_city, org.org_country];
  });
  const usersData = users.map((user) => {
    return [user.username, user.name, user.email, user.language, user.country];
  });

  // Load organizations
  useEffect(() => {
    //side effects in react
    const loadOrganizations = async () => {
      const response = await allOrganizations(auth.access_token); //how to async with
      console.log("response: ", response.data.data);
      setOrganizations(response.data.data);
    };

    const loadUsers = async () => {
      const response = await allUsers(auth.access_token); //how to async with
      console.log("response: ", response.data.data);
      setUsers(response.data.data);
    };
    loadOrganizations();
    loadUsers();
  }, [auth.access_token]);

  // Modal
  const [open, setOpen] = useState(false);
  const [activeRecord, setActiveRecord] = useState({
    type: "",
    action: "",
    data: {},
  });

  const handleCreateOrganization = () => {
    setOpen(true);
    setActiveRecord({
      type: "organization",
      action: "Create",
      data: {
        org_name: "",
        org_description: "",
        org_city: "",
        org_country: "",
        org_picture: "",
      },
    });
  };
  const handleEditOrganization = () => {};
  const handleDeleteOrganization = () => {};

  const handleCreateUser = () => {
    setOpen(true);
    setActiveRecord({
      type: "user",
      action: "Create",
      data: {},
    });
  };
  const handleEditUser = () => {};
  const handleDeleteUser = () => {};

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    if (
      activeRecord.type === "organization" &&
      activeRecord.action === "Create"
    ) {
      const newOrg = {
        admins: [user._id],
        ...activeRecord.data,
      };
      addOrganization(newOrg).then(() => {
        setOrganizations((prevOrganizations) => {
          return [...prevOrganizations, newOrg];
        });
      });
    }

    if (activeRecord.type === "user" && activeRecord.action === "Create") {
      const newUser = activeRecord.data;
      user_signup(newUser).then(() => {
        setUsers((prevUsers) => {
          return [...prevUsers, newUser];
        });
      });
    }

    setOpen(false);
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Admin Dashboard
            </Typography>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              align="right"
            >
              LOGOUT
            </Typography>
          </Toolbar>
        </AppBar>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Table
                    type={"Organizations"}
                    headers={organizationTableHeaders}
                    data={organizationsData}
                    actions={{
                      onAdd: handleCreateOrganization,
                      onEdit: handleEditOrganization,
                      onDelete: handleDeleteOrganization,
                    }}
                  />
                </Paper>
                <br />
                <br />
                <br />
                <Paper className={classes.paper}>
                  <Table
                    type={"Users"}
                    headers={userTableHeaders}
                    data={usersData}
                    actions={{
                      onAdd: handleCreateUser,
                      onEdit: handleEditUser,
                      onDelete: handleDeleteUser,
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </main>
      </div>
      <Modal
        open={open}
        setOpen={setOpen}
        activeRecord={activeRecord}
        handleSubmit={handleSubmit}
      >
        <Form activeRecord={activeRecord} setActiveRecord={setActiveRecord} />
      </Modal>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
}));