import React from 'react';
import './App.css';
import NavigationBar from "./components/containers/NavigationBar/NavigationBar";
import MainContainer from "./components/containers/MainContainer/MainContainer";
import DocumentPage from "./components/pages/DocumentPage/DocumentPage";
import {Typography} from "@material-ui/core";
import DocumentEditor from './components/single/DocumentEditor/DocumentEditor';

import DocumentApiInterface from './api/document';

class App extends React.Component {

    APP_TITLE = "GPKS";

    state = {
        readOnly: false
    };

    onReadOnlyModeEnabled = (readOnly) => {
        this.setState({readOnly});
    };

    componentDidMount() {
        const api = new DocumentApiInterface("http://localhost:3001");
        api.listDocuments();
    }

    render() {
        const {readOnly} = this.state;

        return (
            <div className="App">
                <NavigationBar title={this.APP_TITLE}/>
                <MainContainer>
                    <DocumentPage onReadOnlyModeEnabled={this.onReadOnlyModeEnabled}>
                        <DocumentEditor readOnly={readOnly}/>
                    </DocumentPage>
                </MainContainer>
            </div>
        );
    }
}

export default App;
