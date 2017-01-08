class AddTokenDigestToPhoneNumbers < ActiveRecord::Migration[5.0]
  def change
    add_column :phone_numbers, :token_digest, :string
  end
end
