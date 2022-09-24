import React, { Component } from 'react';
import Gantt from './components/Gantt';
import Toolbar from './components/Toolbar';
import './App.css';

const data = {
    data: [
        { id: 1, text: 'Task #1', start_date: '2019-04-15', duration: 3, progress: 0.6 },
        { id: 2, text: 'Task #2', start_date: '2019-04-18', duration: 3, progress: 0.4 }
    ],
    links: [
        { id: 1, source: 1, target: 2, type: '0' }
    ]
};
class App extends Component {
    state = {
        currentZoom: 'Days',
        messages: [],
    };
     
    handleZoomChange = (zoom) => {
        this.setState({
            currentZoom: zoom
        });
    }
    render() {
        const { currentZoom } = this.state;
        return (
            <div>
                <div className="zoom-bar">
                    <Toolbar
                        zoom={currentZoom}
                        onZoomChange={this.handleZoomChange}
                    />
                </div>
                <div className="gantt-container">
                    <Gantt
                        tasks={data}
                        zoom={currentZoom}
                    />
                </div>
            </div>
        );
    }
}
export default App;