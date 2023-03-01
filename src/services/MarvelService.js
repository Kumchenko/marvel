import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { loading, request, error } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=617e2d38a316c4ce64d877fad420f901';
    const _charOffset = 210;

    const getAllCharacters = async (offset = _charOffset, limit) => {
        const res = await request(`${_apiBase}characters?limit=${limit}&offset=${offset}&${_apiKey}`);
        return {
            chars: res.data.results.map(_transformCharacter),
            ended: res.data.total - res.data.offset <= 9
        };
    }

    const getCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?${_apiKey}`);
        return _transformCharacter(res.data.results[0]);
    }

    const _transformCharacter = (char) => {
        let { id, name, description, thumbnail, urls, comics } = char;
        if (description.length > 218) {
            description = description.slice(0, 218) + '...';
        }
        if (!description) {
            description = "This character is so confidential, that's why we can't find information about him.";
        }
        return {
            id: id,
            name: name,
            description: description,
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            homepage: urls[0].url,
            wiki: urls[1].url,
            comics: comics.items
        }
    }

    return { loading, error, getAllCharacters, getCharacter }
}

export default useMarvelService;