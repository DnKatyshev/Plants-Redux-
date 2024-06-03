import axios from "axios"


export const getMainDataCards = () => {

    return axios({
        url: 'http://localhost:3000/cards?_limit=6',
      })
}


export const getPageDataCards = () => {

    return axios({
        url: 'http://localhost:3000/cards',
      })
}


export const getOneCard = (id) => {

    return axios({
      url: `http://localhost:3000/cards?id=${id}`
    })
}
