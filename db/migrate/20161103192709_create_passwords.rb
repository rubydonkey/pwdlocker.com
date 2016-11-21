class CreatePasswords < ActiveRecord::Migration[5.0]
  def change
    create_table :passwords do |t|
      t.string :title
      t.string :URL
      t.string :username
      t.text :password

      t.timestamps
    end
  end
end
