class UserSerializer < ActiveModel::Serializer
  attributes :id, :username

  has_many :records
  has_many :collections, through: :records
  has_many :artists, through: :records
end
