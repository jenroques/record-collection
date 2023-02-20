class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :record_id

  has_many :records
end
