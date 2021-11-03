import { Grid } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import ClassItem from '../components/ClassItem';
import { ADD_CLASS_RESET } from '../constants/classConstant';

export default function HomeScreen() {
  const dispatch = useDispatch();
  const [listClass, setListClass] = useState([]);
  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await axios.get("/api/classes");
        setListClass(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    func();
    dispatch({ type: ADD_CLASS_RESET });
  }, [dispatch])

  return (
    <Grid container spacing={4} style={{ marginTop: 1 }}>
      {
        !listClass ?
          <p>Get ERROR</p> :
          listClass.length === 0 ?
            <p>List class is EMPTY</p> :
            listClass.map(c => {
              return (
                <Grid key={c._id} item xs={4}>
                  <ClassItem class={c} />
                </Grid>
              )
            })
      }
    </Grid>
  )
}
