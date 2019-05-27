# frozen_string_literal: true

RSpec.describe CurrencyRatesController, type: :controller do
  describe 'GET index' do
    let(:status) { 200 }

    context 'when success response' do
      before do
        FactoryBot.create_list(:currency_rate, 10)
        FactoryBot.create_list(:currency_rate, 10, :eur)
      end

      it 'responds with success' do
        get :index

        expect(response.status).to eq(200)
      end

      it 'responds with certaun keys' do
        get :index

        expect(assigns[:currency_rates].keys).to include(
          :average_buy_eur, :average_buy_usd, :average_sell_eur,
          :average_sell_usd, :buy_eur, :buy_usd, :labels,
          :sell_eur, :sell_usd
        )
      end
    end

    context 'when no rates' do
      it 'responds with 422 status' do
        get :index

        expect(assigns[:currency_rates]).to be_empty
      end
    end
  end
end
