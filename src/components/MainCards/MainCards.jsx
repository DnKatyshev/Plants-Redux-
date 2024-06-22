// react-dependencies
import { useState, useEffect, useTransition, useContext } from "react"
import { NavLink } from "react-router-dom"
import axios from "axios" // для подгрузки карточек

// redux-dependencies
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from "../../store/mainSlice"; // 1 из action-ов. Их мы диспатчим. А state(через useSelector) читаем из reducer-ов
import { useGetMainDataCardsQuery } from "../../store/createApi";

// project-component's imports

// CONTEXT
import { Context } from "../../context/Context"

// project's styles/img
import { Preloader } from "../../data/Preloader"


export const MainCards = () => {

    const [cards, setCards] = useState(0)
    const [isPending, setTransition] = useTransition()

    const {
        data,
        isSuccess
    } = useGetMainDataCardsQuery()

    useEffect(() => {
        if(isSuccess){
            setTransition(() => setCards(data))
        }
    }, [data])

    
    // Подгрузка карточек
    const [count, getCount] = useState(6)
    function getAdditionalCards(){
      setTransition( () => {
        return axios({
            url: `http://localhost:3000/cards?_limit=${count + 3}`,
        }).then(
            response => setCards(response.data)
        ).then(
            getCount(() => count + 3)
        ).catch(
            error => alert(error.status)
        )}
      )
    }

    // отображение кол-ва добавленного в корзину / добавление в корзину
    const {favoritesMain, addToFavorites} = useContext(Context)

    // dispatch / state ДОБАВЛЕНИЯ В КОРЗИНУ
    const dispatch = useDispatch()
    const {cartObject} = useSelector(state => state.reducer)  // объект 1-0, 2-0, 3-1 - State КОРЗИНЫ, выраженный через reducer из configureStore


    const arrayData = Array.from(cards)
    const readyCards = arrayData.map((card) => {
        let [img, title, info, price, country, id] = [card.img, card.title, card.info, card.price, card.made, card.id]
        return(
            isPending ? <Preloader /> :
                <li 
                    className="card__li"
                    key={id}
                    >
                        <img src={img} alt="" />
                    <NavLink to={`/one-card/${id}`} className="card__title">
                        {title}
                    </NavLink>
                        <span className="card__made">{'('+country+')'}</span>
                        <p>{info}</p>
                        <div className="card__li-options">
                            <span className="card__price">{price}$</span>
                            <a href="#!" className="card__basket btn" onClick={() => {
                                dispatch(addToCart(id))
                            }}>
                                <svg width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#fff">
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
    })

    return(
        <ul className="cards__list">

            {readyCards}

            <button className="cards__loading-btn btn" onClick={() => getAdditionalCards()}>
                Download more
            </button>
        </ul>
    )
}