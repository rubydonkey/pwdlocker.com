class AddIndexToPasswordsPasswordGroupId < ActiveRecord::Migration[5.0]
  def change
    add_index :passwords, :password_group_id
  end
end
