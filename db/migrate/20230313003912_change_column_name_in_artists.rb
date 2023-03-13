class ChangeColumnNameInArtists < ActiveRecord::Migration[7.0]
  def change
    rename_column :artists, :records_id, :record_id
  end
end
