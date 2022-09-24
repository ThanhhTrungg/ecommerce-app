import Api from "./Api"

const url = "/products"

export const createProduct = (title, price, description, categoryId, images) => {
    const body = {
        title,
        price,
        description,
        categoryId,
        images,
    }

    return Api.post(`${url}`, body)
}

export const listProduct = () => {
    return Api.get(url)
}
