# frozen_string_literal: true

class CurrencyRate < ApplicationRecord

  validates :from_currency_name, :to_currency_name, :buy, :sell, presence: true

  scope :last_rates, -> { where('created_at >= ? ', 24.hours.ago) }
  scope :ordered,    -> { order(created_at: :asc) }

  def from_usd?
    from_currency_name == 'USD'
  end

end
