import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import '../styles/CurrencyChart.css';

class CurrencyChart extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    get dayLineElements() {
        const elements = [];
        for (const day of this.props.days) {
            elements.push(<Line type="monotone" dataKey={`d${day.value}`} stroke={day.color} dot={false} key={day.value} />);
        }

        return elements;
    }

    get randomColor() {
        const r = Math.round(Math.random() * 7 + 1) * 32 - 1;
        const g = Math.round(Math.random() * 7 + 1) * 32 - 1;
        const b = Math.round(Math.random() * 7 + 1) * 32 - 1;
        return `#${r < 16 ? '0' : ''}${r.toString(16)}${g < 16 ? '0' : ''}${g.toString(16)}${b < 16 ? '0' : ''}${b.toString(16)}`;
    }

    render() {
        const { history } = this.props;
        return (
            <div className="chart_wrapper">
                <ResponsiveContainer width='100%' height={200} className='chart_container' id={history.code}>
                    <LineChart data={history.datas} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                        <CartesianGrid strokeDasharray="2 2" />
                        <XAxis dataKey="name" hide={true} />
                        <YAxis domain={[dataMin => dataMin, dataMax => dataMax]} hide={true} />
                        <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.2)', border: 'none' }} itemStyle={{ color: 'white' }} />
                        <Legend verticalAlign='top' height={30} />
                        <Line type="monotone" dataKey={history.code} stroke={this.randomColor} dot={false} />
                        {this.dayLineElements}
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

export default CurrencyChart;