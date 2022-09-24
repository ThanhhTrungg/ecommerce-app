import React from "react"
import Loading from "~/components/Loading"

const withLoading = (Component) =>
    function ({ isLoading, ...props }) {
        isLoading ? <Loading /> : <Component {...props} />
    }

export default withLoading
