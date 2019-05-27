# frozen_string_literal: true

RSpec.describe Api::V1::CurrencyRatesController, type: :controller do
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
        resp = JSON.parse(response.body)

        expect(resp).to include(
          'average_buy_eur', 'average_buy_usd', 'average_sell_eur',
          'average_sell_usd', 'buy_eur', 'buy_usd', 'labels',
          'sell_eur', 'sell_usd'
        )
      end
    end

    context 'when no rates' do
      it 'responds with 422 status' do
        get :index

        expect(response.status).to eq(422)
      end

      it 'responds with error' do
        get :index
        resp = JSON.parse(response.body)

        expect(resp['error']).to eq('no_rates')
      end
    end
  end
end
