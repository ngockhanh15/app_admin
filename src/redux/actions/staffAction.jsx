import StaffService from "../../services/staffService";
import { COMMON_ERROR_SET, COMMON_MESSAGE_SET, STAFF_SET, STAFF_STATE_CLEAR, STAFFS_SET } from "./actionTypes";

export const insertStaff = (staff, navigate) => async (dispatch) => {
    const service = new StaffService();

    try {
        console.log('insert staff');

        const response =await service.insertStaff(staff);

        if(response.status === 201){
            dispatch({
                type: STAFF_SET,
                payload: response.data,
            });
            dispatch({
                type: COMMON_MESSAGE_SET,
                payload: 'Đã lưu cán bộ',
            });
        }
        else{
            dispatch({
                type: COMMON_ERROR_SET,
                payload: response.message
            })
        }
        console.log(response);
    } catch (error){
        console.log('Error' + error)
        dispatch({
            type: COMMON_ERROR_SET,
            payload: error
        })
    }

    navigate("/staffs/list");
};

export const getStaffs = (limit = 1, pageIndex = 5) => async (dispatch) => {
    const service = new StaffService();

    try {
        console.log('get staffs');

        const response = await service.getStaffs({ limit, pageIndex });

        console.log(response);

        if(response.status === 200){
            dispatch({
                type: STAFFS_SET,
                payload: response.data,
            });
        }
        
    } catch (error) {
        console.log(error);
    }
};

export const clearStaffState = () => (dispatch) =>{
    dispatch({type: STAFF_STATE_CLEAR});
};