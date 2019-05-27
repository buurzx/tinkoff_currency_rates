# frozen_string_literal: true

class CurrencyRatesController < ApplicationController

  def index
    rates = CurrencyRate.last_rates.ordered
    @currency_rates = CurrencyRatesProcessor.new.group_rates(rates)
  end

end
