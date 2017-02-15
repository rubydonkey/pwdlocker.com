class AddIndexToPasswordGroups < ActiveRecord::Migration[5.0]
  def change
    add_index :password_groups, :name, unique:true
  end
end
