import Api from "./Api"

const url = "/cart"

export const getListCart = () => {
    return Api.get(url)
}

export const addItemCart = (productId, quantity) => {
    const body = {
        productId,
        quantity,
    }

    return Api.post(`${url}/add`, body)
}

export const deleteItemCart = (cartItemId) => {
    return Api.delete(`${url}/delete/${cartItemId}`)
}
