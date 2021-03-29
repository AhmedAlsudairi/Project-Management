import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    Tasks: [],
    loading: true,
    error: null,
    selectedTask: null,
    isTaskExist: false
}

const TasksStart = (state, action) => {
    return { ...state, ...{  error: null, isTaskExist: false } };
}

const TasksSuccess = (state, action) => {
    return { ...state, ...{  error: null, Tasks: [ ...action.Tasks ]} };
}

const TasksFail = (state, action) => {
    return { ...state, ...{ error: action.error} };
}

const createTaskStart = (state, action) => {
    return { ...state, ...{  isTaskExist: false, loading: true } };
}

const createTaskSuccess = (state, action) => {
    return { ...state, ...{  isTaskExist: false, loading: false } };
}

const createTaskFail = (state, action) => {
    return { ...state, ...{  isTaskExist: true, loading: false } };
}


const TasksReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_TASKS_START: return TasksStart(state, action);
        case actionTypes.FETCH_TASKS_SUCCESS: return TasksSuccess(state, action);
        case actionTypes.FETCH_TASKS_FAIL: return TasksFail(state, action);
        case actionTypes.CREATE_TASK_START: return createTaskStart(state, action);
        case actionTypes.CREATE_TASK_SUCCESS: return createTaskSuccess(state, action);
        case actionTypes.CREATE_TASK_FAIL: return createTaskFail(state, action);
        default: return state;
    }
}

export default TasksReducer;