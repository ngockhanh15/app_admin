import { combineReducers } from "redux";
import staffReducer from "./reducers/staffReducer";

const rootReducer = combineReducers({
    staffReducer: staffReducer,
});

export default rootReducer;