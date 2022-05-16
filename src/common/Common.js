export const LOGIN_URL = "http://35.193.134.10:8080/api/v1/admin/authenticate";

export const BASE_NAME_SERVICE_URL="http://35.192.143.76:8080/";

export const FETCH_ALL_RECORDS = BASE_NAME_SERVICE_URL+'api/v1/npsrecords/getAllEmpRecords';

export const DELETE_URL = BASE_NAME_SERVICE_URL+'api/v1/npsrecords/deleteEmpRecord/';

export const SAVE_NAME_PRONOUNCATION = BASE_NAME_SERVICE_URL+'api/v1/npsrecords/save'

export const AUDIO_FILE=BASE_NAME_SERVICE_URL+'api/v1/npsrecords/getEmpAudioRecord?empId='

export const COUNTRY_URL =BASE_NAME_SERVICE_URL+'api/v1/npsrecords/getCountryList'

export const APPROVE_URL = BASE_NAME_SERVICE_URL+'api/v1/npsrecords/ApproveEmpAudioRecord';

export const REJECT_URL = BASE_NAME_SERVICE_URL+'api/v1/npsrecords/RejectEmpAudioRecord';



export const handleFailureScenario =(error,callback) =>{

}