import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import GlobalStyles from "./components/GlobalStyles"
import { Provider } from "react-redux"
import store from "./redux/store"
import { ThemeProvider, createTheme } from "@mui/material/styles"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <React.StrictMode>
        <ThemeProvider
            theme={createTheme({
                breakpoints: {
                    values: {
                        smMobile: 320,
                        mobile: 480,
                        smTablet: 640,
                        tablet: 768,
                        laptop: 1024,
                        desktop: 1240,
                    },
                },
            })}>
            <GlobalStyles>
                <Provider store={store}>
                    <App />
                </Provider>
            </GlobalStyles>
        </ThemeProvider>
    </React.StrictMode>
)
