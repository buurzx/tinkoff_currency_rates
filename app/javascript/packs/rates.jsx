import React from "react";
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

const prepareRatesData = ({ labels, sell_usd, buy_usd, sell_eur, buy_eur }) => {
  return {
    labels: labels,
    datasets: [
      currencyDataset("USD Sell Rates", sell_usd, "rgba(75,192,192,1)"),
      currencyDataset("USD Buy Rates", buy_usd, "rgba(75,192,75,1)"),
      currencyDataset("EUR Sell Rates", sell_eur, "rgb(62, 189, 255)"),
      currencyDataset("EUR Buy Rates", buy_eur, "rgb(62, 18, 250)")
    ]
  };
};

const Rates = props => {
  const currencyRates = window.currency_rates;
  const noRates = currencyRates.length == 0;
  return (
    <React.Fragment>
      <Line
        data={prepareRatesData(currencyRates)}
        width={600}
        height={450}
        options={{ maintainAspectRatio: false }}
      />

      {noRates ? (
        <div className='currency-rates__no-rates'>
          <h5>Unfortunately no currency exchange data</h5>
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
