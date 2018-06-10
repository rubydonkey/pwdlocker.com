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

ActiveRecord::Schema.define(version: 2018_06_06_191533) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "applications", force: :cascade do |t|
    t.bigint "user_id"
    t.bigint "config_var_id"
    t.string "name"
    t.string "url"
    t.index ["config_var_id"], name: "index_applications_on_config_var_id"
    t.index ["user_id"], name: "index_applications_on_user_id"
  end

  create_table "config_vars", force: :cascade do |t|
    t.bigint "user_id"
    t.string "name"
    t.string "value"
    t.index ["user_id"], name: "index_config_vars_on_user_id"
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
    t.float "work_progress", default: 0.0
    t.index ["email"], name: "index_users_on_email"
    t.index ["uid"], name: "index_users_on_uid", unique: true
  end

end
