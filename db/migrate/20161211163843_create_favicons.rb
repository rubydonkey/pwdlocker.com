class CreateFavicons < ActiveRecord::Migration[5.0]
  def change
    create_table :favicons do |t|
      t.string :host
      t.text :data
      t.timestamps
    end

    add_reference :passwords, :favicon, index: true
    add_foreign_key :passwords, :favicons
  end
end
