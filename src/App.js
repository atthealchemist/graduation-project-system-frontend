import React from 'react';
import './App.css';
import NavigationBar from "./components/containers/NavigationBar/NavigationBar";
import MainContainer from "./components/containers/MainContainer/MainContainer";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import DocumentPage from "./components/pages/DocumentPage/DocumentPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

// import DocumentApiInterface from './api/document';

import {stubTree} from "./components/containers/TreeDrawer/stub";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";


class App extends React.Component {

    APP_TITLE = "GPKS";

    componentDidMount() {
    }

    fetchDocumentById = (id) => {
        const doc = stubTree.filter(n => n.id === id);
        console.log(`Fetched doc #${id}: ${doc}`);
    };

    render() {
        return (
            <Router>
                <div className="App">
                    <NavigationBar title={this.APP_TITLE}/>
                    <Switch>
                        <Route path='/dashboard' component={DashboardPage}/>
                        <Route path='/documents/:id' component={DocumentPage}/>
                        <Route path='/login' component={LoginPage}/>
                        <Route path='/register' component={RegisterPage}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
