import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import React from 'react'
import { useHistory } from 'react-router-dom'

export default function ClassItem(props) {
  const history = useHistory();
  const seeDetailHandler = () => {
    history.push(`/class/${props.class._id}`);
  }
  return (
    <Card sx={{ width: 350 }}>
      <CardContent>
        <Typography sx={{ fontSize: 18 }}>
          {props.class.owner.name}
        </Typography>
        <Typography
          variant="h4"
          component="div"
        >
          {props.class.name}
        </Typography>
        <Typography
          color="GrayText"
          style={{ height: 70, overflow: "hidden", textOverflow: "ellipsis" }}
        >
          {props.class.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={seeDetailHandler}>
          Learn more
        </Button>
      </CardActions>
    </Card>
  )
}
