// react-dependencies
import { useState, useEffect, useTransition, useContext } from 'react'
import { useParams } from 'react-router-dom'

// project-component's imports
import { getOneCard } from '../../data/getDataCards'
import { Preloader } from '../../data/Preloader'

import { CartContext } from '../../context/Context'
import { useLocalStorage } from '../../hooks/useLocalStorage'

// project's styles/img
import './oneCard.scss'



export const OneCard = () => {

    const { id } = useParams()
    const [oneCardData, setOneCardData] = useState(0)
    const [oneCardsPending, setOneCardTransition] = useTransition()

    useEffect(() => {
        setOneCardTransition( () => getOneCard(id)
            .then(
                response => setOneCardData(response.data)
            )
            .catch(
                error => alert(error.status)
            ))
    }, [])
    
    // отображение кол-ва добавленного в корзину / добавление в корзину
    const {cartMain, addToCart} = useContext(CartContext)

    // функция для записи в localStorage - передаём в неё id элемента, и этот элемент добавляется
    const [setStorage] = useLocalStorage()


    const oneCardArray = Array.from(oneCardData)
    const oneCard = oneCardArray.map((card) => {
        let [img, title, info, price, id] = [card.img, card.title, card.info, card.price, card.id]
        const cardCount = cartMain[id]
        return(
            oneCardsPending ? <Preloader /> :
                    <div className="one-card__block" key={id}>
                        <div className="one-card__img">
                            <img src={'/' + img} alt="" />
                        </div>
                        <div className="one-card__info">
                            <h2>{title}</h2>
                            <h3>{price}</h3>
                            <p>{info}</p>

                            <a href="#!" className="one-card__btn btn" onClick={() => {
                                addToCart(id)
                                setStorage(id)
                            }}>
                                ADD
                                {cardCount > 0  &&  <span className='card__li-count'>({cardCount})</span>}
                            </a>
                        </div>
                    </div>
        )
    })


    return(
        <section className='one-card'>
            <div className="container">
                <div className="one-card__body">

                    {oneCard}

                </div>
            </div>
        </section>
    )
}