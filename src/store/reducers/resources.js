import * as actionTypes from '../actions/actionsTypes';

const initalState = {
    resources: [],
    loading: true,
    error: null,
    selectedResource: null,
    isResourceExist: false
}

const resourcesStart = (state, action) => {
    return { ...state, ...{  error: null, isResourceExist: false } };
}

const resourcesSuccess = (state, action) => {
    return { ...state, ...{  error: null, resources: [ ...action.resources ]} };
}

const resourcesFail = (state, action) => {
    return { ...state, ...{ error: action.error} };
}

const createResourceStart = (state, action) => {
    return { ...state, ...{  isResourceExist: false, loading: true } };
}

const createResourceSuccess = (state, action) => {
    return { ...state, ...{  isResourceExist: false, loading: false } };
}

const createResourceFail = (state, action) => {
    return { ...state, ...{  isResourceExist: true, loading: false } };
}


const resourcesReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_RESOURCES_START: return resourcesStart(state, action);
        case actionTypes.FETCH_RESOURCES_SUCCESS: return resourcesSuccess(state, action);
        case actionTypes.FETCH_RESOURCES_FAIL: return resourcesFail(state, action);
        case actionTypes.CREATE_RESOURCE_START: return createResourceStart(state, action);
        case actionTypes.CREATE_RESOURCE_SUCCESS: return createResourceSuccess(state, action);
        case actionTypes.CREATE_RESOURCE_FAIL: return createResourceFail(state, action);
        default: return state;
    }
}

export default resourcesReducer;