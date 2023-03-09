class RecordsController < ApplicationController
  skip_before_action :authorize, only: [:show, :index, :create, :add_to_record]
  wrap_parameters false

  def index
    records = Record.where(user_id: current_user.id)
    render json: records
  end

  def show
    record = find_record
    render json: record
  end

  def create
    record = Record.create(record_params)
    render json: record, status: :created
  end

  def update
    record = find_record
    record.update(update_record_params)
    render json: record, status: :accepted
  end

  def destroy
    record = find_record
    record.destroy
    head :no_content
  end

  def add_to_collection
    record = find_record
    if record.collection_id == params[:collection_id].to_i
      render json: { message: 'Record already in collection.' }, status: :unprocessable_entity
    else
      record.update(collection_id: params[:collection_id])
      render json: { message: 'Record added to collection.' }, status: :ok
    end
  end

  def add_to_record
    record = find_record
    record.artists << Artist.find_by(name: params[:name])
    if record.save
      render json: record
    else
      render json: { error: "Failed to add artist to record" }, status: :unprocessable_entity
    end
  end

  def delete_from_record
    record = find_record
    artist = Artist.find(params[:artist_id])
    record.artists.delete(artist)
    render json: { message: "Artist has been removed from the record." }
  end

  private

  def find_record
    Record.find(params[:id])
  end

  def record_params
    params.permit(:title, :image_url)
  end

  def update_record_params
    params.permit(:title, :image_url)
  end

end


