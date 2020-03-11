import React from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Network from '../utils/Network';
import '../styles/Main.css';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            datas: [],
            days: [{ value: 20, color: 'rgba(255, 0, 0, 0.8)' }, { value: 100, color: 'rgba(0, 0, 255, 0.8)' }]
        };
    }

    componentDidMount() {
        this.fetchCurrencyData();
    }

    async fetchCurrencyData() {
        const result = await Network.get('http://13.209.124.232:8000/api/currency');
        const { currencies } = result;
        this.setChartData(currencies);
    }

    setChartData(currencies) {
        const chartDictionary = {};
        for (const currencyData of currencies) {
            const { code, rate } = currencyData;
            const date = currencyData.date.match(/[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/g)[0];

            if (!chartDictionary[code]) chartDictionary[code] = [];
            chartDictionary[code].push({ [code]: rate, name: date });
        }

        const datas = [];
        for (const code in chartDictionary) {
            const accumulateRate = {};
            for (const data of chartDictionary[code]) {
                for (const day of this.state.days) {
                    if (!accumulateRate[day.value]) accumulateRate[day.value] = [];
                    accumulateRate[day.value].push(data[code]);

                    if (accumulateRate[day.value].length > day.value) accumulateRate[day.value].splice(0, 1);

                    const average = this.sum(accumulateRate[day.value]) / accumulateRate[day.value].length;
                    data[`d${day.value}`] = Number(average.toFixed(2));
                }
            }
            datas.push({ code, datas: chartDictionary[code] });
        }

        this.setState({ datas });
    }

    sum(data) {
        return data.reduce((accumulate, current) => { return accumulate + current; }, 0);
    }

    get dayLineElements() {
        const elements = [];
        for (const day of this.state.days) {
            elements.push(<Line type="monotone" dataKey={`d${day.value}`} stroke={day.color} dot={false} key={day.value} />);
        }

        return elements;
    }

    get charts() {
        const elements = [];
        for (const history of this.state.datas) {
            elements.push(
                <div className="chart_wrapper" key={history.code}>
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
        return elements;
    }

    get randomColor() {
        const r = Math.round(Math.random() * 7 + 1) * 32 - 1;
        const g = Math.round(Math.random() * 7 + 1) * 32 - 1;
        const b = Math.round(Math.random() * 7 + 1) * 32 - 1;
        return `#${r < 16 ? '0' : ''}${r.toString(16)}${g < 16 ? '0' : ''}${g.toString(16)}${b < 16 ? '0' : ''}${b.toString(16)}`;
    }

    render() {
        return (
            <div className="Main">
                <div className="header">Currency Trends</div>
                {this.charts}
            </div>
        );
    }
}

export default Main;