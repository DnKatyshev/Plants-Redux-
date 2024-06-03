// react-dependencies
import { useState, useEffect, useContext } from 'react'

// project-component's imports
import { MainCards } from '../../components/MainCards/MainCards'
import { Form } from '../../components/Form/Form'
import { getPageDataCards } from '../../data/getDataCards'
import { FilterCardsPattern } from './FilterCardsPattern'

import { CartContext } from '../../context/Context'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// project's styles/img
import './main.scss'
import layoutPlant from './resource/layout-plant.png'



export const Main = ({filterCardsText, isTitlePending}) => {
    
    // При вводе каких-либо символов в поиск - происходит новый запрос всех карточек и их фильтрация. Т.е - в поле есть какие-то символы = делай запрос+фильтрацию
    const [filterState, setFilterState] = useState(0)
    useEffect(() => {
        getPageDataCards()
            .then(
                response => setFilterState(response.data)
            )
            .catch(
                error => alert(error.status)
            )
    }, [filterCardsText])


    // отображение кол-ва добавленного в корзину / добавление в корзину
    const {cartMain, addToCart} = useContext(CartContext)

    // функция для записи в localStorage - передаём в неё id элемента, и этот элемент добавляется
    const [setStorage] = useLocalStorage()

    return(
        <main>
            
            <section className="layout">
                <div className="container">

                    {
                        filterCardsText ?
                        
                        
                        <FilterCardsPattern filterState={filterState} filterCardsText={filterCardsText} isTitlePending={isTitlePending} />  // FilterCardsPattern - компонент, обрабатывающий новый запрос при вводе в поиск

                                        : null 

                    }

                    <div className="layout__body">

                        <h1 className="layout__title">
                            Our Trendy plants
                        </h1>


                        <div className="layout__example">
                            <div className="layout__example-text">
                                <h3>For Fresh Decs Ai Plat</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                <span className='layout__example-price'>79$</span>
                                <div className='layout__example-icons'>
                                    <a href="#!" className="layout__btn btn">Explore</a>
                                    <a href="#!" className="layout__btn-basket btn" onClick={() => {
                                        addToCart(6)
                                        setStorage(6)
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#fff">
                                            <g>
                                            <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                            <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                            </g>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                            <img src={layoutPlant} alt="" />
                        </div>

                    </div>

                </div>
            </section>


            <section className="cards">
                <div className="container">
                    <div className="cards__body">

                        <h1 className="cards__title section-title">
                            Our Top Selling
                        </h1>

                        <MainCards />

                    </div>
                </div>
            </section>


            <section className="form-main">
                <div className="container">

                    <h1 className="form__title section-title">
                        Subscribe to our updates!
                    </h1>

                    <Form />

                </div>
            </section>


        </main>
    )
} 