// react-dependencies
import { useState, useRef, useContext } from "react";
import { NavLink, useSearchParams, useLocation } from "react-router-dom"
import { Badge } from "@mui/material";
import { motion, useScroll, useTransform } from "framer-motion";

// Redux-dependencies
import { useDispatch, useSelector } from "react-redux";
import { setFilterCardsText } from "../../store/mainSlice"; // 1 из action-ов. Их мы диспатчим. А state(через useSelector) читаем из reducer-ов

//import { Context } from "../../context/Context";

// project-component's imports
import { listVariants, itemVariants } from "./framerMotionVariants";

// project's styles/img
import './header.scss';
import logo from './resource/logo.png';


const Header = ({ startTitleTransition }) => {

    const { cartObject } = useSelector(state => state.reducer)  // объект 1-0, 2-0, 3-1 - State КОРЗИНЫ, выраженный через reducer из configureStore

    // Взаимодействие с DOM
    const [searchFlag, setSearchFlag] = useState(false)
    const searchRef = useRef()
    function changeSearchFlag() {
        setSearchFlag(() => !searchFlag)
        searchRef.current.focus()
    }


    // Функция фильтрации карточек
    const dispatch = useDispatch()
    const [searchFieldParams, setSearchFieldParams] = useSearchParams()
    function filterCards(text) {
        startTitleTransition(() => dispatch(setFilterCardsText(text)))
        setSearchFieldParams(text)
    }

    // чтобы поиск был только в каталоге
    const location = useLocation()

    // Для бейджа
    let bageSum = 0;
    for (let i in cartObject) {
        bageSum += cartObject[i]
    }

    // Для progress-line - FramerMotion
    const { scrollYProgress } = useScroll()  // является значением от 0 до 1, в зависимости от скролла
    const background = useTransform(
        scrollYProgress,
        [0, 1],
        ['rgba(64, 255, 86, .8)', 'rgba(255, 191, 64, .8)']
    )

    return (
        <header className="header">
            <motion.div
                className="progress-line"
                style={{
                    position: "fixed",
                    top: 0,
                    transformOrigin: 'left',
                    width: "100%",
                    height: "6px",
                    borderRadius: "50px",

                    scaleX: scrollYProgress,
                    background,
                }}
            >
            </motion.div>
            <div className="container">
                <div className="header__menu">

                    <div className="header__left">
                        <motion.div
                            className="logo"
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            <img src={logo} alt="" />
                            <span>Planto.</span>
                        </motion.div>


                        <nav className="header__nav">
                            <motion.ul className="header__nav-list" variants={listVariants} initial={'hidden'} animate={'visible'}>
                                <motion.li className="header__nav-li" variants={itemVariants}><NavLink to="/">Home</NavLink></motion.li>
                                <motion.li className="header__nav-li" variants={itemVariants}><NavLink to="/catalog">Cards</NavLink></motion.li>
                                <motion.li className="header__nav-li" variants={itemVariants}><NavLink to="/more">More</NavLink></motion.li>
                                <motion.li className="header__nav-li" variants={itemVariants}><NavLink to="/favorites">Favorites</NavLink></motion.li>
                            </motion.ul>
                        </nav>
                    </div>

                    <div className="header__options">

                        {
                            location.pathname == '/catalog'
                                ?
                                <div className="search-box">
                                    <a className="search-btn" href="#!" onClick={changeSearchFlag}>
                                        <svg width={'32px'} fill="#fff" version="1.1" viewBox="0 0 488.4 488.4">
                                            <g>
                                                <g>
                                                    <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z" />
                                                </g>
                                            </g>
                                        </svg>
                                    </a>
                                    <input className={searchFlag ? 'search-txt active' : 'search-txt'} type="text" name=""
                                        onChange={(e) => filterCards(e.target.value)}
                                        ref={searchRef}
                                    />
                                </div>
                                :
                                null
                        }

                        <Badge color="secondary" badgeContent={bageSum}>
                            <NavLink to='/cart' className="basket">
                                <svg xmlns="http://www.w3.org/2000/svg" width={'48px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#fff">
                                    <g>
                                        <path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z" />
                                        <path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z" />
                                    </g>
                                </svg>
                            </NavLink>
                        </Badge>

                    </div>


                </div>
            </div>

            <span className="search-wrapper"></span>
        </header>
    )
}

export default Header;
