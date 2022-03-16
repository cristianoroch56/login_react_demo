// return the user data from the local storage
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);
  else return null;
}

// return the token from the local storage
export const getToken = () => {
  console.log("-=-=-");
  console.log("-=-=-",localStorage.getItem('token'));
  return localStorage.getItem('token') || null;
}

// remove the token and user from the local storage
export const removeUser = () => {
  localStorage.removeItem('token');
}

// set the token and user from the local storage
export const setUser = (token) => {
  localStorage.setItem('token', token);
}