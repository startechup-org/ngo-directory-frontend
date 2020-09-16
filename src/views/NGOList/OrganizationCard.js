import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import ViewOrganization from "./ViewOrganization"
import EditOrganization from "./EditOrganization"

const OrganizationCard = (card) => {
  const classes = useStyles();

  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [chosenOrg, setChosenOrg] = useState('')

  const handleClickOpen = (data) => {
    if (data.modalType === "view") {
      setOpenViewDialog(true);
      setChosenOrg(data.id)
    }
    
    if (data.modalType === "edit") {
      setOpenEditDialog(true);
    }
	};
  
  const handleClose = (modalType) => {
    if (modalType === "view") {
      setOpenViewDialog(false);
    }
    
    if (modalType === "edit") {
      setOpenEditDialog(false);
    }
	};

  return (
    <>
      <Grid item key={card} xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image="https://source.unsplash.com/random"
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {card.card.org_name}
            </Typography>
            <Typography>{card.card.org_description}</Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary" onClick={() => handleClickOpen({"modalType": "view", "id": card.card._id})}>
              View
            </Button>
            <Button size="small" color="primary" onClick={() => handleClickOpen({"modalType:": "edit" })}>
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
      {chosenOrg && <ViewOrganization open={openViewDialog} close={() => handleClose("view")} aria-labelledby="form-dialog-title" org_id={chosenOrg} />}
      <EditOrganization open={openEditDialog} close={() => handleClose("edit")} aria-labelledby="form-dialog-title"/>
    </>
   
  );
};

const useStyles = makeStyles((theme) => ({
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

export default OrganizationCard;