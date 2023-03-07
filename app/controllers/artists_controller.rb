class ArtistsController < ApplicationController
  skip_before_action :authorize, only: [:show, :index]
  wrap_parameters :artist, include: [:name, :image_url, record_ids: []]


  def index
    artists = Artist.all
    render json: artists
  end

  def show
    artist = find_artist
    render json: artist
  end

  def create
    artist = Artist.find_by(name: artist_params[:name])
    if artist
      render json: { message: "Artist with name '#{artist_params[:name]}' already exists" }, status: :unprocessable_entity
    else
      artist = Artist.create(artist_params)
      render json: artist, status: :created
    end
  end

  def update
    artist = find_artist
    artist.update(artist_params)
    render json: artist, status: :accepted
  end

  def destroy
    artist = find_artist
    artist.destroy
    head :no_content
  end

  private

  def find_artist
    Artist.find(params[:id])
  end

  def artist_params
    params.require(:artist).permit(:id, :name, :image_url, record_ids: [])
  end


end
