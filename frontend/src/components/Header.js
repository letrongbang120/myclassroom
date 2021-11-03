import { AppBar, Toolbar, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { Link } from 'react-router-dom'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { USER_SIGNOUT } from '../constants/userConstant';

const useStyles = makeStyles({
  typographyStyles: {
    flex: 1
  },
  link: {
    marginLeft: 15
  }
});

export default function Header() {
  const classes = useStyles();
  const userSignin = useSelector(state => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();

  const signout = () => {
    dispatch({ type: USER_SIGNOUT })
    localStorage.removeItem("userSigninMyClassroom");
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Link to="/" className={classes.typographyStyles}>
          <Typography

            variant="h4"
            component="div"
          >
            MyClassroom
          </Typography>
        </Link>


        {
          userInfo ?
            <div style={{ display: "flex" }}>
              {userInfo.isTeacher &&
                <Link to="/class/add">
                  <Typography >Add Class</Typography>
                </Link>}
              <Link to="/signin" onClick={signout}>
                <Typography >{userInfo.name}</Typography>
              </Link>

            </div>
            :
            <div style={{ display: "flex" }}>
              <Link to="/signin">
                <Typography>Sign in</Typography>
              </Link>
              <Link to="/signup" className={classes.link}>
                <Typography>Sign up</Typography>
              </Link>
            </div>
        }

      </Toolbar>
    </AppBar>
  )
}
