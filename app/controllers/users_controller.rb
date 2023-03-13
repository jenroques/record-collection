class UsersController < ApplicationController
skip_before_action :authorize, only: [:index, :create]
wrap_parameters false

def index
  users = User.all
  render json: users
end

def show
  user = current_user
  render json: user.as_json(include: { records: { include: [:collection, :artists] } })
end

def create
  user = User.create!(user_params)
  render json: user, status: :created
end


def destroy
  user = find_user
  user.destroy
  head :no_content
end

private

def find_user
  User.find(params[:id])
end

def user_params
  params.permit(:username, :password, :password_confirmation)
end

end
