class UpdateCollectionIdNullableInRecords < ActiveRecord::Migration[7.0]
  def change
    change_column :records, :collection_id, :bigint, null: true
  end
end
