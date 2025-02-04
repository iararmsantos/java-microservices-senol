import React, { useEffect, useState } from 'react';
import CourseService from '../../services/course.service';
import PurchaseService from '../../services/purchase.service';
import { useSelector } from 'react-redux';
import Purchase from '../../models/purchase';
import './HomePage.css';
import { FaUserGraduate } from "react-icons/fa";

const HomePage = () => {
  const [courseList, setCourseList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');

  const currentUser = useSelector(state => state.user);

  useEffect(() => {
    CourseService.getAllCourses().then((response) => {
      setCourseList(response.data);
    })
  }, []);

  const purchase = (course) => {
    console.log({currentUser});
    if (!currentUser?.id) {
      setErrorMessage('You should login to buy a course.');
      return;
    }

    const purchase = new Purchase(currentUser.id, course.id, course.title, course.price);

    PurchaseService.savePurchase(purchase).then(() => {
      setInfoMessage('Mission is complete.');
    }).catch((error) => {
      setErrorMessage("unexpected error occurred.");
      console.log(error);
    })
  }

  return (
    <div className="container p-3">
      {errorMessage && (
        <div className="alert alert-danger">{errorMessage}</div>
      )}
      {infoMessage && (
        <div className="alert alert-success">{infoMessage}</div>
      )}

      <div className="d-flex flex-wrap">
        {courseList.map((item, index) => (
          <div className="card m-3 home-card" key={item.id}>
            <div className="card-body">
              <div className="card-title text-uppercase">{item.title}</div>
              <div className="card-subtitle text-muted">{item.subtitle}</div>
            </div>
            <FaUserGraduate className='ms-auto me-auto course-icon'/>
            <div className="row mt-2 p-3">
              <div className="col-6 mt-2 ps-4">
                {`$ ${item.price}`}
              </div>
              <div className="col-6">
                <button className="btn btn-outline-success w-100" onClick={() => purchase(item)}>
                  Buy
                </button>
              </div>
            </div>
          </div>
        ))}
        
      </div>
    </div>
  )
}

export default HomePage