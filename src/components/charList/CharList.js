import { Component } from 'react';

import MarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './charList.scss';

class CharList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            chars: [],
            loading: true,
            error: false
        }
    }

    marvelService = new MarvelService();

    onCharsLoaded = (chars) => {
        this.setState({
            chars: chars,
            loading: false,
            error: false
        })
    }

    onCharsLoading = () => {
        this.setState({
            chars: [],
            loading: true,
            error: false
        })
    }

    onError = () => {
        this.setState({
            chars: [],
            error: true,
            loading: false
        })
    }
    
    renderChars = (chars) => {
        let charList = chars.map((char, index) => {
            const { name, thumbnail } = char;
            return (
                <li className="char__item" key={index}>
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
        this.onCharsLoading();
        this.marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError)
    }

    render() {
        const {chars, loading, error} = this.state;

        const content = this.renderChars(chars);
        const spinner = loading ? <Spinner/> : null;
        const errorMessage = error ? <ErrorMessage/> : null;

        return (
            <div className="char__list">
                {content}
                {spinner}
                {errorMessage}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

export default CharList;