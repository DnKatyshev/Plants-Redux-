// import axios from "axios"


// export const getMainDataCards = () => {

//     return axios({
//         url: 'http://localhost:3000/cards?_limit=6',
//       })
// }


// export const getPageDataCards = () => {

//     return axios({
//         url: 'http://localhost:3000/cards',
//       })
// }


// export const getOneCard = (id) => {

//     return axios({
//       url: `http://localhost:3000/cards?id=${id}`          ВМЕСТО ЭТИХ ЗАПРОСОВ В ОТДЕЛЬНОМ ФАЙЛЕ - РАБОТАЕМ СО ВСЕМИ ЗАПРОСАМИ В createApi.jsx на RTK-Query
//     })
// }


// export const sortCardsByPrice__INC = () => {
//   return axios({
//      url: 'http://localhost:3000/cards?_sort=price&_order=asc',
//   })
// }
// export const sortCardsByPrice__DEC = () => {
//     return axios({
//        url: 'http://localhost:3000/cards?_sort=price&_order=desc',
//     })
// }

// export const sortCardsByCountry__Norway = () => {
//   return axios({
//      url: 'http://localhost:3000/cards?made=Norway',
//   })
// }
// export const sortCardsByCountry__Thailand = () => {
//     return axios({
//        url: 'http://localhost:3000/cards?made=Thailand',
//     })
// }
