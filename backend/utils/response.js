

export const sendSuccess = (message,data ,res) => {
    console.log(message,data)
    return res.status(200).json({
        message : message || 'success',
        data : data
    })
}