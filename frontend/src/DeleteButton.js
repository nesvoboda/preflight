import React from 'react';

class UndoButton extends React.Component {
    render() {
        return (
            <button className=" w-full text-lg h-full md:text-3xl h-auto bg-red-50 hover:bg-red-400 hover:text-white text-red-200 text-3xl font-bold rounded-r-lg" onClick={this.props.handler}>x</button>
        );
    }
}

export default UndoButton;
