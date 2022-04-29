class Api {
    constructor(config) {
        this._url = this._url ? config.url : config.baseUrl+'/beatfilm-movies';
        this._headers = config.headers;
        this.baseUrl = config.baseUrl;
    }

    // проверка ответа
    _checkResponse(res) {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject('Произошла ошибка')
    }

    _getHeaders() {
        // const jwt = localStorage.getItem("jwt");
        return {
            // "Authorization": `Bearer ${jwt}`,
            ...this._headers
        }
    }

    //Получение всех карточек с сервера
    getAllMovies() {
        return fetch(`${this._url}`, {
            method: 'GET',
            headers: this._getHeaders()
        })
            .then(this._checkResponse)
    }
}

//Экземпляр API
const api = new Api({
    // url: "https://api.nomoreparties.co/beatfilm-movies",
    baseUrl:"https://api.nomoreparties.co/",
    // url: "http://localhost:3001/",
    headers: {
        "content-type": "application/json"
    }
});

export default api;
