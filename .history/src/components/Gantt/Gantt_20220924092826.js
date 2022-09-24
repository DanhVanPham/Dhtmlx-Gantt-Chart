import React, { Component } from 'react';
import { gantt } from 'dhtmlx-gantt';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import './Gantt.css';
 
export default class Gantt extends Component {
    componentDidMount() {
        gantt.config.date_format = "%Y-%m-%d %H:%i";
        this.initGanttDataProcessor();
        const { tasks } = this.props;
        // gantt.i18n.setLocale("jp");
        gantt.config.scales = [
            {unit: "month", step: 10, format: "%F, %Y"},
            {unit: "week", step: 10, format: function (date) {
                return "Week #" + gantt.date.getWeek(date);
            }},
            {unit: "day", step: 10, format: "%d"}
        ];
        gantt.init(this.ganttContainer);
        gantt.parse(tasks);
    }

    setZoom(value) {
        if(!gantt.$initialized){
            this.initZoom();
        }
        gantt.ext.zoom.setLevel(value);
    }
    
    shouldComponentUpdate(nextProps) {
        return this.props.zoom !== nextProps.zoom;
    }

    componentDidUpdate() {
        gantt.render();
    }

    initGanttDataProcessor() {
        const onDataUpdated = this.props.onDataUpdated;
        this.dataProcessor = gantt.createDataProcessor((entityType, action, item, id) => {
            return new Promise((resolve, reject) => {
                if (onDataUpdated) {
                    onDataUpdated(entityType, action, item, id);
                }
                return resolve();
            });
        });
    }

    componentWillUnmount() {
        if (this.dataProcessor) {
            this.dataProcessor.destructor();
            this.dataProcessor = null;
        }
    }

    initZoom() {
        gantt.ext.zoom.init({
            levels: [
                {
                    name: 'Hours',
                    scale_height: 60,
                    min_column_width: 30,
                    scales: [
                        { unit: 'day', step: 1, format: '%d %M' },
                        { unit: 'hour', step: 1, format: '%H' }
                    ]
                },
                {
                    name: 'Days',
                    scale_height: 60,
                    min_column_width: 70,
                    scales: [
                        { unit: 'week', step: 1, format: 'Week #%W' },
                        { unit: 'day', step: 1, format: '%d %M' }
                    ]
                },
                          {
                    name: 'Months',
                    scale_height: 60,
                    min_column_width: 70,
                    scales: [
                        { unit: "month", step: 1, format: '%F' },
                        { unit: 'week', step: 1, format: '#%W' }
                    ]
                }
            ]
        });
    }

    render() {
        const { zoom } = this.props;
        this.setZoom(zoom);
        return (
            <div
                ref={ (input) => { this.ganttContainer = input } }
                style={ { width: '100%', height: '100%' } }
            ></div>
        );
    }
}