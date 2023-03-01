import { useState, useEffect } from 'react';

import './charInfo.scss';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from "../skeleton/Skeleton";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { loading, error, getCharacter } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    }

    useEffect(() => {
        if (props.charId) {
            getCharacter(props.charId)
                .then(onCharLoaded);
        }
    }, [props.charId]);

    const content = char && !loading ? View(char) : null;
    const skeleton = !(loading || char || error) ? <Skeleton /> : null;
    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="char__info">
            {content}
            {skeleton}
            {spinner}
            {errorMessage}
        </div>
    )
}

const View = (char) => {
    const { name, description, thumbnail, homepage, wiki, comics } = char;

    const getComicsElements = (comics) => {
        let result = [];
        for (let i = 0; i < comics.length; i++) {
            if (i < 10) {
                const item = comics[i];
                const elem = (
                    <li key={i} className="char__comics-item">
                        {item.name}
                    </li>
                );
                result.push(elem);
            }
            else {
                break;
            }
        }
        return result;
    }

    return (
        <>
            <div className="char__basics">
                <img
                    src={thumbnail}
                    alt={`${name} thumbnail`}
                    style={thumbnail.indexOf('image_not_available') > 0 ? { objectFit: 'contain' } : { objectFit: 'cover' }}
                />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">{description}</div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length > 0 ? getComicsElements(comics) : 'There is no comics with this character'}
            </ul>
        </>
    )
}

export default CharInfo;