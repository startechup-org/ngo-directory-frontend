import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';

import { useAuth } from "context/auth";

export default function SignUp() {
  const classes = useStyles();
  const { signup } = useAuth();

  /* States */
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [language, setLanguage] = useState('')
  const [country, setCountry] = useState('')
  const [ngoAdmin, setNgoAdmin] = useState('user')

/* API Method */
  // const signup = async () => {
  //   try {
  //     const response = await user_signup({
  //       username,
  //       name,
  //       email,
  //       password,
  //       language,
  //       country,
  //       ngoAdmin
  //     });
  //     console.log(response)
  //   } catch (err) {
  //     console.log('err login: ', err)
  //   }
  // }

  const handleSubmit = async (event) => {
    console.log('test: ', event.currentTarget)
    event.preventDefault();
    const form = event.currentTarget;
    console.log('form: ', form)
    if (form.checkValidity() === false) {
        event.stopPropagation();
      return;
    }
    signup({
        username,
        name,
        email,
        password,
        language,
        country,
        ngoAdmin
    }).catch((err) => {
      console.log("err login", err);
    })
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="xs" component="main">
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                      autoComplete="uname"
                      name="username"
                      variant="outlined"
                      required
                      fullWidth
                      id="usename"
                      label="Username"
                      autoFocus
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="fullname"
                      label="Full Name"
                      name="fullName"
                      autoComplete="fname"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                  />
              </Grid>
              <Grid item xs={12} sm={6}>
                  <TextField
                      autoComplete="lang"
                      name="language"
                      variant="outlined"
                      required
                      fullWidth
                      id="language"
                      label="Language"
                      autoFocus
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="country"
                      label="Country"
                      name="country"
                      autoComplete="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControlLabel
                  control={<Checkbox value={ngoAdmin} onChange={() => setNgoAdmin('ngo_admin')} color="primary" />}
                      label="I am an NGO Admin"
                  />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="#" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
      </Container>
    </React.Fragment>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
