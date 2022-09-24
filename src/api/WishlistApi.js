import axios, { Axios } from "axios"
import Api from "./Api"

const url = "/wishlist"

export const getListWishlist = () => {
    return Api.get(url)
}

export const addItemWishlist = (id) => {
    const body = {
        id,
    }
    return Api.post(`${url}/add`, body)
}

export const deleteItemWishlist = (wishlistItemId) => {
    const cancelToken = axios.CancelToken
    const source = cancelToken.source()
    return Api.delete(`${url}/delete/${wishlistItemId}`, {
        cancelToken: source.token,
    })
}
