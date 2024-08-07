import { STAFF_SET, STAFFS_SET } from "../actions/actionTypes"

const initialState = {
    staff: {},
    staffs: []
}

const staffReducer = (state = initialState, {type, payload}) => {
    switch (type) {
        case STAFF_SET:
            return {...state, staff: payload}

        case STAFFS_SET:
            return {...state, staffs: payload}
        
            default:
            return state
    }
}

export default staffReducer