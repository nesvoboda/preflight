import Controller from './Controller.js';
import React from 'react';
import Nav from './Nav.js';

class App extends React.Component {


    // window.history.replaceState(null, '', result.key);


    render() {
        return (
            <div className="container mx-auto">
                
                <div className="px-6 md:px-12 lg:px-40">
                    <Nav />

                    <div className="mt-16">
                        <Controller />
                    </div>
                </div>
            </div>
        );
    }

}

export default App;