import './AboutProject.css'
import '../App/App.css'

function AboutProject() {

    return (
        <div className="about-project app__container">
            <h2 className="about-project__header">О проекте</h2>
            <div className="about-project__table">
                <h3 className="about-project__table-header" id='h1'>Дипломный проект включал 5 этапов</h3>
                <h3 className="about-project__table-header" id='h2'>На выполнение диплома ушло 5 недель</h3>
                <p className="about-project__table-description" id='p1'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="about-project__table-description" id='p2'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about-project__weeks">
                <div className="about-project__weeks-back">1 неделя</div>
                <div className="about-project__weeks-front">4 недели</div>
                <p className="about-project__weeks-description">Back-end</p>
                <p className="about-project__weeks-description">Front-end</p>
            </div>
        </div>
    );
}

export default AboutProject;
