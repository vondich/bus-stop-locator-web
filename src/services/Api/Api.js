
import { get, post } from './HttpClient'
import endpoints from './apiConstants'
import { setAuth } from '../Auth';

export const fetchNearestBusStop = (lat, long) => {
  return new Promise((resolve, reject) => {
    const params = {
      "source_lat": lat,
      "source_long": long,
    }

    get(endpoints.BUS_STOPS_NEAREST, params)
      .then(response => {
        resolve(response.data.data)
      })
      .catch(error => reject(error))
  })
}

export const registerNewBus = (busStopId, payload) => {
  return new Promise((resolve, reject) => {
    const endpoint = endpoints.BUSES.replace('{0}', busStopId)
    post(endpoint, payload)
      .then(response => {
        resolve({
            code: response.data.data.bus.code,
            firstArrivalTime: response.data.data.first_arrival_time,
            lastArrivalTime: response.data.data.last_arrival_time
        })
      })
      .catch(error => {
          const validationErrors = (error.response.status === 422) ?
            error.response.data.errors :
            null;

          reject({
              ...error,
              validationErrors
          })
      })
  })
}

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    const payload = {
      email,
      password
    }
    post(endpoints.LOGIN, payload, false)
      .then(response => {
        setAuth(response.data.access_token);
        resolve(response.data.data)
      })
      .catch(error => {
        const errorMessage = (error.response.status === 401) ? 
          "Username/password is invalid" :
          error.errorMessage;
        reject({
            ...error,
            errorMessage
        })
      })
  })
}