import '../App/App.css'
import './AboutMe.css'
import avatar from '../../images/avatar.jpg'

function AboutMe() {

    return (
        <div className="about-me app__container">
            <h2 className="about-me__header">Технологии</h2>
            <div className="about-me__table">
                <div className="about-me__text">
                    <h3 className="about-me__name">Дарья</h3>
                    <p className="about-me__age">Фронтенд-разработчик, 27 лет</p>
                    <p className="about-me__about">
                        Всем привет! Меня зовут Даша. Решила сменить область с медицины на веб-разработку и оканчила
                        курс по
                        этой специальности в Яндекс.Практикум. Меня вдохновляет front-end разработка тем, что я могу
                        легко
                        создать что-то полезное и сразу увидеть результат своей работы.
                        Также разработка даёт постоянное развитие мозга и логического мышления. Мне нравится, что
                        сколько бы
                        я не изучила, всё равно каждый день я узнаю новое и интересное.
                    </p>
                    <p className="about-me__about">
                        За время учебы создала большое количество проектов от небольших лендингов до полноценных React
                        приложений, работающих с собственным API.
                        Также отрабатываю базовые алгоритмы на CodeWars.
                    </p>
                    <div className="about-me__links">
                        <a className="about-me__link">GitHub</a>
                        <a className="about-me__link">Telegram</a>
                    </div>
                </div>
                <img src={avatar} alt="Аватар" className="about-me__avatar"/>
            </div>

        </div>
    );
}

export default AboutMe;
