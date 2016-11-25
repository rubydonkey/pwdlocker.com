class AlterColumnPasswordTypeInPasswords < ActiveRecord::Migration[5.0]
  def self.up
    change_table :passwords do |t|
      t.change :password, :text
    end
  end

  def self.down
    change_table :passwords do |t|
      t.change :password, :string
    end
  end
end
