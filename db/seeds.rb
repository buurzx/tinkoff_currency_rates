24.times do |t|
  CurrencyRate.create(
    from_currency_name: 'USD',
    to_currency_name: 'RUB',
    buy: rand(60.0 .. 64.0).round(2),
    sell: rand(64.0 .. 68.0).round(2),
    created_at: t.hours.ago
  )
  CurrencyRate.create(
    from_currency_name: 'EUR',
    to_currency_name: 'RUB',
    buy: rand(70.0 .. 72.0).round(2),
    sell: rand(72.0 .. 74.0).round(2),
    created_at: t.hours.ago
  )
end