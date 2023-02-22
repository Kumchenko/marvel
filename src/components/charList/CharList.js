import { Component } from 'react';
import PropTypes from 'prop-types';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chars: [],
            loading: true,
            error: false,
            newLoading: false,
            offset: 210,
            charsEnded: false
        }
    }

    marvelService = new MarvelService();

    onCharsLoading = () => {
        this.setState({
            newLoading: true
        })
    }

    onCharsLoaded = ({ chars: newChars, ended }) => {
        this.setState(state => {
            return {
                chars: [...state.chars, ...newChars],
                loading: false,
                error: false,
                newLoading: false,
                offset: state.offset + newChars.length,
                charsEnded: ended
            }
        })
    }

    onError = () => {
        this.setState({
            chars: [],
            error: true,
            loading: false,
            newLoading: false
        })
    }

    renderChars = (chars) => {
        let charList = chars.map(char => {
            const { name, thumbnail, id } = char;
            const changeId = () => { this.props.changeSelectedId(id) }
            return (
                <li
                    className="char__item"
                    key={id}
                    onClick={changeId}
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

    componentDidMount() {
        if (!localStorage.getItem('charsCount')) {
            localStorage.setItem('charsCount', 9);
        }
        this.onRequest(localStorage.getItem('charsCount'));
        //window.addEventListener('scroll', this.autoRequest);
    }

    componentDidUpdate(prevProps, prevState) {
        localStorage.setItem('charsCount', this.state.chars.length)
    }

    componentWillUnmount() {
        //window.removeEventListener('scroll', this.autoRequest);
    }

    autoRequest = () => {
        let scrolled = document.documentElement.scrollTop + document.documentElement.clientHeight;
        if (scrolled >= document.documentElement.scrollHeight - 20) {
            this.onRequest();
        }
    }

    onRequest = (limit = 9) => {
        this.onCharsLoading();
        this.marvelService.getAllCharacters(this.state.offset, limit)
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    render() {
        const { chars, loading, error, newLoading, } = this.state;

        const content = this.renderChars(chars);
        const spinner = loading ? <Spinner /> : null;
        const errorMessage = error ? <ErrorMessage /> : null;

        return (
            <div className="char__list">
                {content}
                {spinner}
                {errorMessage}
                <button
                    className="button button__main button__long"
                    disabled={newLoading}
                    onClick={() => this.onRequest()}
                    style={{ 'display': this.state.charsEnded ? 'none' : 'block' }}
                >
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

CharList.propTypes = {
    changeSelectedId: PropTypes.func.isRequired
}

export default CharList;