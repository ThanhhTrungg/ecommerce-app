import Api from "./Api"

const url = "/product"

export const createProduct = (productCode, selectOption, productName, productDes, imgUrl, price) => {
    const body = {
        code: productCode,
        categoryName: selectOption,
        name: productName,
        description: productDes,
        imgUrl: imgUrl,
        price: price,
    }

    return Api.post(`${url}/create`, body)
}

export const listProduct = () => {
    return Api.get(`${url}/list`)
}
