import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/AuthSlice'
import profileReducer from '../slices/ProfileSlice'
import courseReducer from '../slices/courseSlice'
import cartReducer from '../slices/cartSlice'
import viewCourseReducer from '../slices/viewCourseSlice'

const rootReducer = combineReducers({
    auth : authReducer,
    profile : profileReducer,
    course : courseReducer,
    cart : cartReducer,
    viewCourse : viewCourseReducer

})

export default rootReducer