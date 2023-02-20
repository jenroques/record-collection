class Record < ApplicationRecord
  belongs_to :user
  belongs_to :collection

  has_and_belongs_to_many :artists, join_table: :artists_records
end
