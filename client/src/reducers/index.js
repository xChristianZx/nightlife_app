import { combineReducers } from "redux";
import dataReducer from "./dataReducer";
import authReducer from "./authReducer";

export default combineReducers({ data: dataReducer, auth: authReducer });
