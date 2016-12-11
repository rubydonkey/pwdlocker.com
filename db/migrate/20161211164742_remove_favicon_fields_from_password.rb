class RemoveFaviconFieldsFromPassword < ActiveRecord::Migration[5.0]
  def up
    remove_column :passwords, :favicon_URI
    remove_column :passwords, :favicon_DataURI
  end

  def down
    add_column :passwords, :favicon_URI, :string
    add_column :passwords, :favicon_DataURI, :text
  end
end
