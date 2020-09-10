import React from "react";
import OrganizationCard from "./OrganizationCard";
import Grid from "@material-ui/core/Grid";

const OrganizationGrid = ({ organizations }) => {
  return (
    <Grid container spacing={4}>
      {organizations.map((card) => (
        <OrganizationCard key={card._id} card={card} />
      ))}
    </Grid>
  );
};

export default OrganizationGrid;