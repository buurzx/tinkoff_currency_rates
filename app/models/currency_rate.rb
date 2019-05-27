class CurrencyRate < ApplicationRecord

  validates :from_currency_name, :to_currency_name, :buy, :sell, presence: true

end
