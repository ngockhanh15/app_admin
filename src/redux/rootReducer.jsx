import { combineReducers } from "redux";
import staffReducer from "./reducers/staffReducer";
import commonReducer from "./reducers/commonReducer";

const rootReducer = combineReducers({
    staffReducer: staffReducer,
    commonReducer: commonReducer,
});

export default rootReducer;