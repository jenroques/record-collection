class ApplicationSerializer < ActiveModel::Serializer
  include ActiveRecord::Associations
  include ActiveRecord::ModelSchema
  include ActiveRecord::AttributeMethods
  include ActiveRecord::AutosaveAssociation
  include ActiveRecord::Callbacks
  include ActiveModel::Validations
  include ActiveRecord::Reflection
end
