import Controller from './Controller.js';
import React from 'react';
import Nav from './Nav.js';
import About from './About.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {listName: null};
    }

    updateListName(newListName)
    {
        this.setState({listName: newListName});
    }

    // window.history.replaceState(null, '', result.key);


    render() {
        return (
            <Router>
                <div className="container mx-auto">
                    
                    <div className="px-6 md:px-12 lg:px-40">
                        <Nav listName={this.state.listName}/>
                        <div className="mt-16">
                            <Switch>
                                <Route path="/about">
                                    <About />
                                </Route>
                                <Route path="/">
                                    <Controller updateListName={(name) => {this.updateListName(name)}}/>
                                </Route>
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        );
    }

}

export default App;