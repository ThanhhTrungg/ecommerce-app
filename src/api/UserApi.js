import Api from "./Api"

const url = "/user"

const register = (username, email, password) => {
    const body = {
        userName: username,
        email: email,
        passwords: password,
    }

    return Api.post(`${url}/register`, body)
}

const login = (userName, password) => {
    const body = {
        userName: userName,
        passwords: password,
    }

    return Api.post(`${url}/login`, body)
}

const getUserProfile = (email) => {
    return Api.get(`${url}/email/${email}`)
}

const existsUserByEmail = (email) => {
    return Api.get(`${url}/email/${email}`)
}

const existsUserByUserName = (username) => {
    return Api.get(`${url}/username/${username}`)
}

// export
const api = {
    register,
    login,
    getUserProfile,
    existsUserByEmail,
    existsUserByUserName,
}
export default api
