import React, { PureComponent } from "react";
import ReactDOM from "react-dom";
import { Line } from "react-chartjs-2";

const currencyDataset = (label, currencyData, color) => {
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
};

const prepareRatesData = (labels, sellUSD, buyUSD, sellEUR, buyEUR) => {
  return {
    labels: labels,
    datasets: [
      currencyDataset("USD Sell Rates", sellUSD, "rgba(75,192,192,1)"),
      currencyDataset("USD Buy Rates", buyUSD, "rgba(75,192,75,1)"),
      currencyDataset("EUR Sell Rates", sellEUR, "rgb(62, 189, 255)"),
      currencyDataset("EUR Buy Rates", buyEUR, "rgb(62, 18, 250)")
    ]
  };
};

const Rates = props => {
  const currencyRates = window.currency_rates;
  const noRates = currencyRates.length == 0;
  const { labels, sell_usd, buy_usd, sell_eur, buy_eur } = currencyRates;
  return (
    <React.Fragment>
      <Line
        data={prepareRatesData(labels, sell_usd, buy_usd, sell_eur, buy_eur)}
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
          <p className='eur-sell'>
            - Average sell RUB/EUR: {currencyRates.average_sell_eur}
          </p>
          <p className='eur-buy'>
            - Average buy RUB/EUR: {currencyRates.average_buy_eur}
          </p>
          <p className='usd-sell'>
            - Average sell RUB/USD: {currencyRates.average_sell_usd}
          </p>
          <p className='usd-buy'>
            - Average buy RUB/USD: {currencyRates.average_buy_usd}
          </p>
        </div>
      )}
    </React.Fragment>
  );
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<Rates />, document.getElementById("rates__chart"));
});
