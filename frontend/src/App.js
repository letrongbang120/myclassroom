import Grid from '@mui/material/Grid'
import { Route } from 'react-router';
import AddClassForm from './components/AddClassForm';
import Header from './components/Header';
import SignInForm from './components/SignInForm';
import SignupForm from './components/SignupForm';
import ClassDetail from './screens/ClassDetail';
import HomeScreen from './screens/HomeScreen';


function App() {
  return (
    <Grid container direction="column">
      <Grid item>
        <Header />
      </Grid>
      <Grid item container >
        <Grid item xs={0} md={1}></Grid>
        <Grid item xs={12} md={10}>
          <Route path="/" component={HomeScreen} exact></Route>
          <Route path="/signin" component={SignInForm}></Route>
          <Route path="/signup" component={SignupForm}></Route>
          <Route path="/classes/add" component={AddClassForm} exact></Route>
          <Route path="/class/:classId" component={ClassDetail}></Route>
        </Grid>
        <Grid item xs={0} md={1}></Grid>

      </Grid>
    </Grid>
  );
}

export default App;
