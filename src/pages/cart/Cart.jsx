// react-dependencies
import { useState, useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import ReCAPTCHA from "react-google-recaptcha"
import { motion } from "framer-motion"

// redux-dependencies
import { useDispatch, useSelector } from "react-redux"
import { getTotalPrice } from "../../store/mainSlice"

// CONTEXT
import { Context } from "../../context/Context"

// project-component's imports
import { CartItem } from "../../components/CartItem/CartItem"  // 1 item в корзине
import { cartData } from "../../context/cartData" // статичный массив объектов карточек

// project's styles/img
import './cart.scss'


export const Cart = () => {

    console.log(useSelector(state => state.reducer))

    // Достаём из reducer-а наши State-ы  -  Общий Объект товаров / total price
    const {cartObject} = useSelector(state => state.reducer)
    const {totalPrice} = useSelector(state => state.reducer)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getTotalPrice())
    }, [cartObject])


    const {
        register,
        handleSubmit,
        reset,
        formState: {errors}
    } = useForm({mode: 'onBlur'})

    const onSubmit = (data) => {
        console.log(data)
        reset()
    }


    // делаем переадресацию на главную страницу, если корзина пуста
    let sum = 0;
    for(let i in cartObject){
        sum += cartObject[i]
    }
    const navigate = useNavigate()

    useEffect(() => {
        if(sum == 0){
            setTimeout(() => {
                navigate('/', {replace: false})
            }, 3500)
        }
    }, [sum])


    // объявляем функцию подсчёта всей стоимости


    const [captchaFlag, setCaptchaFlag] = useState(true)
    function onChange() {
        setCaptchaFlag(false)
    }
    

    return(

        sum == 0
                    ?
        <motion.main
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <h2 className="cart-empty-title">
                Your cart is empty! We'll take you to the main page...
            </h2>            
        </motion.main>
                    :
        <motion.main
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
            transition={{duration: 2, type: "spring"}}
        >
            <section className="cart">
                <div className="container">
                    <div className="cart__body">

                        <h1 className="section-title">Cart</h1>

                        <ul className="cart__list">
                            {
                                cartData.map((card) => {
                                    if (cartObject[card.id] !== 0){
                                        return <CartItem data={card}/>
                                    }
                                })
                            }
                        </ul>

                        {totalPrice > 0  ?  <h1 className="total-price">{totalPrice}$</h1>  :  null}

                        <form id="form" className="form" method="post" onSubmit={handleSubmit(onSubmit)}
                              style={{marginTop: "60px"}}>

                            <div className="form__group">
                                <label htmlFor="input-1" className="form__label">Your name</label>
                                <input className="form__input" id="input-1" type="text" placeholder="Your name"
                                    {
                                        ...register('name', {
                                            required: 'Write your name, please',
                                            minLength: {
                                                value: 2,
                                                message: 'At least 2 charackters!'
                                            }
                                        })
                                    }
                                />
                                {errors?.name && <span className="form__error">{errors?.name?.message}</span>}
                                
                            </div>


                            <div className="form__group">
                                <label htmlFor="input-2" className="form__label">Your email</label>
                                <input className="form__input" id="input-2" type="email" placeholder="Your email"
                                    {
                                        ...register('email', {
                                            required: 'Write your email, please',
                                            pattern: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/,
                                        })
                                    }
                                />
                                {errors?.email && <span className="form__error">{errors?.email?.message}</span>}
                            </div>

                            <ReCAPTCHA
                                sitekey="6Lf62PgpAAAAAFWynmojRIjYayGYdjrO2dU5eEGm"
                                onChange={onChange}
                                className="recaptcha"
                                style={{display: "block",
                                        margin: "0 auto"
                                }}
                            />

                            <button className="form__btn btn" type="submit" disabled={captchaFlag}>BUY</button>
                        </form>

                    </div>
                </div>
            </section>
        </motion.main>
    )
} 