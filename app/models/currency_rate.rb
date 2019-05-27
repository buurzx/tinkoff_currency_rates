# frozen_string_literal: true

class CurrencyRate < ApplicationRecord

  validates :from_currency_name, :to_currency_name, :buy, :sell, presence: true

  def usd?
    from_currency_name == 'USD'
  end

end
