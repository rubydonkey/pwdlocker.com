class AddPasswordGroupIdToPasswords < ActiveRecord::Migration[5.0]
  def change
    add_column :passwords, :password_group_id, :integer
  end
end
