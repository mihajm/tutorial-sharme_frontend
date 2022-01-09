export const fetchUser = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
