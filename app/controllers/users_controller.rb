class UsersController < ApplicationController
skip_before_action :authorize, only: [:index, :create]

def index
  users = User.all
  render json: users
end

def show
  user = User.find(session[:user_id])
  render json: { user: user, session_id: session.id }
end

def create
  user = User.create!(user_params)
  session[:user_id] = user.id
  render json: user, status: :created
end

private

def find_user
  User.find(params[:id])
end

def user_params
  params.permit(:username, :password, :password_confirmation)
end

end
