import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Alert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";

import { useAuth } from "context/auth";


export default function Login() {
  const classes = useStyles();
	const { login } = useAuth();

  /* States */
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errResponse, setErrResponse] = useState("")
	
	const handleSubmit = async (event) => {
		event.preventDefault();
		const form = event.currentTarget;
		console.log("form: ", form);
		if (form.checkValidity() === false) {
			event.stopPropagation();
			return;
    }
    
    login({
      email,
      password,
    }).catch((err) => { 
      console.log("err login", err);
      setErrResponse("Invalid Username/Password")
    }
    )};

		// login({
		// 	email,
		// 	password,
		// }).then((response) => {
		// 	auth.isLoggedIn = true;
		// 	auth.isSuperAdmin = response.data?.user?.userType === "super_admin";
		// 	history.push(auth.isSuperAdmin ? "/admin" : "/list");
		// })
		// .catch((err) => {
		// 	setErrResponse("Invalid Username/Password")
		// 	console.log("err login", err);
		// 	console.log("MESSAGE", err.message);
		// })
	
  // };

  return (
    <React.Fragment>
      <CssBaseline />
		{errResponse && <Alert severity="error">{errResponse}</Alert>}
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
  