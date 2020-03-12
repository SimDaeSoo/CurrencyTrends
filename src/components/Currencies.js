import React from 'react';
import Network from '../utils/Network';
import CurrencyChart from './CurrencyChart';
import '../styles/Currencies.css';

class Currencies extends React.Component {
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

    get charts() {
        return this.state.datas.map(history => <CurrencyChart history={history} days={this.state.days} key={history.code} />);
    }

    render() {
        return (
            <div className="Currencies">
                {this.charts}
            </div>
        );
    }
}

export default Currencies;