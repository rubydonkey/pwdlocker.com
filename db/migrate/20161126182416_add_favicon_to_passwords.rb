class AddFaviconToPasswords < ActiveRecord::Migration[5.0]
  def change
    add_column :passwords, :favicon_URI, :string
    add_column :passwords, :favicon_DataURI, :text
  end
end
