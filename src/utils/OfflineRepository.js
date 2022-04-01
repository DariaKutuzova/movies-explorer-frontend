function withCache(key, method){
    return method()
        .then((data) => {
            localStorage.setItem(key, JSON.stringify(data))
            return Promise.resolve(data)
        })
        .catch((error) => {
            let localData = localStorage.getItem(key)
            if (localData)
                return Promise.resolve(JSON.parse(localData))
            return Promise.reject(error)
        })
}

export default withCache;
