class UsersController < ApplicationController
rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record
rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response

def index
  users = User.all
  render json: users
end

def show
  user = User.find(session[:user_id])
  render json: user
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
  params.permit(:name, :password_digest)
end

