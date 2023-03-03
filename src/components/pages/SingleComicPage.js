import { useState, useEffect } from 'react';
import { Link, useParams, useLocation } from 'react-router-dom';
import './singleComicPage.scss';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from "../skeleton/Skeleton";

const SingleComic = () => {
    const {comicId} = useParams();
    const [comic, setComic] = useState(null);

    const { loading, error, getComic } = useMarvelService();

    const comicLoaded = (comic) => {
        setComic(comic);
    }

    const updateComic = () => {
        if (comicId) {
            getComic(comicId)
                .then(comicLoaded);
        }
    }

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const spinner = loading ? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;
    const content = !(!comic || loading || error) ? View(comic) : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
        
    )
}

const View = (comic) => {
    const {id, title, description, thumbnail, language, pages, price} = comic;
    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComic;