import * as actionTypes from './actionsTypes';
import axios from 'axios';
// import download from 'downloadjs';
//

export const fetchResourcesStart = () => {
    return {
        type: actionTypes.FETCH_RESOURCES_START
    }
}

export const fetchResourcesSuccess = (resources) => {
    return {
        type: actionTypes.FETCH_RESOURCES_SUCCESS,
        resources: resources
    }
}

export const fetchResourcesFail = (error) => {
    return {
        type: actionTypes.FETCH_RESOURCES_FAIL,
        error: error
    }
}

export const fetchResources = () => {
    return dispatch => {
        dispatch(fetchResourcesStart());

        axios.get(`/resources`)
            .then(res => {
                let fechedResources = [...res.data.resources];
                console.log(fechedResources);
                dispatch(fetchResourcesSuccess(fechedResources));

            })
            .catch(err => {
                dispatch(fetchResourcesFail(err));
            });
    }
}

// not modified yet 
export const createResourcestart = () => {
    return {
        type: actionTypes.CREATE_RESOURCE_START
    }
}

export const createResourcesuccess = () => {
    return {
        type: actionTypes.CREATE_RESOURCE_SUCCESS
    }
}

export const createResourceFail = () => {
    return {
        type: actionTypes.CREATE_RESOURCE_FAIL
    }
}

export const createResourceInProject = (name, type, max, rate) => {
    return dispatch => {
        dispatch(fetchResourcesStart());
        dispatch(createResourcestart());
        const data = {
            name: name,
            type: type,
            max: max,
            rate: rate,
        }
        console.log(data);
        axios.post(`/resources`, data)
            .then(res => {
                dispatch(fetchResources());
                dispatch(createResourcesuccess());
            })
            .catch(err => {
                dispatch(createResourceFail());
            });
    }
}

// not implemented
export const removeResourceFromProject = (id) => {

    return dispatch => {
        dispatch(fetchResourcesStart());

        axios.delete(`/Resource?ID=${id}`)
            .then(res => {
                dispatch(fetchResources());
            })
            .catch(err => {
                dispatch(fetchResourcesFail(err));
            });
    }
}

export const modifyResourceInProject = (id, name, type, max, rate) => {

    return dispatch => {
        dispatch(fetchResourcesStart());
        dispatch(createResourcestart());
        const data = {
            name: name,
            type: type,
            max: max,
            rate: rate,
        }
        console.log(data);
        axios.patch(`/tasks?id=${id}`, data)
            .then(res => {
                dispatch(fetchResources());
                dispatch(createResourcesuccess());
            })
            .catch(err => {
                dispatch(createResourceFail());
            });
    }
}

// export const exportResources = (projectID, token) => {
//     return dispatch => {
//         dispatch(fetchResourcesStart());

//         axios.get(`/project/export_Resource_information?pID=${projectID}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then(res => {
//             console.log(res);
//             download(res.data, "Resources.csv", "text/csv" )
//         })
//         .catch(err=>{
//             console.log(err);
//         });
//     }
// }