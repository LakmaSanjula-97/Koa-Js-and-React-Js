import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentPage = () => {
  const [name, setName] = useState("");
  const [nic, setNIC] = useState("");
  const [age, setAge] = useState("");
  const [courseId, setCourseId] = useState("");

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [isEditClick, setIsEditClick] = useState(false);
  const [editName, setEditName] = useState("");
  const [editNIC, setEditNIC] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editCourseId, setEditCourseId] = useState("");

  useEffect(() => {
    axios.get(`${process.env.BASE_URL}/course/`).then((res) => {
      setCourses(res.data);
    });
    axios.get(`${process.env.BASE_URL}/student/`).then((res) => {
      setStudents(res.data);
    });
  }, []);


  const addStudent = (e) => {
    e.preventDefault();

    //-------
    const studentObj = {
      name,
      nic,
      age,
      courseId,
   
    };

    axios
    .post(`${process.env.BASE_URL}/student/add`, studentObj)
    .then((res) => {
      alert("Data added");
      axios.get(`${process.env.BASE_URL}/student/`).then((res) => {
        setStudents(res.data);
      });
      setName("");
      setNIC("");
      setAge("");
      setCourseId("");
      
    })
    .catch((err) => {
      alert(err.message);
    });
//------------------------
  };

  const updateStudent = (e) => {
    e.preventDefault();
  };


  //-------------------------------
  const deleteStudent = (e) => {
    e.preventDefault();
    axios
      .delete(`${process.env.BASE_URL}/student/${e.target.id}`)
      .then(() => {
        axios.get(`${process.env.BASE_URL}/student/`).then((res) => {
          setStudents(res.data);
        });
      })
      .catch((err) => {
        alert(err.message);
      });
  };
  //---------------------------

  const onEditClick = (e) => {
    e.preventDefault();
    const student = students.find((student) => {
      student._id === e.target.id;
    });
    if (student) {
      setEditName(student.name);
      setEditAge(student.age);
      setEditNIC(student.nic);
      setIsEditClick(true);
    }
  };

  return (
    <div>
      <h1>Student Page</h1>
      <div style={{ marginBottom: 5 }}>
        <input
          type="text"
          placeholder="Enter name"
          value={name}
          style={{ margin: 5 }}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Enter nic"
          value={nic}
          style={{ margin: 5 }}
          onChange={(e) => setNIC(e.target.value)}
        />
        <input
          type="number"
          placeholder="Enter age"
          value={age}
          style={{ margin: 5 }}
          onChange={(e) => setAge(e.target.value)}
        />
        <select onChange={(e) => setCourseId(e.target.value)}>
          {courses &&
            courses.length > 0 &&
            courses.map((course, index) => (
              <option value={course._id} key={index}>
                {course.courseName}
              </option>
            ))}
        </select>
        <button onClick={(e) => addStudent(e)} style={{ margin: 5 }}>
          Submit
        </button>
      </div>

      <table>
        <tr>
          <th>Name</th>
          <th>NIC</th>
          <th>Age</th>
          <th>Course</th>
          <th>Actions</th>
        </tr>
        {students &&
          students.length > 0 &&
          students.map((student, index) => (
            <tr key={index}>
              <td>{student.name}</td>
              <td>{student.nic}</td>
              <td>{student.age}</td>
              <td>{student.courseId && student.courseId.courseName}</td>

              {/* -------ACTIONS---------- */}
              <td>
                  <button id={student._id} onClick={(e) => onEditClick(e)}>
                    {isEditClick && student._id === editId ? "Cancel" : "Update"}
                  </button>
                  {isEditClick && student._id === editId && (
                    <button onClick={(e) => updateData(e)}>Save</button>
                  )}
                  <button id={student._id} onClick={(e) => deleteStudent(e)}>
                    Delete
                  </button>
                </td>
              {/* ------------------------ */}
            </tr>
          ))}
      </table>
    </div>
  );
};

export default StudentPage;
