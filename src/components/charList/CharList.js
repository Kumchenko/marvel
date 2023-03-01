import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

const CharList = (props) => {
    const [charList, setCharList] = useState([]);
    const [newLoading, setNewLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charsEnded, setCharsEnded] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const { loading, error, getAllCharacters } = useMarvelService();

    const onCharsLoaded = ({ chars: newChars, ended }) => {
        setCharList(charList => [...charList, ...newChars]);
        setNewLoading(false);
        setOffset(offset => offset + newChars.length);
        setCharsEnded(ended);
    }

    const renderChars = (charList) => {
        charList = charList.map(char => {
            const { name, thumbnail, id } = char;
            const onCharSelected = (e) => {
                if ((e.key === "Enter" && e.type === "keydown") || e.type === "click") {
                    props.changeSelectedId(id);
                    setActiveId(id);
                }
            }
            return (
                <li
                    className={"char__item" + (activeId === id ? " char__item_selected" : "")}
                    key={id}
                    onKeyDown={onCharSelected}
                    onClick={onCharSelected}
                    tabIndex={0}
                >
                    <img
                        src={thumbnail}
                        alt={`${name} thumbnail`}
                        style={thumbnail.indexOf('image_not_available') > 0 ? { objectFit: 'contain' } : { objectFit: 'cover' }}
                    />
                    <div className="char__name">{name}</div>
                </li>
            )
        });
        return (
            <ul className="char__grid">
                {charList}
            </ul>
        );
    }

    const onRequest = (limit = 9) => {
        getAllCharacters(offset, limit)
            .then(onCharsLoaded);
    }

    useEffect(() => {
        if (!+localStorage.getItem('charsCount')) {
            localStorage.setItem('charsCount', 9);
        }
        onRequest(localStorage.getItem('charsCount'));
    }, []);

    useEffect(() => {
        localStorage.setItem('charsCount', charList.length);
    }, [charList]);

    // window.addEventListener('scroll', this.autoRequest);
    // window.removeEventListener('scroll', this.autoRequest);
    // const autoRequest = () => {
    //     let scrolled = document.documentElement.scrollTop + document.documentElement.clientHeight;
    //     if (scrolled >= document.documentElement.scrollHeight - 20) {
    //         onRequest();
    //     }
    // }

    const content = renderChars(charList);
    const spinner = loading && !newLoading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;

    return (
        <div className="char__list">
            {content}
            {spinner}
            {errorMessage}
            <button
                className="button button__main button__long"
                disabled={newLoading}
                onClick={() => {
                    setNewLoading(true);
                    onRequest(9);
                }}
                style={{ 'display': charsEnded ? 'none' : 'block' }}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    changeSelectedId: PropTypes.func.isRequired
}

export default CharList;