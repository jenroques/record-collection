class CreateJoinTableRecordsArtists < ActiveRecord::Migration[7.0]
  def change
    create_join_table :records, :artists do |t|
      t.index [:record_id, :artist_id]
      t.index [:artist_id, :record_id]
    end
  end
end
