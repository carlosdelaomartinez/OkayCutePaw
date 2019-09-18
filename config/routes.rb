Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :index, :show] do
      resources :question_answers, only: [:show, :index, :create, :update, :destroy] 
    end
    resource :session, only: [:create, :destroy]
    resources :questions, only: [:show, :index]
  end


  root to: 'static_pages#root'

end
