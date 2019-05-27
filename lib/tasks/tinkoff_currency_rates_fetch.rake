# frozen_string_literal: true

namespace :tinkoff_currency_rates_fetch do
  desc 'Fetch currency rates from tinkoff'
  task fetch: :environment do
    TinkoffCurrencyRatesFetchJob.perform_later
  end
end
