class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :created_at, :updated_at

  has_many :records
  has_many :users, through: :records
  has_many :artists, through: :records
end
