

export const sendSuccess = (message,data) => {
    console.log(message,data)
    return res.status(200).json({
        message : message || 'success',
        data : data
    })
}