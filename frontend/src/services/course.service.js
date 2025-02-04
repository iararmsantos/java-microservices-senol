import axios from "axios";
import { BASE_URL } from "../commom/Constants";
import { authHeader } from "./base.service";

const API_URL = BASE_URL + '/gateway/course'

class CourseService {

    saveCourse(course) {
        return axios.post(API_URL, course, {headers: authHeader()});
    }

    deleteCourse(course) {
        console.log({course})
        return axios.delete(API_URL + "/" + course.id, {headers: authHeader()})
    }

    getAllCourses() {
        return axios.get(API_URL);
    }
}

export default new CourseService();