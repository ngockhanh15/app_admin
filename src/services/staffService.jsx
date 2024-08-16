import axios from "axios"
import { API_STAFF } from "./constant"

export default class StaffService {
    insertStaff = async(staff) => {
        return await axios.post(API_STAFF, staff);
    };
    getStaffs = async({ limit, pageIndex }) =>{
        const params = { limit, pageIndex };
        return await axios.get(API_STAFF,{ params });
    };
    deleteStaff = async(id) => {
        return await axios.delete(`${API_STAFF}?Id=${id}`);
    };
}
