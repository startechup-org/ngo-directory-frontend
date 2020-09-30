import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlinedIcon from "@material-ui/icons/AddCircleOutlined";
import Container from "@material-ui/core/Container";
import OrganizationGrid from "./OrganizationGrid";

import OrganizationModal from "./OrganizationModal";

import { managedOrganizationsByUser,  updateUser} from "api/user.api";
import {
  allOrganizations,
  editOrganizationById,
  addOrganization,
} from "api/organization.api";
import { useAuth } from "../../context/auth";

export default function NGOList() {
  const classes = useStyles();
  const { user, setUser, auth } = useAuth();
  /* States */
  const [organizations, setOrganizations] = useState([]);
  const [managedOrganizations, setManagedOrganizations] = useState([]);

  const otherOrganizations = organizations.filter(
    (org) => !org?.admins?.includes(user._id)
  );
  console.log("otherOrganizations", otherOrganizations);

  // Active organization
  const [activeOrganization, setActiveOrganization] = useState(null);

  // Set current action either "Add", "View", "Edit"
  const [action, setAction] = useState(null);

  // Modal state and action
	const [open, setOpen] = useState(false);
	

  // Load organizations
  useEffect(() => {
	//side effects in react
    const loadOrganizations = async () => {
      const headers = {
        headers: { "Authorization": `Bearer ${auth.access_token}`}
      }
      const response = await allOrganizations(headers); //how to async with 
      console.log('response111: ', response.data.data)
        setOrganizations(response.data.data);
    };

    //useAuth for user_id
    const loadManagedOrgs = async () => {
      const response = await managedOrganizationsByUser(user._id);
      setManagedOrganizations(response.data.data);
    };

    loadOrganizations();
    loadManagedOrgs();

  }, [user._id, auth.access_token]);

  const newOrganization = (organization) => {
    try {
      const response = addOrganization(organization);
      console.log('log: ', response)
      return response
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const addUserAsOrgAdmin = (user_id, data) => {
    console.log("addUserAsOrgAdmin -> user_id, data", user_id, data);
    try {
      const response = updateUser(user_id, data);
      console.log("response edit: ", response.data);
      return response;
    } catch (error) {
      console.log("err: ", error);
    }
  };

  const editOrganization = async (organization) => {
    const {
      org_name,
      org_description,
      org_city,
      org_country,
      org_picture,
    } = organization;

    try {
      const response = await editOrganizationById(organization._id, {
        org_name,
        org_description,
        org_city,
        org_country,
        org_picture,
      });
      console.log("response edit: ", response.data);
    } catch (error) {
      console.log("err login: ", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
    }

    if (action === "Edit") {
      editOrganization(activeOrganization);
      const updatedOrganization = organizations.map((organization) => {
        if (organization._id === activeOrganization._id) {
          return activeOrganization;
        }

        return organization;
      });
      setOrganizations(updatedOrganization);
    }
    if (action === "Add") {
      const new_org = {
        "admins": [user._id],
        ...activeOrganization
      }
      const newOrg = await newOrganization(new_org);
      setManagedOrganizations([activeOrganization, ...managedOrganizations]);
      console.log("user: ", user);
      await addUserAsOrgAdmin(user._id, {
        organizations: [...user.organizations, newOrg.data.data._id],
      }).then(() => {
        setUser((user) => ({
          ...user,
          organizations: [...user.organizations, newOrg.data.data._id],
        }));
      });
    }

    setOpen(false);
  };

  const renderOrganizationsGrid = (organizations) => {
    return (
      <OrganizationGrid
        organizations={organizations}
        onOpen={setOpen}
        onSubmitEdit={handleSubmit}
        setAction={setAction}
        setActiveOrganization={setActiveOrganization}
      />
    );
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Heading */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h3" align="center" color="textPrimary">
              <span>NGO Directory</span>
              <IconButton
                aria-label="add"
                onClick={() => {
                  setOpen(true);
                  setActiveOrganization({
                    org_name: "",
                    org_description: "",
                    org_city: "",
                    org_country: "",
                    org_picture: "",
                  });
                  setAction("Add");
                }}
              >
                <AddCircleOutlinedIcon />
              </IconButton>
            </Typography>
          </Container>
        </div>

        {/* Managed Organizations */}
        {managedOrganizations.length > 0 && (
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography
              variant="h5"
              align="left"
              color="textPrimary"
              gutterBottom
            >
              Organizations you manage
            </Typography>
            <br></br>
            {renderOrganizationsGrid(managedOrganizations)}
          </Container>
        )}
        {/* End Managed Organizations */}
        {/* Other Organizations */}
        <Container className={classes.cardGrid} maxWidth="md">
          <Typography
            variant="h5"
            align="left"
            color="textPrimary"
            gutterBottom
          >
            Other Organizations
          </Typography>
          <br></br>
          {renderOrganizationsGrid(organizations)}
        </Container>
        {/* End Other Organizations*/}
      </main>
      <OrganizationModal
        open={open}
        setOpen={setOpen}
        action={action}
        activeOrganization={activeOrganization}
        setActiveOrganization={setActiveOrganization}
        handleSubmit={handleSubmit}
      />
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