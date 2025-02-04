import axios from "axios";
import { BASE_URL } from "../commom/Constants";
import { authHeader } from "./base.service";

const API_URL = BASE_URL + '/gateway/purchase';

class PurchaseService {
    savePurchase(purchase) {
        return axios.post(API_URL, purchase, {headers: authHeader()})
    }

    getAllPurchaseItems() {
        return axios.get(API_URL, {headers: authHeader()});
    }
}

export default new PurchaseService();