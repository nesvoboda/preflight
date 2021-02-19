import React from 'react';


class TodoForm extends React.Component {
    render() {

        return (
            <div className="grid grid-cols-12 pb-12">
                <div className="my-1 border-2 border-blue-200 hover:border-blue-400 rounded h-24 items-center col-span-12">
                    {/* <div className="col-span-3"> */}
                        <input type="text" className="pl-5 w-full h-full text-lg md:text-3xl" placeholder="Add new todo" onKeyDown={this.props.formKeyDown}/>
                    {/* </div> */}
                </div>
            </div>
            );
    }
}

export default TodoForm;
