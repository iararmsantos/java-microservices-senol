import axios from "axios";
import { BASE_URL } from "../commom/Constants";

const baseUrl = BASE_URL + '/api/authentication/';

class AuthenticationService {
    login(user) {
        return axios.post(baseUrl + 'signin', user);
    }

    register(user) {
        return axios.post(baseUrl + 'signup', user);
    }
}

export default new AuthenticationService();