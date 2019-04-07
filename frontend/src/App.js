import React, {Component} from 'react';
import {MainNavbar} from "./component/MainNavbar";
import {WorkNavbar} from "./component/WorkNavbar";
import {ImageCardPanel} from "./component/card/ImageCardPanel";

class App extends Component {


    render() {


        return (
            <div className="App bg-dark">
                <MainNavbar/>
                <WorkNavbar/>
                <ImageCardPanel/>
            </div>
        );
    }


}


export default App;
