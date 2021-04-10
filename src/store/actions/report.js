import * as actionTypes from './actionsTypes';
import axios from 'axios';
// import download from 'downloadjs';
//

export const fetchReportStart = () => {
    return {
        type: actionTypes.FETCH_REPORT_START
    }
}

export const fetchReportSuccess = (taskResourcesReport,taskCostsReport,projectReport,totalCost) => {
    return {
        type: actionTypes.FETCH_REPORT_SUCCESS,
        taskResourcesReport: taskResourcesReport,
        taskCostsReport: taskCostsReport,
        projectReport: projectReport,
        totalCost: totalCost
    }
}

export const fetchReportFail = (error) => {
    return{
        type: actionTypes.FETCH_REPORT_FAIL,
        error: error
    }
}

export const fetchTaskResourcesReport = () => {
    return dispatch => {
        dispatch(fetchReportStart());

        axios.get(`/report`)
        .then(res => {
            let fechedReport = [...res.data.report];
            console.log(fechedReport);
            dispatch(fetchReportSuccess(fechedReport,[],[],[]));
            
        })
        .catch(err=>{
            dispatch(fetchReportFail(err));
            console.log(err);
        });
    }
}

export const fetchTaskCostsReport = () => {
    return dispatch => {
        dispatch(fetchReportStart());

        axios.get(`/report_task`)
        .then(res => {
            let fechedReport = [...res.data.report];
            console.log(fechedReport);
            dispatch(fetchReportSuccess([],fechedReport,[],[]));
            
        })
        .catch(err=>{
            dispatch(fetchReportFail(err));
        });
    }
}

export const fetchProjectReport = () => {
    return dispatch => {
        dispatch(fetchReportStart());

        axios.get(`/report_project`)
        .then(res => {
            let fechedReport = [...res.data.report];
            console.log(fechedReport);
            dispatch(fetchReportSuccess([],[],fechedReport,res.data.project_total_cost));
            
        })
        .catch(err=>{
            dispatch(fetchReportFail(err));
        });
    }
}