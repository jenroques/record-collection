class CreateRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :records do |t|
      t.string :title
      t.string :image_url
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :collection, null: false, foreign_key: true

      t.timestamps
    end
  end
end
