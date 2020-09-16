import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const OrganizationCard = (props) => {
  const { organization, onOpen, setActiveOrganization, setAction } = props;
  const classes = useStyles();

  return (
    <>
      <Grid item xs={12} sm={6} md={4}>
        <Card className={classes.card}>
          <CardMedia
            className={classes.cardMedia}
            image={"https://source.unsplash.com/random"}
            title="Image title"
          />
          <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
              {organization.org_name}
            </Typography>
            <Typography>{organization.org_description}</Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              onClick={() => {
                onOpen(true);
                setActiveOrganization(organization);
                setAction("View");
              }}
            >
              View
            </Button>
            <Button
              size="small"
              color="primary"
              // onClick={() =>
              //   handleClickOpen({ modalType: "edit", id: organization._id })
              // }
              onClick={() => {
                onOpen(true);
                setActiveOrganization(organization);
                setAction("Edit");
              }}
            >
              {/* <Button size="small" color="primary" onClick={() => console.log("testing")}> */}
              Edit
            </Button>
          </CardActions>
        </Card>
      </Grid>
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