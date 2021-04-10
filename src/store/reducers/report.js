import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    taskResourcesReport: [],
    taskCostsReport: [],
    projectReport: [],
    loading: true,
    error: null,
}

const reportStart = (state, action) => {
    return { ...state, ...{  error: null,  } };
}

const reportSuccess = (state, action) => {
    return { ...state, ...{  error: null,     taskResourcesReport: [...action.taskResourcesReport], taskCostsReport: [...action.taskCostsReport], projectReport: [...action.taskCostsReport]} };
}

const reportFail = (state, action) => {
    return { ...state, ...{ error: action.error} };
}


const reportReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_REPORT_START: return reportStart(state, action);
        case actionTypes.FETCH_REPORT_SUCCESS: return reportSuccess(state, action);
        case actionTypes.FETCH_REPORT_FAIL: return reportFail(state, action);
        default: return state;
    }
}

export default reportReducer;