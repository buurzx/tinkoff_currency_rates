# frozen_string_literal: true

class TinkoffCurrencyRatesFetchJob < ApplicationJob

  queue_as :default

  def perform
    TinkoffCurrencyRatesFetcher.new.fetch.each do |params|
      CurrencyRate.create!(params)
    end

    # HACK: for heroku free dyno
    TinkoffCurrencyRatesFetchJob.set(wait_until: Time.zone.now + 1.hour).perform_later
  end

end
