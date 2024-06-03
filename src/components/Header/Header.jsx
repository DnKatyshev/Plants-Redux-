// react-dependencies
import { useEffect, useRef } from "react";
import { NavLink, useSearchParams } from "react-router-dom"

// project-component's imports

// project's styles/img
import './header.scss';
import logo from './resource/logo.png';


const Header = ({setFilterCardsText, startTitleTransition}) => {

    const magnifyRef = useRef(0)
    useEffect(() => {
        // --- magnify ---
        document.querySelector('.search-btn').addEventListener('click', (e) => {
            document.querySelector('.search-txt').classList.toggle('active')
            document.querySelector('.search-wrapper').classList.toggle('active')
            magnifyRef.current.focus()
        })
    }, [])

    const [searchFieldParams, setSearchFieldParams] = useSearchParams()
    

    // Функция фильтрации карточек
    function filterCards(text){
        startTitleTransition(() => setFilterCardsText(() => text))
        setSearchFieldParams(text)
    }


    return(
        <header className="header">
            <div className="container">
                <div className="header__menu">

                <div className="header__left">
                    <div className="logo">
                        <img src={logo} alt="" />
                        <span>Planto.</span>
                    </div>


                    <nav className="header__nav">
                        <ul className="header__nav-list">
                            <li className="header__nav-li"><NavLink to="/">Home</NavLink></li>
                            <li className="header__nav-li"><NavLink to="/all-cards">Cards</NavLink></li>
                            <li className="header__nav-li"><NavLink to="/more">More</NavLink></li>
                        </ul>
                    </nav>
                </div>

                <div className="header__options">
                    <div className="search-box">
                        <a className="search-btn" href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} fill="#fff" version="1.1" viewBox="0 0 488.4 488.4">
                                <g>
                                    <g>
                                        <path d="M0,203.25c0,112.1,91.2,203.2,203.2,203.2c51.6,0,98.8-19.4,134.7-51.2l129.5,129.5c2.4,2.4,5.5,3.6,8.7,3.6    s6.3-1.2,8.7-3.6c4.8-4.8,4.8-12.5,0-17.3l-129.6-129.5c31.8-35.9,51.2-83,51.2-134.7c0-112.1-91.2-203.2-203.2-203.2    S0,91.15,0,203.25z M381.9,203.25c0,98.5-80.2,178.7-178.7,178.7s-178.7-80.2-178.7-178.7s80.2-178.7,178.7-178.7    S381.9,104.65,381.9,203.25z"/>
                                    </g>
                                </g>
                            </svg>
                        </a>
                        <input className="search-txt" type="text" name="" ref={magnifyRef} onChange={(e) => filterCards(e.target.value)}  />
                    </div>
                    

                    <NavLink to='/cart' className="basket">
                        <svg xmlns="http://www.w3.org/2000/svg" width={'32px'} version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 33 33" fill="#fff">
<g>
<path d="M28.313,33H4.688c-0.137,0-0.268-0.056-0.362-0.155c-0.094-0.099-0.144-0.232-0.138-0.369L5.313,8.851   c0.013-0.267,0.232-0.476,0.5-0.476h21.375c0.267,0,0.487,0.209,0.5,0.476l1.125,23.625c0.006,0.137-0.043,0.27-0.138,0.369   C28.58,32.944,28.449,33,28.313,33z M5.212,32h22.576L26.711,9.375H6.289L5.212,32z"/>
<path d="M21.905,11.375c-0.276,0-0.5-0.224-0.5-0.5v-4.97C21.405,3.201,19.205,1,16.5,1s-4.905,2.201-4.905,4.905v4.97   c0,0.276-0.224,0.5-0.5,0.5s-0.5-0.224-0.5-0.5v-4.97C10.595,2.649,13.244,0,16.5,0s5.905,2.649,5.905,5.905v4.97   C22.405,11.151,22.182,11.375,21.905,11.375z"/>
</g>
                        </svg>
                    </NavLink>

                </div>


                </div>
            </div>

            <span className="search-wrapper"></span>
        </header>
    )
}

export default Header;
