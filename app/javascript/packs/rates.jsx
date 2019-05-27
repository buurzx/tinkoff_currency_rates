import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { Line } from "react-chartjs-2";

// TODO: refactor, pass data through props
class Rates extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      sellEUR: [],
      sellUSD: [],
      buyEUR: [],
      buyUSD: [],
      averageSellUsd: [],
      averageBuyUsd: [],
      averageSellEur: [],
      averageBuyEur: [],
      labels: [],
      noRates: true
    };
    this.fetchRates = this.fetchRates.bind(this);
  }

  componentDidMount() {
    this.fetchRates();
  }

  currencyDataset(label, currencyData, color) {
    return {
      label: label,
      fill: false,
      lineTension: 0.1,
      backgroundColor: color,
      borderColor: color,
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: color,
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: color,
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: currencyData
    };
  }

  prepareRatesData() {
    const { sellUSD, buyUSD, sellEUR, buyEUR } = this.state;
    return {
      labels: this.state.labels,
      datasets: [
        this.currencyDataset("USD Sell Rates", sellUSD, "rgba(75,192,192,1)"),
        this.currencyDataset("USD Buy Rates", buyUSD, "rgba(75,192,75,1)"),
        this.currencyDataset("EUR Sell Rates", sellEUR, "rgb(62, 189, 255)"),
        this.currencyDataset("EUR Buy Rates", buyEUR, "rgb(62, 18, 250)")
      ]
    };
  }

  async fetchRates() {
    const result = await fetch("/api/v1/currency_rates");
    if (result.status !== 422) {
      const rates = await result.json();
      this.setState({
        sellEUR: rates.sell_eur,
        sellUSD: rates.sell_usd,
        buyEUR: rates.buy_eur,
        buyUSD: rates.buy_usd,
        averageSellUsd: rates.average_sell_usd,
        averageBuyUsd: rates.average_buy_usd,
        averageSellEur: rates.average_sell_eur,
        averageBuyEur: rates.average_buy_eur,
        labels: rates.labels,
        noRates: false
      });
    }
  }

  render() {
    const {
      averageSellUsd,
      averageBuyUsd,
      averageSellEur,
      averageBuyEur,
      noRates
    } = this.state;
    return (
      <React.Fragment>
        <Line
          data={this.prepareRatesData()}
          width={600}
          height={450}
          options={{ maintainAspectRatio: false }}
        />

        {noRates ? (
          <div className='currency-rates__no-rates'>
            <h5>К сожалению нет данных по обмену валюты</h5>
          </div>
        ) : (
          <div className='currency-rates__average'>
            <p className='eur-sell'>- Average sell RUB/EUR: {averageSellEur}</p>
            <p className='eur-buy'>- Average buy RUB/EUR: {averageBuyEur}</p>
            <p className='usd-sell'>- Average sell RUB/USD: {averageSellUsd}</p>
            <p className='usd-buy'>- Average buy RUB/USD: {averageBuyUsd}</p>
          </div>
        )}
      </React.Fragment>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Rates />, document.getElementById("rates__chart"));
});
