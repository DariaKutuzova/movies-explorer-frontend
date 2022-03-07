import '../App/App.css'
import './Techs.css'

function Techs() {

    return (
        <div className="techs app__container">
            <h2 className="techs__header">Технологии</h2>
            <div className="techs__container">
                <h3 className="techs__container-header">7 технологий</h3>
                <p className="techs__container-description">
                    На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <div className="techs__container-badges">
                    <div className="techs__badge">HTML</div>
                    <div className="techs__badge">CSS</div>
                    <div className="techs__badge">JS</div>
                    <div className="techs__badge">React</div>
                    <div className="techs__badge">Git</div>
                    <div className="techs__badge">Express.js</div>
                    <div className="techs__badge">MongoDB</div>
                </div>
            </div>
        </div>
    );
}

export default Techs;
