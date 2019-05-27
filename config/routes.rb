Rails.application.routes.draw do
  root 'home#index'

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :currency_rates, only: :index
    end
  end
end
