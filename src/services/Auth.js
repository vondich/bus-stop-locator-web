import Cookies from 'js-cookie'

export const getAuth = () => {
  const jwt = Cookies.get('__session')
  let session = null;
  try {
    if (jwt) {
      session = jwt
    }
  } catch (error) {
    console.log(error)
  }
  return session
}

export const setAuth = (token) => {
    Cookies.set('__session', token)
}

export const logOut = () => {
  Cookies.remove('__session')
}