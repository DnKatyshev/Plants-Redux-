import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3000'}),
    tagTypes: ['products'],

    endpoints: builder => ({

        // QUERY-ЗАПРОСЫ:

        // ЗАПРОСЫ КАРТОЧЕК
        getMainDataCards: builder.query({   // getHeroes - название endpoint-a. Каждый endpoint ВОЗВРАЩАЕТ ХУК, здесь это будет - useGetHeroesQuery()
            query: () => '/cards?_limit=6',
            providesTags: ['products'],
        }),
        getPageDataCards: builder.query({   
            query: () => '/cards',
            providesTags: ['products'],
        }),
        getOneCard: builder.query({   
            query: (id) => `/cards?id=${id}`,
            providesTags: ['products'],
        }),
        
        // ЗАПРОСЫ ДЛЯ ФИЛЬТРАЦИИ КАРТОЧЕК
        sortCardsByPrice__Inc: builder.query({
            query: () => '/cards?_sort=price',
            providesTags: ['products']  // tagTypes / providesTags / invalidatesTags - для управления кешированными данными. При мутации - тут же будет новый query-запрос, который сразу обновит данные. Например - по кнопке мы добавляем нового персонажа, он добавляется в наш серверный файл И ТУТ ЖЕ ПРОИСХОДИТ query-запрос и МЫ СРАЗУ ВИДИМ ЭТОГО НОВОГО ПЕРСОНАЖА БЕЗ ПЕРЕЗАГРУЗКИ СТРАНИЦЫ
        }),
        sortCardsByPrice__Dec: builder.query({
            query: () => `/cards?_sort=-price`,
            providesTags: ['products']
        }),
        sortCardsByCountry__Norway: builder.query({ 
            query: () => '/cards?made=Norway',
            providesTags: ['products']  
        }),
        sortCardsByCountry__Thailand: builder.query({
            query: () => `/cards?made=Thailand`,
            providesTags: ['products']
        })
    })
})

export const {
    useGetMainDataCardsQuery,
    useGetPageDataCardsQuery,
    useGetOneCardQuery,
    useSortCardsByPrice__IncQuery,
    useSortCardsByPrice__DecQuery,
    useSortCardsByCountry__NorwayQuery,
    useSortCardsByCountry__ThailandQuery
} = api
