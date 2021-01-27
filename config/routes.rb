Rails.application.routes.draw do
  namespace :api do
    resources :tasks, only: %i[index show create destroy update]
  end
  root 'home#index'
end
