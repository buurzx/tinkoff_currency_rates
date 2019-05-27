class CreateCurrencyRates < ActiveRecord::Migration[5.2]
  def change
    create_table :currency_rates do |t|
      t.string :from_currency_name
      t.string :to_currency_name
      t.float  :buy
      t.float  :sell

      t.timestamps
    end
  end
end
