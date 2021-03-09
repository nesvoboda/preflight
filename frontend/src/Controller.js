import React from 'react';
import TaskList from './TaskList.js';
import ErrorScreen from './ErrorScreen.js';
import Footer from './Footer.js';

class Controller extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ws: null,
            errorCode: null
        };
    }
    
    connect(listName) {
        let ws = new WebSocket(
            'wss://' + process.env.REACT_APP_BACKEND_URL
            + '/ws/chat/'
            + listName
            + '/'
        );

        ws.onclose = (evt) => {
            this.setState({
                wsReady: false,
                closed: true,
            });
        };

        ws.onerror = () => {
            this.setState({
                wsReady: false,
                error: true,
            });
        };

        ws.onopen = () => {
            this.setState({
                wsReady: true,
            });
        }; 

        this.setState({
            ws: ws
        });
    }

    reconnect() {
        this.connect('create');
    }

    componentDidMount() {
        var listName;
        if (window.location.pathname === '/')
        {
            listName = 'create';
        }
        else
        {
            listName = window.location.pathname.substring(1);
            this.props.updateListName(listName);
            // window.sessionStorage.setItem('listName', listName);
        }
        this.connect(listName);
    }

    setErrorCode(code) {
        this.setState({errorCode: code});
    }

    renderTaskList(ws) {
        if (ws && ws.readyState === 1) {
            return (
                <div className="pb-12">
                    <TaskList ws={ws} sec={(code) => {this.setErrorCode(code);}} updateListName={this.props.updateListName}/>
                    <Footer/>
                </div>
            );
        }
        else {
            if (ws)
            {;
                if (ws.readyState === 3)
                {
                    if (this.state.errorCode === 21)
                    {
                        return (<ErrorScreen reconnectHandler={() => this.reconnect()}/>);
                    }
                    return (<h1 className="font-bold text-5xl text-gray-900">Sorry.<br/>Connection is lost!</h1>);
                }
            }
            return (<h1 className="font-bold text-5xl text-gray-300">Connecting...</h1>);
        }
    }

    render() {
        return this.renderTaskList(this.state.ws);
    }
    
}

export default Controller;