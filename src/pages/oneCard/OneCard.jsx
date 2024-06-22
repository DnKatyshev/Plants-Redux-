// react-dependencies
import { useState, useEffect, useTransition, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { motion } from 'framer-motion'

// redux-dependencies
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../store/mainSlice"; // 1 из action-ов. Их мы диспатчим. А state(через useSelector) читаем из reducer-ов
import { useGetOneCardQuery } from "../../store/createApi";

// CONTEXT
import { Context } from '../../context/Context'

// project-component's imports
import { Preloader } from '../../data/Preloader'

// project's styles/img
import './oneCard.scss'



export const OneCard = () => {

    // dispatch / state ДОБАВЛЕНИЯ В КОРЗИНУ
    const dispatch = useDispatch()
    const {cartObject} = useSelector(state => state.reducer)  // объект 1-0, 2-0, 3-1 - State КОРЗИНЫ, выраженный через reducer из configureStore


    // Запрос к нужной карточке по ID ЧЕРЕЗ action RTK-QUERY
    const { id } = useParams()
    const [oneCardData, setOneCardData] = useState(0)
    const [oneCardsPending, setOneCardTransition] = useTransition()

    const {
        data,
        isSuccess
    } = useGetOneCardQuery(id)

    useEffect(() => {
        setOneCardTransition( () => {
                if(isSuccess){
                    setOneCardData(data) 
                }
            }
        )
    }, [data])
    
    // отображение кол-ва добавленного в Избранное / добавление в Избранное  -  КОРЗИНУ Я СДЕЛАЛ ЧЕРЕЗ Reducer-ы / ИЗБРАННОЕ сделал через Context
    const {favoritesMain, addToFavorites} = useContext(Context)

    const oneCardArray = Array.from(oneCardData)
    const oneCard = oneCardArray.map((card) => {
        let [img, title, info, price, country, id] = [card.img, card.title, card.info, card.price, card.made, card.id]
        return(
            oneCardsPending ? <Preloader /> :
                    <div className="one-card__block" key={id}>
                        <div className="one-card__img">
                            <img src={'/' + img} alt="" />
                        </div>
                        <div className="one-card__info">
                            <h2>{title}</h2>
                            <span className="card__made">{'('+country+')'}</span>
                            <h3>{price}$</h3>
                            <p>{info}</p>

                            <a href="#!" className="one-card__btn btn card__basket" onClick={() => {
                                dispatch(addToCart(id))
                            }}>
                                ADD
                                {cartObject[id] > 0  &&  <span className='card__li-count'>({cartObject[id]})</span>}
                            </a>
                            <svg height="64px" id="Layer_1" version="1.1" viewBox="0 0 512 512" width="64px"
                            onClick={() => {
                                addToFavorites(id)
                                }}
                                className='heart'
                            >
                                <path d="M429.9,95.6c-40.4-42.1-106-42.1-146.4,0L256,124.1l-27.5-28.6c-40.5-42.1-106-42.1-146.4,0c-45.5,47.3-45.5,124.1,0,171.4 L256,448l173.9-181C475.4,219.7,475.4,142.9,429.9,95.6z" fill={favoritesMain[id] > 0 ? 'red' : 'transparent'} stroke={favoritesMain[id] > 0 ? null : '#5acf62'} strokeWidth='7px'/>
                            </svg>
                        </div>
                    </div>
        )
    })


    return(
        <motion.main className="main"
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <section className='one-card'>
                <div className="container">
                    <div className="one-card__body">

                        {oneCard}

                    </div>
                </div>
            </section>
        </motion.main>
    )
}