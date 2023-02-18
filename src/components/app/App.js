import { Component } from "react";

import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";


import decoration from '../../resources/img/vision.png';

class App extends Component{
    state = {
        selectedId: null
    }
    onChangeSelectedId = (id) => {
        this.setState({
            selectedId: id
        })
    }
    render() {
        return (
            <div className="app">
                <AppHeader/>
                <main>
                    <RandomChar/>
                    <div className="char__content">
                        <CharList changeSelectedId={this.onChangeSelectedId}/>
                        <CharInfo selectedId={this.state.selectedId}/>
                    </div>
                    <img className="bg-decoration" src={decoration} alt="vision"/>
                </main>
            </div>
        )
    }
}

export default App;