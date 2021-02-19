import React from 'react';

class UndoButton extends React.Component {
    render() {
        return (
            <button className="py-2 w-full border-1 border-red-100 hover:border-red-400 text-red-300 shadow-inner bg-red-50 hover:text-red-600 text-sm font-bold rounded-lg" onClick={this.props.handler}>Undo</button>
        );
    }
}

export default UndoButton;
