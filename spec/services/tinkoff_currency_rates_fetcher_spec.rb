# frozen_string_literal: true

RSpec.describe TinkoffCurrencyRatesFetcher do
  include Spec::Helpers

  describe 'GET index' do
    let(:status) { 200 }
    let(:rates_json_response) { file_fixture("rates.json").read }

    before do
      stub_request(:get, "https://www.tinkoff.ru/api/v1/currency_rates").
         with(
           headers: {
            'Accept'=>'*/*',
            'Accept-Encoding'=>'gzip;q=1.0,deflate;q=0.6,identity;q=0.3',
            'Content-Type'=>'application/json',
            'User-Agent'=>'Ruby'
           }).
         to_return(status: status, body: response_body, headers: {})
    end

    subject { described_class.new.fetch }

    context 'when success response' do
      let(:response_body) { rates_json_response }

      it 'responds with success' do
        expect(subject.first.keys).to include(:to_currency_name, :from_currency_name, :buy, :sell)
      end
    end

    context 'when request fails' do
      before { TinkoffClient::CurrencyRates }
      context 'when invalid request data' do
        let(:response_body) do
          convert(resultCode:   'INVALID_REQUEST_DATA',
                  errorMessage: '8Y8229AXB - Неизвестный тип запроса currency_ratess')
          end

        it 'responds with error' do
          expect { subject }.to raise_error(TinkoffClient::CurrencyRatesError, '8Y8229AXB - Неизвестный тип запроса currency_ratess')
        end
      end

      context 'when invalid response body' do
        let(:response_body) { convert('{\\invalid: true}', converter: nil) }

        it 'responds with error' do
          expect { subject }.to raise_error(TinkoffClient::TinkoffClientError, 'Invalid JSON format from Tinkoff')
        end
      end

      context 'when tinkoff internal error' do
        let(:status) { 500 }
        let(:response_body) { 'invalid' }

        it 'responds with error' do
          expect { subject }.to raise_error(TinkoffClient::TinkoffClientError, 'Tinkoff internal error')
        end
      end

      context 'when resource not found' do
        let(:status) { 404 }
        let(:response_body) { 'invalid' }

        it 'responds with error' do
          expect { subject }.to raise_error(TinkoffClient::TinkoffClientError, 'Resource is not found')
        end
      end

      context 'when coonection failed' do
        let(:response_body) { rates_json_response }

        before do
          allow_any_instance_of(TinkoffClient::Base).to receive(:get) { raise Faraday::ConnectionFailed, 'connection failed' }
        end

        it 'responds with error' do
          expect { subject }.to raise_error(TinkoffClient::TinkoffClientError, 'connection failed')
        end
      end
    end
  end
end
