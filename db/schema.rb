# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20171207220430) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applications", force: :cascade do |t|
    t.bigint "config_var_id"
    t.string "name"
    t.string "url"
    t.index ["config_var_id"], name: "index_applications_on_config_var_id"
  end

  create_table "config_vars", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.string "value"
    t.index ["user_id"], name: "index_config_vars_on_user_id"
  end

  create_table "favicons", id: :serial, force: :cascade do |t|
    t.string "host"
    t.text "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "password_groups", id: :serial, force: :cascade do |t|
    t.string "name", default: "empty"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_password_groups_on_name", unique: true
  end

  create_table "passwords", id: :serial, force: :cascade do |t|
    t.string "title"
    t.string "URL"
    t.string "username"
    t.text "password"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "password_group_id"
    t.integer "favicon_id"
    t.datetime "password_last_changed_at"
    t.index ["favicon_id"], name: "index_passwords_on_favicon_id"
    t.index ["password_group_id"], name: "index_passwords_on_password_group_id"
  end

  create_table "phone_numbers", id: :serial, force: :cascade do |t|
    t.string "number"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "token_digest"
    t.datetime "token_sent_at"
  end

  create_table "users", force: :cascade do |t|
    t.string "token"
    t.string "provider"
    t.string "uid"
    t.string "email", default: ""
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["email"], name: "index_users_on_email"
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

  add_foreign_key "passwords", "favicons"
end
