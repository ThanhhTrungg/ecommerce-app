import Api from "./Api"

const url = "/categories"

export const createCategory = ( name, image) => {
    const body = {
        name,
        image,
    }

    return Api.post(`${url}`, body)
}

export const listCategory = () => {
    return Api.get(url)
}

export const getAllProductsByCategory = (id) => {
    return Api.get(`${url}/${id}/products`)
}