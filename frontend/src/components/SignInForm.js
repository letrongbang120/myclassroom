import { Button, createTheme, FormControl, Grid, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signin } from '../actions/userActions'

const theme = createTheme();

const useStyles = makeStyles((theme) => ({
  paper: {
    width: 450,
    padding: theme.spacing(10),
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  },
  link: {
    textDecoration: "none"
  }
}))

const Component = (props) => {
  const classes = useStyles();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispacth = useDispatch();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  useEffect(() => {
    if (userInfo) {
      props.history.push(props.redirect);
    }
  }, [userInfo, props]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispacth(signin(email, password));
  }
  return (
    <Paper className={classes.paper}>
      <Typography variant="h1" component="h5">Sign in</Typography>
      <form className={classes.form} onSubmit={submitHandler}>

        <TextField
          variant="outlined"
          margin="normal"
          id="email"
          label="Email address"
          fullWidth
          value={email}
          onChange={e => { setEmail(e.target.value) }}
          required
        />
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            value={password}
            type={showPassword ? 'text' : 'password'}
            onChange={e => { setPassword(e.target.value) }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => { setShowPassword(!showPassword) }}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            required
          />
        </FormControl>
        <Button
          type="submit"
          className={classes.submit}
          fullWidth
          variant="contained"
        >Sign in</Button>
        <Grid container>
          <Grid item xs>
            <Link className={classes.link} href="#" variant="body2">Forgot password</Link>
          </Grid>
          <Grid item xs>
            <Link className={classes.link} href="/signup" variant="body2">Don't have an account? Sign up</Link>
          </Grid>
        </Grid>
      </form>
    </Paper>

  )
}

export default function SignInForm(props) {
  const redirect = props.location.search ? props.location.search.split('=')[1] : "/";

  return (
    <ThemeProvider theme={theme}>

      <Component history={props.history} redirect={redirect} />

    </ThemeProvider>
  )
}
