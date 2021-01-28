Rails.application.routes.draw do
  root to: redirect('tasks')

  get 'tasks', to: 'home#index'

  namespace :api do
    resources :tasks, only: %i[index show create destroy update]
  end
end
