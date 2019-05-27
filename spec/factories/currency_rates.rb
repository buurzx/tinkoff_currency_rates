FactoryBot.define do
  factory :currency_rate do
    from_currency_name { "USD" }
    to_currency_name { "RUB" }
    buy { rand(60.0 .. 64.0).round(2) }
    sell { rand(64.0 .. 68.0).round(2) }

    trait :eur do
      from_currency_name { "EUR" }
    end
  end
end
