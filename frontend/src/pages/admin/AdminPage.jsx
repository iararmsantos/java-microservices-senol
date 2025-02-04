import React, { useEffect, useRef, useState } from 'react'
import CourseService from '../../services/course.service';
import CreateCourse from '../createCourse/CreateCourse'
import Course from '../../models/course';
import { CourseDelete } from '../../components/CourseDelete';
 

const AdminPage = () => {
  const [courseList, setCourseList] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(new Course('', '', 0))
  const saveComponent = useRef();
  const deleteComponent = useRef();
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    CourseService.getAllCourses()
    .then((response) => {
      setCourseList(response.data);
    })
  }, [])

  const createCourseRequest = () => {
    setSelectedCourse(new Course('', '', 0))
    saveComponent.current?.showCourseModal();
  }

  const editCourseRequest = (item) => {    
    setSelectedCourse(Object.assign({}, item));
    saveComponent.current?.showCourseModal();
  }

  const saveCourseWatcher = (course) => {
    let itemIndex = courseList.findIndex(item => item.id === course.id);

    if (itemIndex !== -1) {
      const newList = courseList.map((item) => {
        if (item.id === course.id) {
          return course;
        }
        return item;
      });
      setCourseList(newList);
    } else {
      const newList = courseList.concat(course);
      setCourseList(newList);
    }    
  }

  const deleteCourse = () => {    
    CourseService.deleteCourse(selectedCourse)
    .then(_ => {
      setCourseList(courseList.filter(x => x.id !== selectedCourse.id));
    }).catch(error  => {
      setErrorMessage('Unexpected error ocurred.');
      console.log(error);
    });
  }
  const deleteCourseRequest = (course) => {
    setSelectedCourse(course);
    deleteComponent.current?.showDeleteModal();
  }

  return (
    <div>
      <div className="container">
        <div className="pt-5">
          {errorMessage && (
            <div className="alert alert-danger">{errorMessage}</div>
          )}
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-6">
                  <h3>All Courses</h3>
                </div>
                <div className="col-6 text-end"><button className="btn btn-primary" onClick={createCourseRequest}>Create Course</button></div>
              </div>
            </div>
            <div className="card-body">
              <table className="table table-stripe">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Price</th>
                    <th scope="col">Date</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {courseList.map((item, index) => (
                    <tr key={item.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{item.title}</td>
                    <td>{`$ ${item.price}`}</td>
                    <td>{new Date(item.createDate).toLocaleDateString()}</td>
                    <td>
                      <button 
                        className="btn btn-primary me-1"
                        onClick={() => editCourseRequest(item)}
                      >Edit</button>
                      <button className="btn btn-danger" onClick={() => deleteCourseRequest(item)}>Delete</button>
                    </td>
                  </tr>
                  ))}
                  
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CreateCourse course={selectedCourse} ref={saveComponent} onSaved={(p) => saveCourseWatcher(p)}/>
        <CourseDelete ref={deleteComponent} onConfirmed={() => deleteCourse()}></CourseDelete>
    </div>
  )
}

export default AdminPage