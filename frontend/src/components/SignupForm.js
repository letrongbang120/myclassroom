import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, createTheme, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, Radio, RadioGroup, TextField, ThemeProvider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { signin } from '../actions/userActions';

const theme = createTheme();

const useStyles = makeStyles(theme => ({
  paper: {
    width: 550,
    padding: theme.spacing(10),
    marginTop: theme.spacing(1),
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
}))

const Component = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newUser, setNewUser] = useState();

  const dispatch = useDispatch();
  useEffect(() => {
    if (newUser) {
      props.history.push("/");
    }
  }, [newUser, props])
  const submitHandler = (e) => {
    e.preventDefault();
    const func = async () => {
      try {
        const { data } = await axios.post("/api/users/register", {
          name,
          email,
          password,
          isTeacher: role === "teacher" ? true : false
        });
        setNewUser(data);
        dispatch(signin(email, password))
      } catch (error) {
        console.log(error.message);
      }
    }
    if (password === confirmPassword) {
      func();
    } else {
      alert("Password and confirm password are not match")
    }

  }
  return (
    <Paper className={classes.paper}>
      <Typography variant="h1" component="h5">Sign up</Typography>
      <form className={classes.form} onSubmit={submitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          id="name"
          label="Email address"
          fullWidth
          value={name}
          onChange={e => { setName(e.target.value) }}
          required
        />
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
        <FormControl margin="normal" fullWidth>
          <InputLabel htmlFor="confirmPassword">Confirm password</InputLabel>
          <OutlinedInput
            id="confirmPassword"
            value={confirmPassword}
            type={showConfirmPassword ? 'text' : 'password'}
            onChange={e => { setConfirmPassword(e.target.value) }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  onClick={() => { setShowConfirmPassword(!showConfirmPassword) }}
                  edge="end"
                >
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm password"
            required
          />
        </FormControl>
        <FormControl component="fieldset">
          <FormLabel component="legend">You are: </FormLabel>
          <RadioGroup
            aria-label="role"
            defaultValue="student"
            onChange={(e) => { setRole(e.target.value) }}
          >
            <FormControlLabel value="student" control={<Radio />} label="Student" />
            <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
          </RadioGroup>
        </FormControl>
        <Button
          type="submit"
          className={classes.submit}
          fullWidth
          variant="contained"
        >Sign up</Button>
      </form>
    </Paper>
  )
}

export default function SignupForm(props) {
  return (
    <ThemeProvider theme={theme}>
      <Component history={props.history} />
    </ThemeProvider>
  )
}
