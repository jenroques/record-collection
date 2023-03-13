class User < ApplicationRecord
  has_secure_password

    has_many :records
    has_many :collections, through: :records
    has_many :artists, through: :records

    validates :username, presence: :true
    validates :password_digest, presence: :true
  end
