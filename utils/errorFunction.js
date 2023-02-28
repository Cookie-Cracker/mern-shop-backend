const errorFunction = (errorBit, msg, data) => {
    if(errorBit) return {errorBit: errorBit, message: msg}
    else return {errorBit: errorBit, message: msg, data}
}

module.exports = errorFunction