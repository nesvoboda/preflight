import React from 'react';

import Todo from './todo.js';
import TodoForm from './TodoForm.js';

class TaskList extends React.Component {

    constructor(props) {
        
        super(props);
        this.state = {
            todos: [],
        }
    
        this.props.ws.onmessage = evt => {
            // listen to data sent from the websocket server
            // console.log("New message!");
            // console.log(evt.data);
            
            const message = JSON.parse(evt.data);
            // this.setState({dataFromServer: message});
            // console.log(message);
            const msg = JSON.parse(message.message);
            // console.log("New message!");
            // console.log(msg);
            if (msg.kind === "todo_init") {
                var new_todos = [];
                msg.todos.forEach(element => {
                    new_todos.push({
                        name: element.name,
                        done: element.done,
                        uuid: element.id,
                    });
                })
                this.setState({
                    todos: new_todos,
                });
            } else if (msg.kind === 'kaboom') {
                this.props.sec(msg.code);
            } else if (msg.kind === 'move-to') {
                window.history.replaceState(null, '', msg.key);
                this.props.updateListName(msg.key);
                alert('Updated list name');
                // window.sessionStorage.setItem('listName', msg.key);
            }
        };

        console.log("Handlers setup");
    };

    serverCreateTask(taskName)
    {
        this.props.ws.send(JSON.stringify({
            'type': 'chat_message',
            'kind': 'create_task',
            'listName': 'cowabunga',
            'taskName': taskName
        }));
    }

    serverDeleteTask(task)
    {
        this.props.ws.send(JSON.stringify({
            'type': 'chat_message',
            'kind': 'delete_task',
            'taskId': task.uuid,
            'listName': 'cowabunga',
        }));
    }

    serverTaskDone(task)
    {
        this.props.ws.send(JSON.stringify({
            'type': 'chat_message',
            'kind': 'task_done',
            'taskId': task.uuid,
            'listName': 'cowabunga',
        }));
    }

    serverTaskUndone(task)
    {
        this.props.ws.send(JSON.stringify({
            'type': 'chat_message',
            'kind': 'task_undone',
            'taskId': task.uuid,
            'listName': 'cowabunga',
        }));
    }

    done(index) {
        this.serverTaskDone(this.state.todos[index]);
        var new_todos = this.state.todos.slice();
        new_todos[index].done = true;
        this.setState({
            todos: new_todos,
        });
    };

    undone(index) {
        this.serverTaskUndone(this.state.todos[index]);
        var new_todos = this.state.todos.slice();
        new_todos[index].done = false;
        this.setState({
            todos: new_todos,
        });
    };

    deleteTodo(index) {
        this.serverDeleteTask(this.state.todos[index]);
        var new_todos = this.state.todos.slice();
        // new_todos[index].done = false;
        new_todos.splice(index, 1);
        this.setState({
            todos: new_todos,
        });
    }

    formKeyDown(event) {
        if (event.keyCode === 13) // enter
        {
            this.serverCreateTask(event.currentTarget.value);
            // var new_todos = this.state.todos.slice();
            // new_todos.push({
            //     'name': event.currentTarget.value,
            //     'done': false,
            // });
            // this.setState({
            //     todos: new_todos,
            // });
            event.currentTarget.value = '';
            event.currentTarget.blur();
        }
    }

    renderTodo(todo, index) {

        return (
            <Todo
                key={this.state.todos[index].uuid}
                todo={this.state.todos[index]}
                done={() => this.done(index)}
                undone={() => this.undone(index)}
                delete={() => this.deleteTodo(index)}
                index={index}
            />
        );
    }

    doCopy() {
        var tmp = document.querySelector('#copyButton').innerHTML;
        var n = tmp.replace('Share this checklist', 'Link copied to clipboard!');
        navigator.clipboard.writeText(window.location.href);
        document.querySelector('#copyButton').innerHTML = n;
        setTimeout(()=>{document.querySelector('#copyButton').innerHTML = tmp;}, 1000)

    }

    render() {
        return (
            <div>

                        <div className="grid grid-cols-12 items-center">
                            <div className="col-span-6">
                                <h1 className="font-bold text-2xl text-gray-700">Tasks</h1>
                            </div>
                            <div className="col-start-7 col-end-13 justify-self-end">
                                <button id="copyButton" className="py-2 md:py-4 px-2 md:px-4 bg-gray-300 rounded text-xs md:text-md lg:text-lg text-gray-800 font-bold hover:bg-blue-300" onClick={this.doCopy}>Share link   <span className="sm:pl-1">📋</span></button>
                            </div>
                        </div>
                        <div className="mt-5">
                            {this.state.todos.map((todo, index) => this.renderTodo(todo, index))}
                            <TodoForm formKeyDown={(event) => this.formKeyDown(event)}/>
                        </div>  
            </div>
          );
    }
  

}

export default TaskList;