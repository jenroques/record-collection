class RecordSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :user_id, :collection_id, :artist_id

  belongs_to :user
  belongs_to :collection

  has_and_belongs_to_many :artists, join_table: :artists_records
end
