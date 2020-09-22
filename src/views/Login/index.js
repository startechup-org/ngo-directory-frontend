import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

import { user_login } from "../../api/user.api";
import { auth } from "utils/auth";
import { useAuth } from "../../context/auth";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login() {
  const classes = useStyles();
  let history = useHistory();
//   const { login } = useAuth();

  /* States */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  /* API Methods */
  const login = async () => {
    try {
      const response = await user_login({
        email,
        password,
      });
      /*
        User Credentials
          {
            "email": "ccredo@startechup.com",
            "password": "P@ssword01"
          }
      */
	console.log(response);
	console.log("user_id: ", response.data.user._id);
	localStorage.setItem("ngodirectory_auth", JSON.stringify(response.data));
	localStorage.setItem("login_timestamp", new Date().getTime().toString());
	localStorage.setItem("user_id", response.data.user._id);
	auth.isLoggedIn = true;
	auth.isSuperAdmin = response.data?.user?.userType === "super_admin";

	history.push(auth.isSuperAdmin ? "/admin" : "/list");
    
    } catch (err) {
      console.log("err login: ", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    console.log("form: ", form);
    if (form.checkValidity() === false) {
      event.stopPropagation();
      return;
	} else {
		login()
	}

    // login({
    //   email,
    //   password,
    // })
    //   .then(() => {
    //     history.push("/list");
    //   })
    //   .catch((err) => console.log("err login", err));
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
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}