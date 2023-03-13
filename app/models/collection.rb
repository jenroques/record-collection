class Collection < ApplicationRecord
  has_many :records
  has_many :users, through: :records
  has_many :artists, through: :records

  validates :name, presence: true
end
