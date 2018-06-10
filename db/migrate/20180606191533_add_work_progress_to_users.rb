class AddWorkProgressToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :work_progress, :float, default: 0.0
  end
end
