import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import './comicsList.scss';

const ComicsList = () => {
    const { loading, error, getAllComics } = useMarvelService();
    const [comicsList, setComicsList] = useState([])
    const [newLoading, setNewLoading] = useState(false);
    const [offset, setOffset] = useState(50);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        if (!+localStorage.getItem('comicsCount')) {
            localStorage.setItem('comicsCount', 8);
        }
        onRequest(localStorage.getItem('comicsCount'));
    }, []);

    useEffect(() => {
        localStorage.setItem('comicsCount', comicsList.length);
    }, [comicsList]);

    const onRequest = (limit) => {
        getAllComics(offset, limit)
            .then(onComicsLoaded);
    }

    const onComicsLoaded = ({ comics, ended }) => {
        setComicsList(comicsList => [...comicsList, ...comics]);
        setComicsEnded(ended);
        setOffset(offset => offset + comics.length);
        setNewLoading(false);
    }

    const comics = View(comicsList);
    const spinner = loading && !newLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="comics__list">
            {comics}
            {spinner}
            {errorMessage}
            <button
                className="button button__main button__long"
                disabled={newLoading}
                onClick={() => {
                    setNewLoading(true);
                    onRequest(8);
                }}
                style={{ 'display': comicsEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

const View = (comics) => {
    return (
        <ul className="comics__grid">
            {
                comics.map((comic, key) => {
                    const { id, title, thumbnail, price } = comic;
                    return (
                        <li key={key} className="comics__item">
                            <Link to={`/comics/${id}`}>
                                <img style={thumbnail.includes('image_not_available') ? { objectFit: 'contain' } : { objectFit: 'unset' }} src={thumbnail} alt={title} className="comics__item-img" />
                                <div className="comics__item-name">{title}</div>
                                <div className="comics__item-price">{price}</div>
                            </Link>
                        </li>
                    )
                })
            }
        </ul>
    );
}

export default ComicsList;