# frozen_string_literal: true

class CurrencyRatesController < ApplicationController

  def index
    rates = CurrencyRate.last_rates.ordered
    @currency_rates = rates.empty? ? [] : CurrencyRatesProcessor.new.group_rates(rates)
  end

end
