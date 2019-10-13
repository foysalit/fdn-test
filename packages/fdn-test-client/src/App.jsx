import React from 'react';
import { Container } from 'semantic-ui-react';

import './App.scss';
import logo from './logo.svg';
import SchemaPage from './schema/Page.component';

function App() {
    return (
        <div className="App">
            <header className="App__header">
                <img className="App__header-logo" src={logo} alt="Foundation" />
                Foundation
            </header>
            <div className="App__content">
                <Container>
                    <SchemaPage />
                </Container>
            </div>
        </div>
    );
}

export default App;
