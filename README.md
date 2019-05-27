# TinkoffCurrencyRates

Ресурс по курсам валют, получаемым через API банка Тинькофф (https://www.tinkoff.ru/api/v1/currency_rates/).

Приложение выводит:

1. График на основе данных о колебании курса покупки-продажи доллара и евро за сутки
2. Среднее значение за сутки

В API есть только текущий курс (интересует DepositPayments), поэтому имеет смысл брать оттуда свежие данные каждый час.

### Технологии:

- Ruby on Rails.
- ReactJS.
- Delayed jobs

### Запуск

- bundle install
- yarn install
- bundle exec rails s
- bin/webpack-dev-server

### DelayedJobs

- bin/delayed_jobs -n 1

### Тесты

- bundle exec rspec

### Whenever

Записывает в cron таску по запуску фоновой задачи каждый час.
