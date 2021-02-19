import React from 'react';

class ErrorScreen extends React.Component {

    render() {
        return (
            <div>
                <h1 className="font-bold text-3xl md:text-5xl text-gray-900">Sorry.</h1>
                <h2 className="text-2xl mt-2 md:text-3xl text-gray-900">It seems that this checklist doesn't exist anymore.</h2>
                <h2 className="mt-5 text-lg md:text-xl text-gray-900">Lists are deleted after 48 hours. Empty lists live for 10 minutes.</h2>

                <button className="mt-10 px-4 py-4 rounded-lg bg-blue-200 text-blue-900 hover:bg-blue-400 focus:bg-blue-400 font-bold" onClick={this.props.reconnectHandler}>OK. Create a new list</button>
            </div>
            
        );
        
    }
}


export default ErrorScreen;