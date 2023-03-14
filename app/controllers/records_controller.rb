class RecordsController < ApplicationController
  skip_before_action :authorize, only: [:show, :index, :create, :add_to_record, :destroy]
  wrap_parameters false

  def index
    records = current_user.records
    render json: records
  end

  def show
    record = find_record
    render json: record.as_json(include: { artists: { only: :name } })
  end

  def create
    collection_id = record_params[:collection_id]
    collection_name = record_params[:collection_name]
    artist_id = record_params[:artist_id]
    artist_name = record_params[:artist_name]
    artist_image = record_params[:artist_image]

    if collection_id.blank? && collection_name.present?
      collection = Collection.create(name: collection_name)
      collection_id = collection.id
    elsif collection_id.present? && Collection.exists?(id: collection_id)
      collection_name = nil
    else
      return render json: { errors: ['Invalid collection ID'] }, status: :unprocessable_entity
    end

    record = current_user.records.new(record_params.except(:collection_name, :artist_name, :artist_id, :artist_image))
    record.collection_id = collection_id

    if record.save
      if artist_id.blank? && artist_name.present?
        artist = Artist.create(name: artist_name, image_url: artist_image)
        artist_id = artist.id
        artist.records << record

      elsif artist_id.present?
        artist = Artist.find(artist_id)
        artist.records << record
      end

      render json: record, status: :created

    else
      render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
    end
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

  private

  def find_record
    Record.find(params[:id])
  end

  def record_params
    params.permit(:title, :image_url, :collection_id, :artist_id, :collection_name, :artist_name, :artist_image)
  end

  def update_record_params
    params.permit(:id, :title, :image_url)
  end

end


