import axios from 'axios';
import { BASE_URL } from '../commom/Constants';
import { authHeader } from './base.service';

const API_URL = BASE_URL + '/api/user';
class UserService {
    changeRole(role) {
        return axios.put(API_URL + '/change/' + role, {}, {
            headers: authHeader()
        });
    }
}

export default new UserService();