# frozen_string_literal: true

class CurrencyRatesProcessor

  # FIXME: pass currency as arguments
  def group_rates(rates)
    return [] if rates.blank?

    grouped_rates = group_by_type_and_currency(rates)
    grouped_rates.merge(
      average_sell_usd: average_value(grouped_rates, :sell_usd),
      average_buy_usd: average_value(grouped_rates, :buy_usd),
      average_sell_eur: average_value(grouped_rates, :sell_eur),
      average_buy_eur: average_value(grouped_rates, :buy_eur),
      labels: make_labels(rates)
    )
  end

  private

  def group_by_type_and_currency(rates)
    grouped_rates = { sell_usd: [], buy_usd: [], sell_eur: [], buy_eur: [] }

    rates.each do |rate|
      sell_key = rate.from_usd? ? :sell_usd : :sell_eur
      buy_key  = rate.from_usd? ? :buy_usd : :buy_eur

      grouped_rates[sell_key] << rate.sell
      grouped_rates[buy_key] << rate.buy
    end

    grouped_rates
  end

  def average_value(grouped_rates, key)
    (grouped_rates[key].sum / grouped_rates[key].size).round(2)
  end

  def make_labels(rates)
    rates.map { |rate| rate.created_at.strftime('%H:%M') }.uniq!
  end

end
