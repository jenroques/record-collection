class RecordsController < ApplicationController
  skip_before_action :authorize, only: [:show]
  wrap_parameters :record, include: [:title, artist_ids: []]

  def index
    records = Record.all
    render json: records
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
    record
    record.destroy
    head :no_content
  end

  def add_to_record
    record = Record.find_record
    artist = Artist.find(params[:id])
    if record.artists.include?(artist)
      render json: { message: 'Artist already exists on record.' }, status: :unprocessable_entity
    else
      record.artists << artist
      render json: { message: 'Artist added to record.'}, status: :ok
    end
  end

  def delete_from_record
    record = find_record
    artist = Artist.find(params[:id])
    record.artists.delete(artist)
    render json: { message: "Artist has been removed from the record." }
  end

  private

  def find_record
    Record.find(params[:id])
  end

  def record_params
    params.permit(:title, :image_url, :user_id, :collection_id, :artist_id)
  end

  def update_record_params
    params.permit(:title, :image_url, :collection_id)
  end

end


