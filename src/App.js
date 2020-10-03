import React from 'react';
import './App.css';
import NavigationBar from "./components/containers/NavigationBar/NavigationBar";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import DocumentPage from "./components/pages/DocumentPage/DocumentPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";

import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';

// import DocumentApiInterface from './api/document';

import {stubTree} from "./components/containers/TreeDrawer/stub";
import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import AdminPage from "./components/pages/AdminPage/AdminPage";
import AccountPage from "./components/pages/AccountPage/AccountPage";

class App extends React.Component {

    APP_TITLE = "GPKS";

    state = {
        loggedIn: false
    };

    componentDidMount() {
    }

    fetchDocumentById = (id) => {
        const doc = stubTree.filter(n => n.id === id);
        console.log(`Fetched doc #${id}: ${doc}`);
    };

    handleAuthChanged = (status) => this.setState({loggedIn: status});

    render() {
        const {loggedIn} = this.state;
        return (
            <Router>
                <div className="App">
                    <NavigationBar loggedIn={loggedIn} title={this.APP_TITLE} onAuthChanged={this.handleAuthChanged}/>
                    <Switch>
                        <Route exact path={'/'}>
                            {loggedIn ? <Redirect to="/dashboard" /> : <LoginPage onAuthChanged={this.handleAuthChanged}/>}
                        </Route>
                        <Route exact path='/dashboard'>
                            {loggedIn ? <DashboardPage /> : <Redirect to='/login'/>}
                        </Route>
                        <Route exact path='/login'>
                            {!loggedIn ? <LoginPage onAuthChanged={this.handleAuthChanged}/> : <Redirect to={'/dashboard'}/>}
                        </Route>
                        <Route exact path={'/logout'}>
                            {loggedIn ? <LoginPage onAuthChanged={this.handleAuthChanged}/> : <Redirect to={'/login'}/>}
                        </Route>
                        <Route path='/register' component={RegisterPage}/>
                        <Route path='/admin' component={AdminPage}/>
                        <Route path='/account' component={AccountPage}/>
                        <Route path='/documents/:id' component={DocumentPage}/>
                        <Redirect to={'/login'}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
