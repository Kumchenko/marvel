import { useHttp } from "../hooks/http.hook";

const useMarvelService = () => {

    const { loading, request, error } = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apiKey = 'apikey=617e2d38a316c4ce64d877fad420f901';
    const _charsOffset = 210;
    const _comicsOffset = 50;

    const getAllComics = async (offset = _comicsOffset, limit) => {
        const res = await request(`${_apiBase}comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&${_apiKey}`);
        return {
            comics: res.data.results.map(_transformComic),
            ended: res.data.total - res.data.offset <= 8
        };
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?${_apiKey}`);
        return _transformComic(res.data.results[0]);
    }

    const getAllCharacters = async (offset = _charsOffset, limit) => {
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

    const _transformComic = (comic) => {
        let { description, thumbnail, prices, pageCount, textObjects } = comic;
        return {
            ...comic,
            description: description ? description : 'There is no description',
            thumbnail: `${thumbnail.path}.${thumbnail.extension}`,
            price: prices[0].price ? `${prices[0].price}$` : 'Not available',
            pages: pageCount ? `${pageCount} pages` : 'No info about pages',
            language: textObjects[0] ? textObjects[0].language : 'en-us'
        }
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

    return { loading, error, getAllComics, getComic, getAllCharacters, getCharacter }
}

export default useMarvelService;