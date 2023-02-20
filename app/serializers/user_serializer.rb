class UserSerializer < ActiveModel::Serializer
  include ActiveRecord::Associations::ClassMethods
  attributes :id, :username

  has_many :records
  has_many :collections, through: :records
  has_many :artists, through: :records
end
