import * as actionTypes from './actionsTypes';
import axios from 'axios';
import download from 'downloadjs';
//

export const fetchTasksStart = () => {
    return {
        type: actionTypes.FETCH_TASKS_START
    }
}

export const fetchTasksSuccess = (tasks) => {
    return {
        type: actionTypes.FETCH_TASKS_SUCCESS,
        tasks: tasks
    }
}

export const fetchTasksFail = (error) => {
    return{
        type: actionTypes.FETCH_TASKS_FAIL,
        error: error
    }
}

export const fetchTasks = () => {
    return dispatch => {
        dispatch(fetchTasksStart());

        axios.get(`/project/Tasks`)
        .then(res => {
            let fechedTasks = [...res.data.Tasks];
            console.log(fechedTasks);
            dispatch(fetchTasksSuccess(fechedTasks));
            
        })
        .catch(err=>{
            dispatch(fetchTasksFail(err));
        });
    }
}

// not modified yet 
export const createTaskstart = () => {
    return {
        type: actionTypes.CREATE_TASK_START
    }
}

export const createTasksuccess = () => {
    return {
        type: actionTypes.CREATE_TASK_SUCCESS
    }
}

export const createTaskFail = () => {
    return{
        type: actionTypes.CREATE_TASK_FAIL
    }
}

export const createTaskInProject = (name,duration,start,finish,resources) => {
    return dispatch => {
        dispatch(fetchTasksStart());
        dispatch(createTaskstart());
        const data= {
            name: name,
            duration: duration,
            start: start,
            finish: finish,
            resources: resources,
        }
        console.log(data);
        axios.post(`/Task`,data)
        .then(res => {
            dispatch(fetchTasks());
            dispatch(createTasksuccess());
        })
        .catch(err=>{
            dispatch(createTaskFail());
        });
    }
}

export const removeTaskFromProject = (id) => {
    return dispatch => {
        dispatch(fetchTasksStart());

        axios.delete(`/Task?ID=${id}`)
        .then(res => {
            dispatch(fetchTasks());
        })
        .catch(err=>{
            dispatch(fetchTasksFail(err));
        });
    }
}

export const modifyTaskInProject = (id,name,duration,start,finish,resources) => {
    
    return dispatch => {
        dispatch(fetchTasksStart());
        dispatch(createTaskstart());
        const data= {
            id: id,
            name: name,
            duration: duration,
            start: start,
            finish: finish,
            resources: resources,
        }
        console.log(data);
        axios.patch(`/Task`,data)
        .then(res => {
            dispatch(fetchTasks());
            dispatch(createTasksuccess());
        })
        .catch(err=>{
            dispatch(createTaskFail());
        });
    }
}

// export const exportTasks = (projectID, token) => {
//     return dispatch => {
//         dispatch(fetchTasksStart());

//         axios.get(`/project/export_Task_information?pID=${projectID}`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then(res => {
//             console.log(res);
//             download(res.data, "Tasks.csv", "text/csv" )
//         })
//         .catch(err=>{
//             console.log(err);
//         });
//     }
// }