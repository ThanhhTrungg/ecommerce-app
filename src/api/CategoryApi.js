import Api from "./Api"

const url = "/categories"

export const createCategory = (categoryDes, categoryName, categoryImageUrl) => {
    const body = {
        categoryDes,
        categoryName,
        categoryImageUrl,
    }

    return Api.post(`${url}/create`, body)
}

export const listCategory = () => {
    return Api.get(url)
}

export const getCategory = (id) => {
    return Api.get(`${url}/${id}`)
}
