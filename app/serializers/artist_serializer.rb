class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url

  belongs_to :record, class_name: 'Record'
end
