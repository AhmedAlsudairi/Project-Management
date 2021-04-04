import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    tasks: [],
    loading: true,
    error: null,
    selectedTask: null,
    isTaskExist: false
}

const tasksStart = (state, action) => {
    return { ...state, ...{  error: null, isTaskExist: false } };
}

const tasksSuccess = (state, action) => {
    return { ...state, ...{  error: null, tasks: [ ...action.tasks ]} };
}

const tasksFail = (state, action) => {
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
        case actionTypes.FETCH_TASKS_START: return tasksStart(state, action);
        case actionTypes.FETCH_TASKS_SUCCESS: return tasksSuccess(state, action);
        case actionTypes.FETCH_TASKS_FAIL: return tasksFail(state, action);
        case actionTypes.CREATE_TASK_START: return createTaskStart(state, action);
        case actionTypes.CREATE_TASK_SUCCESS: return createTaskSuccess(state, action);
        case actionTypes.CREATE_TASK_FAIL: return createTaskFail(state, action);
        default: return state;
    }
}

export default TasksReducer;