const priceFormat = (value) =>
    new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        useGrouping: false,
    }).format(value)

export default priceFormat
