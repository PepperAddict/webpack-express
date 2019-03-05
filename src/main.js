
require("./main.css")
require("./style/main.styl")
require("./app")
require("./index.hbs") 

console.log(`Environment is ${process.env.NODE_ENV}`)

const globalvar = true 
const something = function(someArgument) {
    const longVariableName = someArgument 
    const result = function(longVariableName) {
        return longVariableName * longVariableName + globalVar
    }
    console.log(result)
}