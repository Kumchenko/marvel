

class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apiKey = 'apikey=617e2d38a316c4ce64d877fad420f901';
    getResource = async (url) => {
        const res = await fetch(url);
    
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
    
        return await res.json();
    }
    
    postResource = async (url, data) => {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: data
        });
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`${this._apiBase}characters?limit=9&offset=210&${this._apiKey}`);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        const res = await this.getResource(`${this._apiBase}characters/${id}?${this._apiKey}`);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        let { name, description, thumbnail, urls } = char;
        if (description.length > 231) {
            description = description.slice(0, 228) + '...';
        }
        if (!description) {
            description = "This character is so confidential, that's why we can't find information about him.";
        }
        return {
            name: name,
            description: description,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            homepage: urls[0].url,
            wiki: urls[1].url
        }
    }
}

export default MarvelService;