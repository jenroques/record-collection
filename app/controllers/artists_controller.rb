class ArtistsController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :render_invalid_record
  wrap_parameters :artist, include: [:name, :image_url, :record_ids: []]

  def index
    @artists = Artist.all
    render json: @artists
  end

  def create
    @artist = Artist.create(artist_params)
    render json: @artist, status: :created
  end

  def update
    @artist = find_artist
    @artist.update(update_artist_params)
    render json: @artist, status: :accepted
  end

  def destroy
    @artist = find_artist
    @artist
    @artist.destroy
    head :no_content
  end

  private

  def find_artist
    Artist.find(params[:id])
  end

  def artist_params
    params.permit(:name, :image_url, :record_id)
  end

  def update_artist_params
    params.permit(:name, :image_url)

