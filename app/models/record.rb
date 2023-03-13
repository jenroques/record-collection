class Record < ApplicationRecord
  belongs_to :user
  belongs_to :collection

  has_many :artists
end
