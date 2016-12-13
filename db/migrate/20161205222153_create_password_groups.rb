class CreatePasswordGroups < ActiveRecord::Migration[5.0]
  def change
    create_table :password_groups do |t|
      t.string :name, default: "empty"

      t.timestamps
    end
  end
end
