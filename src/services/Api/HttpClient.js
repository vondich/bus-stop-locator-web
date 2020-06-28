import axios from 'axios';
import { API_BASE_URL } from './apiConstants';
import { getAuth } from '../../services/Auth';
import _get from 'lodash/get';

const buildHttpHeader = () => {
  return {
    'Authorization': 'Bearer ' + getAuth()
  }
};

const handleUnauthorized = () => {
	window.location = '/login';
}

const get = (endpoint, params) => {
  return new Promise((resolve, reject) => {
    const options = {
      headers: buildHttpHeader(),
      params
    }

    axios.get(API_BASE_URL + endpoint, options)
        .then((response) => {
            console.log(response)
            if (response.status >= 200 && response.status <= 399) {
                resolve(response)
            } else {
                reject({errorMessage: "Something went wrong. Please try again."})
            }
        })
        .catch((error) => {
            if(error.response.status === 401) {
                handleUnauthorized();
            } else {
                console.log(error);
                reject({errorMessage: "Something went wrong. Please try again."})
            }
        });
  });
}

const post = (endpoint, payload, isProtected = true) => {
	return new Promise((resolve, reject) => {
		const options = isProtected ? {
		  headers: buildHttpHeader()
		} : null;
	
		axios.post(API_BASE_URL + endpoint, payload, options)
			.then((response) => {
				console.log(response)
				if(response.status >= 200 && response.status <= 399) {
					resolve(response)
				} else {
					reject({errorMessage: "Something went wrong. Please try again."})
				}
			})
			.catch((error) => {
				if(error.response.status === 401 && isProtected) {
					handleUnauthorized();
				} else {
					console.log(error);
					reject({
						...error,
						errorMessage: _get(error, 'response.data.message', "Something went wrong. Please try again.")
					})
				}
			});
	  });
}

export { get, post }
