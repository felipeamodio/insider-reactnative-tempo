import axios from 'axios';

//https://api.hgbrasil.com/weather?key=e1971675&lat=-23.682&lon=-46.875

export const key = 'e1971675';


//axios mostrando qual url não vai se repetir
const api = axios.create({
    baseURL: 'https://api.hgbrasil.com'
})


export default api;