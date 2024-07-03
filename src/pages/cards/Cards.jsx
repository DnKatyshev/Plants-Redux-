// react-dependencies
import { useState, useEffect, useTransition, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

// redux-dependencies
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../store/mainSlice"; // 1 из action-ов. Их мы диспатчим. А state(через useSelector) читаем из reducer-ов

// API-edpoints-HOOK'S (RTK-Query)
import { useGetPageDataCardsQuery, useSortCardsByCountry__NorwayQuery, useSortCardsByCountry__ThailandQuery, useSortCardsByPrice__IncQuery, useSortCardsByPrice__DecQuery } from '../../store/createApi';

// project-component's imports
import { Preloader } from '../../data/Preloader'

// CONTEXT
import { Context } from '../../context/Context'

// project's styles/img
import './cards.scss'
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';



export const Cards = ({isTitlePending}) => {

    // state текста из ПОИСКА , выраженный через reducer из configureStore
    const {filterCardsText} = useSelector(state => state.reducer)

    // dispatch / state ДОБАВЛЕНИЯ В КОРЗИНУ
    const dispatch = useDispatch()
    const {cartObject} = useSelector(state => state.reducer)  // объект 1-0, 2-0, 3-1 - State КОРЗИНЫ, выраженный через reducer из configureStore


    // получение ВСЕХ карточек по запросу ЧЕРЕЗ RTK-ХУКИ
    const [allCards, setAllCards] = useState(0)
    const [allCardsPending, setAllCardsTransition] = useTransition()

    // ИЗВЛЕКАЕМ data и состояния запроса ИЗ RTK-ХУКОВ:
    const {
        data: pageCards=[],
        isSuccess,
    } = useGetPageDataCardsQuery()

    const {
        data: cardsFilterInc=[],
    } = useSortCardsByPrice__IncQuery()

    const {
        data: cardsFilterDec=[],
    } = useSortCardsByPrice__DecQuery()

    const {
        data: cardsFilterNorway=[],
    } = useSortCardsByCountry__NorwayQuery()

    const {
        data: cardsFilterThailand=[],
    } = useSortCardsByCountry__ThailandQuery()
    // ИЗВЛЕКАЕМ data и состояния запроса ИЗ RTK-ХУКОВ:


    useEffect( () => {
        if(isSuccess){
            setAllCardsTransition(() => setAllCards(pageCards))
        }
    }, [pageCards])


    // state и функция его изменения для MUI-менюшки
    const [open, setOpen] = useState(false)
    function openFlag(){
        setOpen(!open)
    }

    
    // ФУНКЦИИ СОРТИРОВКИ:
    const sortInc = () => {   // 1)СОРТИРОВКА по возрастанию через ЗАПРОС
        setAllCardsTransition( () => setAllCards(cardsFilterInc) )
    }
    const sortDec = () => {   // 2)СОРТИРОВКА по убыванию через ЗАПРОС
        setAllCardsTransition( () => setAllCards(cardsFilterDec) )
    }
    const sortByNorway = () => {   // 3)СОРТИРОВКА по стране через ЗАПРОС
        setAllCardsTransition( () => setAllCards(cardsFilterNorway) )
    }
    const sortByThailand = () => {   // 4)СОРТИРОВКА по стране через ЗАПРОС
        setAllCardsTransition( () => setAllCards(cardsFilterThailand) )
    }
    const noSort = () => {   // 5) БЕЗ СОРТИРОВКИ
        setAllCards(pageCards)
    }


    // отображение кол-ва добавленного в Избранное / добавление в Избранное  -  КОРЗИНУ Я СДЕЛАЛ ЧЕРЕЗ Reducer-ы / ИЗБРАННОЕ сделал через Context
    const {favoritesMain, addToFavorites} = useContext(Context)
    

    const cardsArray = Array.from(allCards)
    // const cardsArray__SORT_INC = cardsArray.sort((a,b) => a.price - b.price)  ЭТО СОРТИРОВКА НА Front-e, методом .sort()
    // const cardsArray__SORT_DEC = cardsArray.sort((a,b) => b.price - a.price)  Но мы делаем сортировку на беке, через запросы(json-server)
    const allCardsData = cardsArray.map((card) => {
        let [img, title, info, price, country, id] = [card.img, card.title, card.info, card.price, card.made, card.id]

        if(!filterCardsText){
            return(
                    <li 
                        className="cards__li"
                        key={id}
                        >
                            <img src={img} alt="" />
                        <NavLink to={`/one-card/${id}`} className="cards__title">
                            {title}
                        </NavLink>
                            <span className="card__made">{'('+country+')'}</span>
                            <p>{info}</p>
                            <div className="card__li-options">
                                <span className="cards__price">{price}$</span>
                                <a href="#!" className="card__basket btn" onClick={() => {
                                    dispatch(addToCart(id))
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#fff">
                                        <g>
                                        <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                        <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                        </g>
                                    </svg>
                                    {cartObject[id] > 0  &&  <span className='card__li-count'>({cartObject[id]})</span>}
                                </a>
                            </div>
                            <svg height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px"
                            onClick={() => {
                                    addToFavorites(id)
                                }}
                                className='heart'
                            >
                                <path d="M429.9,95.6c-40.4-42.1-106-42.1-146.4,0L256,124.1l-27.5-28.6c-40.5-42.1-106-42.1-146.4,0c-45.5,47.3-45.5,124.1,0,171.4 L256,448l173.9-181C475.4,219.7,475.4,142.9,429.9,95.6z" fill={favoritesMain[id] > 0 ? 'red' : 'transparent'} stroke={favoritesMain[id] > 0 ? null : '#5acf62'} strokeWidth='7px'/>
                            </svg>
                    </li>
            )
        } else{
            if(title.toLowerCase().includes(filterCardsText.toLowerCase())){
                return(
                    <li 
                        className="cards__li"
                        key={id}
                        >
                            <img src={img} alt="" />
                        <NavLink to={`/one-card/${id}`} className="cards__title">
                            {title}
                        </NavLink>
                            <span className="card__made">{'('+country+')'}</span>
                            <p>{info}</p>
                            <div className="card__li-options">
                                <span className="cards__price">{price}$</span>
                                <a href="#!" className="card__basket btn" onClick={() => {
                                    dispatch(addToCart(id))
                                }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#fff">
                                        <g>
                                        <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                        <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                        </g>
                                    </svg>
                                    {cartObject[id] > 0  &&  <span className='card__li-count'>({cartObject[id]})</span>}
                                </a>
                            </div>
                            <svg height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px"
                            onClick={() => {
                                addToFavorites(id)
                                }}
                                className='heart'
                            >
                                <path d="M429.9,95.6c-40.4-42.1-106-42.1-146.4,0L256,124.1l-27.5-28.6c-40.5-42.1-106-42.1-146.4,0c-45.5,47.3-45.5,124.1,0,171.4 L256,448l173.9-181C475.4,219.7,475.4,142.9,429.9,95.6z" fill={favoritesMain[id] > 0 ? 'red' : 'transparent'} stroke={favoritesMain[id] > 0 ? null : '#5acf62'} strokeWidth='7px'/>
                            </svg>
                    </li>
                )
            }
        }

    })


    return(
        allCardsPending
                        ?
        <Preloader />
                        :
        isTitlePending 
                        ?
        <Preloader />   
                        :
        <motion.main className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <section className="all-cards">
                <div className="container">
                    <div className="all-cards__body">
                        <h1 className="section-title">Our ALL plants</h1>
                        <div className='filters'>
                            <Button
                                className='filters__btn'
                                onClick={openFlag}
                            >
                                <svg fill="none" height="50" viewBox="0 0 28 28" width="50" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M4.40675 7.25H3C2.44772 7.25 2 6.80228 2 6.25C2 5.69772 2.44772 5.25 3 5.25H4.40675C4.82853 3.94437 6.05398 3 7.5 3C8.94602 3 10.1715 3.94437 10.5933 5.25H25C25.5523 5.25 26 5.69772 26 6.25C26 6.80228 25.5523 7.25 25 7.25H10.5933C10.1715 8.55563 8.94602 9.5 7.5 9.5C6.05398 9.5 4.82853 8.55563 4.40675 7.25ZM5.75 6.25C5.75 5.2835 6.5335 4.5 7.5 4.5C8.4665 4.5 9.25 5.2835 9.25 6.25C9.25 7.2165 8.4665 8 7.5 8C6.5335 8 5.75 7.2165 5.75 6.25Z" fill="#ffcbcb" fill-rule="evenodd"/><path clip-rule="evenodd" d="M3 15.25H17.4458C17.8676 16.5556 19.093 17.5 20.5391 17.5C21.9851 17.5 23.2105 16.5556 23.6323 15.25H25C25.5523 15.25 26 14.8023 26 14.25C26 13.6977 25.5523 13.25 25 13.25H23.6323C23.2105 11.9444 21.9851 11 20.5391 11C19.093 11 17.8676 11.9444 17.4458 13.25H3C2.44772 13.25 2 13.6977 2 14.25C2 14.8023 2.44772 15.25 3 15.25ZM20.5391 12.5C19.5726 12.5 18.7891 13.2835 18.7891 14.25C18.7891 15.2165 19.5726 16 20.5391 16C21.5056 16 22.2891 15.2165 22.2891 14.25C22.2891 13.2835 21.5056 12.5 20.5391 12.5Z" fill="#ffcbcb" fill-rule="evenodd"/><path clip-rule="evenodd" d="M10.4067 23.25H3C2.44772 23.25 2 22.8023 2 22.25C2 21.6977 2.44772 21.25 3 21.25H10.4067C10.8285 19.9444 12.054 19 13.5 19C14.946 19 16.1715 19.9444 16.5933 21.25H25C25.5523 21.25 26 21.6977 26 22.25C26 22.8023 25.5523 23.25 25 23.25H16.5933C16.1715 24.5556 14.946 25.5 13.5 25.5C12.054 25.5 10.8285 24.5556 10.4067 23.25ZM11.75 22.25C11.75 21.2835 12.5335 20.5 13.5 20.5C14.4665 20.5 15.25 21.2835 15.25 22.25C15.25 23.2165 14.4665 24 13.5 24C12.5335 24 11.75 23.2165 11.75 22.25Z" fill="#ffcbcb"/></svg>
                            </Button>
                            <Menu
                                className='filters__menu'
                                open={open}
                                onClick={openFlag}
                            >
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        sortInc()
                                    }} 
                                    className='filters__item'>
                                    By price(ascending)
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        sortDec()
                                    }} 
                                    className='filters__item'>
                                    By price(decreasing)
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        sortByNorway()
                                    }} 
                                    className='filters__item'>
                                    Grown(Norway)
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        sortByThailand()
                                    }} 
                                    className='filters__item'>
                                    Grown(Thailand)
                                </MenuItem>
                                <MenuItem 
                                    onClick={() => {
                                        openFlag()
                                        noSort()
                                    }} 
                                    className='filters__item'>
                                    All
                                </MenuItem>
                            </Menu>
                        </div>
                        <ul className="cards__list-page">
                            {allCardsData}
                        </ul>
                    </div>
                </div>
            </section>
        </motion.main>
    )
}