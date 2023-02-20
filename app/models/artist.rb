class Artist < ApplicationRecord
  attributes :id, :name, :image_url

  has_many :records, join_table: :artists_records
end
