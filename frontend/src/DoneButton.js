import React from 'react';

class DoneButton extends React.Component {
    render() {
        return (
            <button className="py-2 w-full border-1 shadow-inner border-green-200 bg-green-200 hover:bg-green-300 text-green-700 text-xl font-bold rounded-lg" onClick={this.props.handler}>✔</button>
        );
    }
}

export default DoneButton;
