class ApplicationController < ActionController::API
  include ActionController::Cookies
  before_action :authorize


  def authorize
    return render json: { error: "Not Authorized" }, status: :unauthorized unless session.include? :user_id
  end

  private

  def render_not_found_response
    render json: { error: "Not Found" }, status: :not_found
  end

  def render_invalid_record(invalid)
    render json: { error: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end

end
