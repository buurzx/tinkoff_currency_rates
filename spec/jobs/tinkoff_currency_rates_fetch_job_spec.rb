# frozen_string_literal: true

RSpec.describe TinkoffCurrencyRatesFetchJob, type: :job do
  include ActiveJob::TestHelper
  describe '#perform' do
    let(:rates) { file_fixture("rates.json").read }

    before do
      allow_any_instance_of(TinkoffClient::CurrencyRates).to receive(:fetch_rates) { JSON.parse(rates) }
    end

    it 'creates new currencies rates' do
      expect do
        described_class.perform_now()
      end.to change(CurrencyRate, :count).by 2
    end

    after do
      clear_enqueued_jobs
      clear_performed_jobs
    end
  end
end
