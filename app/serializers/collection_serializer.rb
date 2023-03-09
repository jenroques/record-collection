class CollectionSerializer < ActiveModel::Serializer
  attributes :id, :name, :records

  has_many :records
  has_many :users, through: :records
  has_many :artists, through: :records

end
