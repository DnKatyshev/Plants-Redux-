// react-dependencies
import { NavLink } from "react-router-dom"

// project-component's imports

// project's styles/img
import './footer.scss'
import logo from './resource/logo.png';


const Footer = () => {


    return(
        <footer className="footer">
            <div className="container">
                <div className="footer__body">

                    <div className="logo">
                        <img src={logo} alt="" />
                        <span>Planto.</span>
                    </div>


                    <ul className="footer__list">
                        <li className="header__nav-li"><NavLink to='/'>Home</NavLink></li>
                        <li className="footer__li"><NavLink to='/all-cards'>Cards</NavLink></li>
                        <li className="header__nav-li"><NavLink to='/more'>More</NavLink></li>
                    </ul>


                    <p className="author">powered by @DanilaKatyshev</p>

                </div>
            </div>
        </footer>
    )
}

export default Footer;