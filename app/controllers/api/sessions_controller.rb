class Api::SessionsController < ApplicationController
      def create
    @user = User.find_by_creds(
      params[:user][:username],
      params[:user][:password]
    )
  
 
    if @user
      login(@user)
      # redirect_to api_users_show
      render :show
    else
      render json: ['invalid username or password'], status: 404
    end

  end

  def destroy
  
    if logged_in?
      logout
      render json: {}
    else
      render json: 'no user', status: 404
    end
  end
end
