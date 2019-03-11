import React, { Components } from 'react'
import ReactDOM from 'react-dom'
import AppRoot from "./Components/AppRoot"
import { AppContainer } from "react-hot-loader"
import Data from "./data/bio"

function render(Components) {
    ReactDOM.render(
        <AppContainer>
            <Components heading = {Data.heading}
                        content = {Data.content}/>
        </AppContainer>,
        document.getElementById("react-root")
    )
}

render(AppRoot)

if (module.hot) {
    module.hot.accept("./components/AppRoot.js", () => {
        const NewAppRoot = 
        require("./components/AppRoot.js").default
        render(NewAppRoot)
    })
}
module.hot.accept();
