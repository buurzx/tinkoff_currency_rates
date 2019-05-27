# frozen_string_literal: true

class TinkoffCurrencyRatesFetcher

  def fetch(from_currencies: %w[USD EUR], to_currencies: ['RUB'])
    result = TinkoffClient::CurrencyRates.new.fetch_rates

    processed_rates(result, from_currencies, to_currencies)
  end

  private

  def processed_rates(result, from_currencies, to_currencies)
    rates = result['payload']['rates'].map do |rate|
      select_rate(rate, from_currencies, to_currencies)
    end

    rates.compact!
  end

  def select_rate(rate, currencies, to_currencies)
    return unless rate['category'] == 'DepositPayments'
    return unless currencies.include?(rate['fromCurrency']['name'])
    return unless to_currencies.include?(rate['toCurrency']['name'])

    {
      from_currency_name: rate['fromCurrency']['name'],
      to_currency_name: rate['toCurrency']['name'],
      buy: rate['buy'],
      sell: rate['sell']
    }
  end

end
