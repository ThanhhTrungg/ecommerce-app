import React from "react"
import { PaymentInputsWrapper, usePaymentInputs } from "react-payment-inputs"
import images from "react-payment-inputs/images"
const PaymentInputs = () => {
    const { wrapperProps, getCardImageProps, getCardNumberProps, getExpiryDateProps, getCVCProps } = usePaymentInputs()
    return (
        <PaymentInputsWrapper {...wrapperProps}>
            <svg {...getCardImageProps({ images })} />
            <input {...getCardNumberProps()} autoComplete="cc-number" />
            <input {...getExpiryDateProps()} />
            <input {...getCVCProps()} />
        </PaymentInputsWrapper>
    )
}

export default PaymentInputs
