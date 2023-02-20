class ArtistSerializer < ActiveModel::Serializer
  attributes :id, :name, :image_url, :record_id

  has_and_belongs_to_many :records, join_table: :artists_records
end
