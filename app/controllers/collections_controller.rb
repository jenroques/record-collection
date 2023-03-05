class CollectionsController < ApplicationController

  def index
    collections = Collection.all
    render json: collections
  end

  def create
    collection = Collection.create(collection_params)
    render json: collection ,status: :created
  end

  def update
    collection = find_collection
    collection.update(collection_params)
    render json: collection, status: :accepted
  end

  def destroy
    collection = find_collection
    collection
    collection.destroy
    head :no_content
  end

  def add_to_collection
    collection = find_collection
    record = Record.find(params[:id])
    if collection.records.include?(record)
      render json: { message: 'Record already in collection.' }, status: :unprocessable_entity
    else
      collecion.records << record
      render json: { message: 'Record added to collection' }, status: :ok
    end
  end

  def delete_from_collection
    collection = find_collection
    record = Record.find(params[:id])
    collection.records.delete(record)
    render json: { message: "Record successfully removed from collection"}
  end


  private

  def find_collection
    Collection.find(params[:id])
  end

  def collection_params
    params.require(:collection).permit(:id, :name, :user_id)
  end

end

