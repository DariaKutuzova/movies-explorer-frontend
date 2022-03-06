import {useContext} from 'react';
import './Main.css'
import Promo from '../Promo/Promo';
import NavTab from '../NavTab/NavTab';
import AboutProject from '../AboutProject/AboutProject';
import Techs from '../Techs/Techs';
import AboutMe from '../AboutMe/AboutMe';
import Portfolio from '../Portfolio/Portfolio';
// import {CurrentUserContext} from "../contexts/CurrentUserContext";

function Main({onEditProfile, onAddPlace, onEditAvatar, onCardClick, cards, onCardLike, onCardDelete}) {

    //Подписываемся на контекст
    // const currentUser = useContext(CurrentUserContext);


    return (
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
    );
}

export default Main;
