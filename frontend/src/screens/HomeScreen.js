import { Grid } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ClassItem from '../components/ClassItem';

export default function HomeScreen() {
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
  }, [])

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
