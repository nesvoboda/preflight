import React from 'react';
import DoneButton from './DoneButton.js';
import UndoButton from './UndoButton.js';
import DeleteButton from './DeleteButton.js';

class Todo extends React.Component {
    render() {
        
        // var todoBaseClass = "my-5 border-2 rounded items-center"
        var todoBaseClass = "col-span-11 rounded-l-lg py-4 items-center";
        var allClass = "";
        if (this.props.todo.done)
        {
            allClass = todoBaseClass + " border-green-100 bg-green-50 text-green-400"
        }
        else {
            allClass = todoBaseClass + " border-gray-100 bg-white";
        }
        return (
            <div className="grid grid-cols-12 items-center my-4 bg-transparent rounded-lg shadow-md">
                <div className={allClass}>
                    <div className="grid grid-cols-12 items-center">
                        <div className="col-span-7">
                            <p className="pl-5 py-4 text-lg md:text-3xl break-all">{this.props.todo.name}</p>
                        </div>
                        <div className="col-start-10 col-span-2 items-center">
                            {this.props.todo.done ? <UndoButton handler={this.props.undone}/> : <DoneButton handler={this.props.done}/>}
                        </div>
                    </div>
                </div>
                <div className="col-span-1 h-full">
                    <DeleteButton handler={this.props.delete}/>
                </div>

            </div>
            // <div className="grid grid-cols-12 gap-0 items-center bg-green-100">
            //     <div className={allClass}>
            //         <div className="col-span-6 bg-blue-100">
            //             <p className="pl-5 py-4 text-lg md:text-3xl break-all" >{this.props.todo.name}</p>
            //         </div>
            //         <div className="col-span-2 col-start-8">
            //             {this.props.todo.done ? <UndoButton handler={this.props.undone}/> : <DoneButton handler={this.props.done}/>}
            //         </div>
            //         <div className="col-start-11 col-span-1 z-10 h-full">
            //             <DeleteButton handler={this.props.delete}/>
            //         </div>
            //     </div>
            //     <div className="col-span-1 col-start-11 bg-yellow-200">
                    
            //     </div>
                
            // </div>
            );
    }
}

export default Todo;
