module TinkoffClient
  class CurrencyRatesError < TinkoffClientError; end

  class CurrencyRates < Base

    def fetch_rates
      result = request(:get, 'currency_rates')
      return result.parsed_body if result.ok?

      # used in background job so will be auto restart if error
      raise CurrencyRatesError, result.error
    end

  end
end
