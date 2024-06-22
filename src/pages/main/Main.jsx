// react-dependencies
import { useState, useEffect, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { motion } from 'framer-motion'

// redux-dependencies
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../store/mainSlice"; // 1 из action-ов. Их мы диспатчим. А state(через useSelector) читаем из reducer-ов

// project-component's imports
import { MainCards } from '../../components/MainCards/MainCards'
import { Form } from '../../components/Form/Form'

// CONTEXT
import { Context } from '../../context/Context'

// project's styles/img
import './main.scss'
import layoutPlant from './resource/layout-plant.png'



export const Main = () => {


    // отображение кол-ва добавленного в корзину / добавление в корзину
    const {favoritesMain, addToFavorites} = useContext(Context)

    // dispatch / state ДОБАВЛЕНИЯ В КОРЗИНУ
    const dispatch = useDispatch()
    const {cartObject} = useSelector(state => state.reducer)  // объект 1-0, 2-0, 3-1 - State КОРЗИНЫ, выраженный через reducer из configureStore


    return(
        <motion.main
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            
            <section className="layout">
                <div className="container">

                    <div className="layout__body">

                        <h1 className="layout__title">
                            Our Trendy plants
                        </h1>


                        <div className="layout__example">
                            <div className="layout__example-text">
                                <h3>For Fresh Decs Ai Plat</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p>
                                <span className='layout__example-price'>25$</span>
                                <div className='layout__example-icons'>
                                    <NavLink to='one-card/6' className="layout__btn btn">Explore</NavLink>
                                    <a href="#!" className="layout__btn-basket btn card__basket" onClick={() => {
                                        dispatch(addToCart(6))
                                    }}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#fff">
                                            <g>
                                            <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
                                            <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
                                            </g>
                                        </svg>
                                        {cartObject[6] > 0  &&  <span className='card__li-count'>({cartObject[6]})</span>}
                                    </a>
                                    <svg height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px"
                                        onClick={() => {
                                            addToFavorites(6)
                                         }}
                                         className='heart'
                                    >
                                        <path d="M429.9,95.6c-40.4-42.1-106-42.1-146.4,0L256,124.1l-27.5-28.6c-40.5-42.1-106-42.1-146.4,0c-45.5,47.3-45.5,124.1,0,171.4 L256,448l173.9-181C475.4,219.7,475.4,142.9,429.9,95.6z" fill={favoritesMain[6] > 0 ? 'red' : 'transparent'} stroke={favoritesMain[6] > 0 ? null : '#5acf62'} strokeWidth='7px'/>
                                    </svg>
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


        </motion.main>
    )
} 