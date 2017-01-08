class AddTokenSentAtToPhoneNumbers < ActiveRecord::Migration[5.0]
  def change
    add_column :phone_numbers, :token_sent_at, :datetime
  end
end
