export const getToken = () => {
    return localStorage.getItem('token') || null ;
}



export const getRole = () => {
    return localStorage.getItem('role') || null ;
}


