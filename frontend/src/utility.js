export function setAuthHeader(token) {
    window.localStorage.setItem('auth_token', token)
};