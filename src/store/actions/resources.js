import * as actionTypes from './actionsTypes';
import axios from 'axios';
import download from 'downloadjs';
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
    return{
        type: actionTypes.FETCH_RESOURCES_FAIL,
        error: error
    }
}

export const fetchResources = (projectID, token) => {
    return dispatch => {
        dispatch(fetchResourcesStart());

        axios.get(`/project/Resources?pID=${projectID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            let fechedResources = [...res.data.Resources];
            console.log(fechedResources);
            dispatch(fetchResourcesSuccess(fechedResources));
            
        })
        .catch(err=>{
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
    return{
        type: actionTypes.CREATE_RESOURCE_FAIL
    }
}

export const createResourceInProject = (projectID,ResourceName,ResourceDescription,ResourceType,username, token) => {
    console.log(ResourceType);
    return dispatch => {
        dispatch(fetchResourcesStart());
        dispatch(createResourcestart());
        const data= {
            pID: projectID,
            aName: ResourceName,
            aDescription: ResourceDescription,
            Resource_type: ResourceType,
            username: username
        }
        console.log(data);
        axios.post(`/Resource`,data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch(fetchResources(projectID,token));
            dispatch(createResourcesuccess());
        })
        .catch(err=>{
            dispatch(createResourceFail());
        });
    }
}

export const removeResourceFromProject = (projectID,ResourceID, token) => {
    console.log(token);
    return dispatch => {
        dispatch(fetchResourcesStart());

        axios.delete(`/Resource?aID=${ResourceID}&pID=${projectID}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch(fetchResources(projectID,token));
        })
        .catch(err=>{
            dispatch(fetchResourcesFail(err));
        });
    }
}

export const modifyResourceInProject = (projectID,ResourceName,ResourceDescription,ResourceType, ResourceID, username, token) => {
    
    return dispatch => {
        dispatch(fetchResourcesStart());
        dispatch(createResourcestart());
        const data= {
            pID: projectID,
            aName: ResourceName,
            aDescription: ResourceDescription,
            Resource_type: ResourceType,
            aID: ResourceID,
            username: username
        }
        console.log(data);
        axios.patch(`/Resource`,data, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => {
            dispatch(fetchResources(projectID,token));
            dispatch(createResourcesuccess());
        })
        .catch(err=>{
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