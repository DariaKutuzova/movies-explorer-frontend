import api from "./MoviesApi";


class MainApi{
    constructor(config) {
        this._url = config.url;
        this._headers = config.headers;
    }
    // проверка ответа
    _checkResponse(res) {
        if (res.ok){
            return res.json();}
        return Promise.reject(res)
    }

    _getHeaders() {
        const jwt = localStorage.getItem("jwt");
        return {
            "Authorization" : `Bearer ${jwt}`,
            ...this._headers
        }
    }

    //Получение всех сохраненных фильмов
    getAllMovies() {
        return fetch(`${this._url}/movies/`, {
            method: 'GET',
            headers: this._getHeaders()
        })
            .then(this._checkResponse)
    }
    //Добавление фильма
    saveMovie(data) {
        console.log(data)
        let image = this.prepareImage(data.image);
        let thumbnail = data.thumbnail ? this.prepareImage(data.thumbnail) : image;
        return fetch(`${this._url}/movies`, {
            method: 'POST',
            headers: this._getHeaders(),
            body: JSON.stringify({
                country: data.country,
                director: data.director,
                duration: data.duration,
                year: data.year,
                description: data.description,
                movieId: data.movieId,
                image: image.url,
                trailerLink: data.trailerLink,
                thumbnail: thumbnail.url,
                nameRU: data.nameRU,
                nameEN: data.nameEN ? data.nameEN : data.nameRU,
            })
        })
            .then(this._checkResponse);
    }

    //Удалить фильм
    deleteMovie(id) {
        return fetch(`${this._url}/movies/${id}`, {
            method: "DELETE",
            headers: this._getHeaders(),
        }).then(this._checkResponse)
    }

//Имя и email с сервера
    getApiUserInfo() {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: this._getHeaders(),
        })
            .then(this._checkResponse)
    }
//Изменить Имя и email
    patchUserInfo(data) {
        return fetch(`${this._url}/users/me`, {
            method: 'PATCH',
            headers: this._getHeaders(),
            body: JSON.stringify({
                name: data.name,
                email: data.email
            })
        })
            .then(this._checkResponse)
    }

// Регистрация
    register(email, password, name) {
        return fetch(`${this._url}/signup`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password, name})
        })
            .then(this._checkResponse)
    }
    authorize(email, password) {
        return fetch(`${this._url}/signin`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email, password})
        })
            .then(this._checkResponse)
    }

    checkToken(jwt) {
        return fetch(`${this._url}/users/me`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-Type": "application/json",
                "Authorization" : `Bearer ${jwt}`
            }
        })
            .then(this._checkResponse)
    }

    prepareImage(image) {
        return !image.url.startsWith(api.baseUrl) ?
            Object.assign(image, {url: `${api.baseUrl}${image.url}`}) :
            image;
    }
}

//Экземпляр API
const mainApi = new MainApi({
    url: "https://api.movies.kd.nomoredomains.work",
    // url: "http://localhost:3001/",
    headers: {
        "content-type": "application/json"
    }
});

export default mainApi;
