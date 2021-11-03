import { Button, createTheme, Paper, TextField, ThemeProvider, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addClass } from '../actions/classAction';

const theme = createTheme();

const useStyles = makeStyles(theme => ({
  paper: {
    width: "80%",
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
}))

const Component = (props) => {
  const classes = useStyles();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const dispacth = useDispatch();

  const submitHandler = (e) => {
    e.preventDefault();
    dispacth(addClass(name, description));
  }

  const classAdd = useSelector(state => state.classAdd);
  const { addedClass } = classAdd;

  useEffect(() => {
    if (addedClass) {
      props.history.push("/")
    }
  }, [props, addedClass])

  return (
    <Paper className={classes.paper}>
      <Typography variant="h1" component="h5">Add a Class</Typography>
      <form className={classes.form} onSubmit={submitHandler}>
        <TextField
          variant="outlined"
          margin="normal"
          id="name"
          label="Name of class"
          fullWidth
          value={name}
          onChange={e => { setName(e.target.value) }}
          required
        />
        <TextField
          variant="outlined"
          margin="normal"
          id="description"
          label="Description"
          fullWidth
          value={description}
          onChange={e => { setDescription(e.target.value) }}
          required
          multiline
          rows={4}
        />
        <Button
          type="submit"
          variant="contained"
          className={classes.submit}
          fullWidth
        >
          Add class
        </Button>
      </form>
    </Paper>
  )
}

export default function AddClassForm(props) {

  return (
    <ThemeProvider theme={theme}>
      <Component history={props.history} />

    </ThemeProvider>
  )
}
