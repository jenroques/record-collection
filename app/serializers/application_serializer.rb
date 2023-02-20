class ApplicationSerializer < ActiveModel::Serializer
  include ActiveRecord::Associations
  include ActiveRecord::ModelSchema
  include ActiveRecord::AutosaveAssociation
end
