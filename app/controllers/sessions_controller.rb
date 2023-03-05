class SessionsController < ApplicationController
  skip_before_action :authorize, only: [:create, :destroy]

  def create
    user = User.find_by(username: params[:username])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      session[:session_id] = request.session.id
      render json: { user: user, session_id: session[:session_id] }, status: :created
    else
      render json: { error: ["Invalid username or password"]}, status: :unauthorized
    end
  end

  def destroy
    session.delete :user_id
    head :no_content
  end

end
