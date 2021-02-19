import Controller from './Controller.js';
import React from 'react';

class App extends React.Component {


    // window.history.replaceState(null, '', result.key);


    render() {
        return (
            <div className="container mx-auto">
                
                <div className="px-6 md:px-12 lg:px-40">
                    <div className="mt-10 grid grid-cols-12 items-center">
                    <div className="col-span-10">
                            <h1 className="font-bold text-3xl">Preflight 🛫</h1>
                            <p className="text-gray-700">Share checklists with a click.</p>
                            {/* <p className="text-gray-700">Never forget guacamole again.</p> */}
                        </div>
                        {/* <div className="col-span-1">
                        <div className="">
                            <p className="mt-2 inline ml-4 px-4 py-1 bg-yellow-300 text-gray-600 text-sm rounded-full">beta</p></div>
                        </div> */}
                        <div className="col-span-4 col-end-11 bg-red-100 justify-self-end items-center">
                            <div className="">
                                {/* <a className="font-bold text-xl mr-2 text-gray-700" href="/about">About</a> */}
                            </div>
                        </div>
                    </div>
                    <div className="mt-16">
                        <Controller />
                    </div>
                </div>
            </div>
        );
    }

}

export default App;