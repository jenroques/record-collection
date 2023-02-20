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

  private

  def find_collection
    Collection.find(params[:id])
  end

  def collection_params
    params.permit(:name)
  end

end

