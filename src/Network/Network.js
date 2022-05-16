import axios from "axios";

export const get = (url,handleSucessResponce,handleFailureResponce) => {
    axios.get(url).then((responce) => {
            handleSucessResponce(responce);
        })
        .catch((error) => {
            handleFailureResponce(error);
        });
};


export const deleteRecord = (url,handleSucessResponce,handleFailureResponce) => {
    axios.delete(url).then((responce) => {
            handleSucessResponce(responce);
        })
        .catch((error) => {
            handleFailureResponce(error);
        });
};

export const post = (url,data,handleSucessResponce,handleFailureResponce) => {
    console.log("URL :" + url)
    axios
        .post(url, data)
        .then((responce) => {
            handleSucessResponce(responce);
        })
        .catch((error) => {
            handleFailureResponce(error);
        });
};

export const put = (url,data,handleSucessResponce,handleFailureResponce) => {
    axios.put(url, data).then((responce) => {
            handleSucessResponce(responce);
        })
        .catch((error) => {
            handleFailureResponce(error);
        });
};

export const upload = (url,formdata,handleSucessResponce,handleFailureResponce) => {
    axios({
        method:'post',
        url:url,
        data:formdata,
        headers: { "Content-Type": "multipart/form-data" },
    }).then((responce) => {
            handleSucessResponce(responce);
        })
        .catch((error) => {
            handleFailureResponce(error);
        });
};
