import React, {useState} from 'react';
import './App.css';

import config from './config.json';

import NavigationBar from "./components/containers/NavigationBar/NavigationBar";
import DashboardPage from "./components/pages/DashboardPage/DashboardPage";
import DocumentPage from "./components/pages/DocumentPage/DocumentPage";
import LoginPage from "./components/pages/LoginPage/LoginPage";

import {BrowserRouter as Router, Redirect, Switch, Route} from 'react-router-dom';

// import DocumentApiInterface from './api/document';

import RegisterPage from "./components/pages/RegisterPage/RegisterPage";
import AdminPage from "./components/pages/AdminPage/AdminPage";
import AccountPage from "./components/pages/AccountPage/AccountPage";
import Modal from "@material-ui/core/Modal";
import Card from "@material-ui/core/Card";
import {CardHeader} from "@material-ui/core";

const ServerOffModal = ({serverRunning}) => {

    const rootRef = React.useRef(null);

    return (<Modal
            style={{backgroundColor: 'lightblue', border: 'none'}}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            open={!serverRunning}
            container={() => rootRef.current}
        >
            <Card style={{display: 'flex', width: '400px', margin: '40vh auto', textAlign: 'center'}}>
                <CardHeader
                    title="Backend server is down!"
                    subheader="Enable server and all stuff will be ok! Or check your settings in config.json file, probably you point your frontend on wrong server?"
                />
            </Card>
        </Modal>
    );

};

const App = () => {

    const APP_TITLE = "GPKS";

    const [loggedIn, setLoggedIn] = useState(false);


    const checkServerRunning = () => {
        const serverUrl = `http://${config.server.url}:${config.server.port}`;
        fetch(serverUrl)
            .catch(e => {
                setServerRunning(false);
            })
            .then(res => {
                setServerRunning(true);
            });
    };

    const [serverRunning, setServerRunning] = useState(false);

    const handleAuthChanged = (status) => setLoggedIn(status);

    return (
        <Router>
            <div className="App">
                <NavigationBar loggedIn={loggedIn} title={APP_TITLE} onAuthChanged={handleAuthChanged}/>
                <Switch>
                    <Route exact path={'/'}>
                        {loggedIn ? <Redirect to="/dashboard"/> :
                            <LoginPage onAuthChanged={handleAuthChanged}/>}
                    </Route>
                    <Route exact path='/dashboard'>
                        {loggedIn ? <DashboardPage /> : <Redirect to='/login'/>}
                    </Route>
                    <Route exact path='/login'>
                        {!loggedIn ? <LoginPage onAuthChanged={handleAuthChanged}/> :
                            <Redirect to={'/dashboard'}/>}
                    </Route>
                    <Route exact path={'/logout'}>
                        {loggedIn ? <LoginPage onAuthChanged={handleAuthChanged}/> : <Redirect to={'/login'}/>}
                    </Route>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/admin' component={AdminPage}/>
                    <Route path='/account' component={AccountPage}/>
                    <Route path='/documents/:id' component={DocumentPage}/>
                    <Route path='/folders/:id' component={DashboardPage} />
                    <Redirect to={'/login'}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
