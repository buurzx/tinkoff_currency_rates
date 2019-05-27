# frozen_string_literal: true

module Api
  module V1
    class CurrencyRatesController < ApplicationController

      def index
        rates = CurrencyRate.where('created_at >= ? ', 24.hours.ago).order(created_at: :asc)

        if rates.empty?
          render json: { error: 'no_rates' }, status: 422
        else
          render json: CurrencyRatesProcessor.new.group_rates(rates), status: :ok
        end
      end

    end
  end
end
