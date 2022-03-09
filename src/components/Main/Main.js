import {useContext} from 'react';
import './Main.css'
import '../App/App.css'
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

// import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

    //Подписываемся на контекст
    // const currentUser = useContext(CurrentUserContext);


    return (
        <div>
            <Header/>
            <main className="content">
                <section className="main app__item">
                    <Promo/>
                    <NavTab/>
                    <AboutProject/>
                    <Techs/>
                    <AboutMe/>
                    <Portfolio/>
                </section>
            </main>
            <Footer/>
        </div>
    );
}

export default Main;
