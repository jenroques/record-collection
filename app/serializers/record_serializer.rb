class RecordSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :collection_id

  belongs_to :user
  belongs_to :collection

  has_many :artists
end
