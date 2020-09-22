import React from 'react';
import './App.css';
import NavigationBar from "./components/containers/NavigationBar/NavigationBar";
import MainContainer from "./components/containers/MainContainer/MainContainer";

class App extends React.Component {

    APP_TITLE = "GPKS";

    render() {
        return (
            <div className="App">
                <NavigationBar title={this.APP_TITLE}/>
                <MainContainer />
            </div>
        );
    }
}

export default App;
