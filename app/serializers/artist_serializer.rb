class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url

  has_many :records, class_name: 'Record'
end
