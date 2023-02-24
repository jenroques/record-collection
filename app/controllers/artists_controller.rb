class ArtistsController < ApplicationController
  skip_before_action :authorize, only: [:show, :index]
  wrap_parameters :artist, include: [:name, :image_url, record_ids: []]


  def index
    artists = Artist.all
    render json: artists
  end

  def create
    artist = Artist.create(artist_params)
    render json: artist, status: :created
  end

  def update
    artist = find_artist
    artist.update(update_artist_params)
    render json: artist, status: :accepted
  end

  def destroy
    artist = find_artist
    artist
    artist.destroy
    head :no_content
  end

  private

  def find_artist
    Artist.find(params[:id])
  end

  def artist_params
    params.require(:artist).permit(:name, :image_url, record_ids: [])
  end

  def update_artist_params
    params.permit(:name, :image_url)
  end

end
