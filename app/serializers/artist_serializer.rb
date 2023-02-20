class ArtistSerializer < ApplicationSerializer
  attributes :id, :name, :image_url, :record_id

  has_and_belongs_to_many :records
end
