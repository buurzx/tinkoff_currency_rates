import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { Line } from "react-chartjs-2";

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

  prepareRatesData() {
    return {
      labels: this.state.labels,
      datasets: [
        {
          label: "USD Sell Rates",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.sellUSD
        },
        {
          label: "USD Buy Rates",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgba(75,192,75,1)",
          borderColor: "rgba(75,192,75,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,75,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,75,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.buyUSD
        },
        {
          label: "EUR Sell Rates",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(62, 189, 255)",
          borderColor: "rgb(62, 189, 255)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(62, 189, 255)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(62, 189, 255)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.sellEUR
        },
        {
          label: "EUR Buy Rates",
          fill: false,
          lineTension: 0.1,
          backgroundColor: "rgb(62, 18, 250)",
          borderColor: "rgb(62, 18, 250)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgb(62, 18, 250)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgb(62, 18, 250)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: this.state.buyEUR
        }
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
