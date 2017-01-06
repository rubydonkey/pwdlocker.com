class AddPasswordLastChangedAtToPasswords < ActiveRecord::Migration[5.0]
  def change
    add_column :passwords, :password_last_changed_at, :datetime, default: nil
  end
end
