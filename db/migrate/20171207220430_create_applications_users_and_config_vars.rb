class CreateApplicationsUsersAndConfigVars < ActiveRecord::Migration[5.1]
  def change

    create_table :users do |t|
      ## Heroku Platform API Token
      t.string :token

      ## Database omniauthable
      t.string :provider
      t.string :uid

      ## Database authenticatable
      t.string :email,              default: ""

      ## Rememberable
      t.datetime :remember_created_at

      ## Trackable
      t.integer  :sign_in_count, default: 0, null: false
      t.datetime :current_sign_in_at
      t.datetime :last_sign_in_at
      t.inet     :current_sign_in_ip
      t.inet     :last_sign_in_ip

      t.timestamps null: false
    end

    add_index :users, :uid, unique: true
    add_index :users, :email

    create_table :config_vars do |t|
      t.belongs_to :user, index: true
      t.string :name
      t.string :value
    end

    create_table :applications do |t|
      t.belongs_to :user, index: true
      t.belongs_to :config_var, index: true
      t.string :name
      t.string :url
    end

  end
end
