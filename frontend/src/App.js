import React, {Component} from 'react';
import {MainNavbar} from "./component/MainNavbar";
import {ImageCardPanel} from "./component/card/ImageCardPanel";

class App extends Component {


    render() {
        return (
            <div className="bg-dark">
                <MainNavbar/>
                <ImageCardPanel/>
            </div>
        );
    }

}


export default App;
