import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'

export default function ClassDetail() {
  const [course, setCourse] = useState({});

  const { classId } = useParams();
  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await axios.get(`/api/classes/${classId}`);
        setCourse(data);
      } catch (error) {
        console.log(error.message);
      }
    }
    func();
  }, [classId]);

  return (
    <div>
      <h2>{course.name}</h2>
    </div>
  )
}
