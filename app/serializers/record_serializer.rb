class RecordSerializer < ActiveModel::Serializer
  attributes :id, :title, :image_url, :artists

  belongs_to :user
  belongs_to :collection

  has_many :artists
end
