import React, { useState, useEffect }from 'react';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { managedOrganizationsByUser } from '../../api/user.api'
import { allOrganizations } from '../../api/organization.api'

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
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
}));

export default function Album() {
  const classes = useStyles();
  const user_id = localStorage.getItem('user_id')

  /* States */
  const [organizations, setOrganizations] = useState([]);
  const [managedOrganizations, setManagedOrganizations] = useState([]);

  // const loadOrganizations = async () => {
  //   const response = await allOrganizations();
  //   console.log('response: ', response.data.data)
  //   setOrganizations(response.data.data)
  // }

  // useEffect(loadOrganizations(), [])

  useEffect(() => {
    const  loadManagedOrgs = async () => {
      const response = await managedOrganizationsByUser(user_id);
      console.log('response: ', response.data.data)
      setManagedOrganizations(response.data.data)
    }
    loadManagedOrgs()
  }, [])

  useEffect(() => {
    const loadOrganizations = async () => {
      const response = await allOrganizations();
      console.log('response: ', response.data.data)
      setOrganizations(response.data.data)
    }
    loadOrganizations()
  }, [])

  return (
    <React.Fragment>
      <CssBaseline />
      <main>
        {/* Heading */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography variant="h3" align="center" color="textPrimary">
              NGO Directory
            </Typography>
          </Container>
        </div>
         {/* Managed Organizations */}
        {managedOrganizations.length > 0 && (
          <Container className={classes.cardGrid} maxWidth="md">
            <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
              Organizations you manage
            </Typography>
            <br></br>
            <Grid container spacing={4}>
              {managedOrganizations.map((card) => (
                <Grid item key={card} xs={12} sm={6} md={4}>
                  <Card className={classes.card}>
                    <CardMedia
                      className={classes.cardMedia}
                      image="https://source.unsplash.com/random"
                      title="Image title"
                    />
                    <CardContent className={classes.cardContent}>
                      <Typography gutterBottom variant="h5" component="h2">
                        {card.org_name}
                      </Typography>
                      <Typography>
                        {card.org_description}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small" color="primary">
                        View
                      </Button>
                      <Button size="small" color="primary">
                        Edit
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        )}
       

        {/* End Managed Organizations */}
        {/* Other Organizations */}
        <Container className={classes.cardGrid} maxWidth="md">
        <Typography variant="h5" align="left" color="textPrimary" gutterBottom>
          Other Organizations
        </Typography>
        <br></br>
        <Grid container spacing={4}>
          {organizations.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image="https://source.unsplash.com/random"
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.org_name}
                  </Typography>
                  <Typography>
                    {card.org_description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary">
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
      {/* End Other Organizations*/}
      </main>
    </React.Fragment>
  );
}