# Tinkoff Bank CurrencyRates

Resource on exchange rates obtained through the API of Tinkoff Bank (https://www.tinkoff.ru/api/v1/currency_rates/).

The application displays:

1. Graph based on data on fluctuations in the purchase and sale rate of the dollar and the euro per day
2. Average value per day

The API has only the current rate (DepositPayments is interested), so it makes sense to take fresh data from there every hour.

### Technology:

- Ruby on Rails.
- ReactJS.
- Delayed jobs

### Prepare

- bundle install
- yarn install

### Execution

- bundle exec rails s
- bin/webpack-dev-server

### DelayedJobs

- bin/delayed_jobs -n 1

### Tests

- bundle exec rspec

### Whenever

Writes to a cron the task to launch a background job every hour.

### Heroku

Deployed on heroku. For the initial filling of the graph, fake data was used.

https://sleepy-beach-65647.herokuapp.com/
