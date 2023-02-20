class UserSerializer < ApplicationSerializer
  attributes :id, :username

  has_many :records
  has_many :collections, through: :records
  has_many :artists, through: :records
end
