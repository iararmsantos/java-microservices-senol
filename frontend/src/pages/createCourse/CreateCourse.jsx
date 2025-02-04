import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import Course from '../../models/course';
import courseService from '../../services/course.service';
import {Modal} from 'react-bootstrap';

const CreateCourse = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    showCourseModal() {
      setShow(true);
    }
  }));

  useEffect(() => {
    setCourse(props.course);
  }, [props.course])

  const [course, setCourse] = useState(new Course("", "", ""));
  const [errorMessage, setErrorMessage] = useState('');
  const [ submitted, setSubmitted] = useState(false);
  const [ show, setShow ] = useState(false);

  const saveCourse = (e) => {
    e.preventDefault();

    setSubmitted(true);

    if (!course.title || !course.subtitle || !course.price) {
      return;
    }

    courseService.saveCourse(course).then((response) => {
      props.onSaved(response.data);
      setShow(false);
      setSubmitted(false);
    }).catch((error) => {
      setErrorMessage("Unexpected error occurred.");
      console.log(error);
    })
  }

  const handleChange = (event) => {
    const { name, value} = event.target;

    setCourse(prevState => {
      return {
        ...prevState,
      [name]: value
      }
    })
  }

  return (
    <Modal show={show}>
      <form onSubmit={saveCourse} noValidate className={submitted ? 'was-validated' : ''}>
        <div className="modal-header">
          <h5 className="modal-title">Course Details</h5>
          <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
        </div>
        <div className="modal-body">
          {errorMessage && (
            <div className="alert alert-danger">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input 
              type="text" 
              name="title" 
              placeholder="Title" 
              className="form-control" 
              required 
              onChange={handleChange}
              value={course.title}
            />
            <div className="invalid-feedback">
              Title is required
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="subtitle">Subtitle: </label>
            <input 
              type="text" 
              name="subtitle" 
              placeholder="Subtitle" 
              className="form-control" 
              required 
              onChange={handleChange}
              value={course.subtitle}
            />
            <div className="invalid-feedback">
              Subtitle is required
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="price">Price: </label>
            <input 
              type="number" 
              min="1"
              step="any"
              name="price" 
              placeholder="Price" 
              className="form-control" 
              required 
              onChange={handleChange}
              value={course.price}
            />
            <div className="invalid-feedback">
              Price is required and should be greater than zero.
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button 
            type="button" 
            className="btn btn-secondary" 
            onClick={() => setShow(false)}
          >Close</button>
          <button type="submit" className="btn btn-primary">Save Changes</button>
        </div>
      </form>
    </Modal>
  )
})

export default CreateCourse;