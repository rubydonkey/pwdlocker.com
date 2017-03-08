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


ActiveRecord::Schema.define(version: 20170112223043) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "favicons", force: :cascade do |t|
    t.string   "host"
    t.text     "data"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "password_groups", force: :cascade do |t|
    t.string   "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
<<<<<<< HEAD
=======
    t.index ["name"], name: "index_password_groups_on_name", unique: true, using: :btree
>>>>>>> ca001583b7aa6aae0a7bc431fe9ee43af3d476cb
  end

  create_table "passwords", force: :cascade do |t|
    t.string   "title"
    t.string   "URL"
    t.string   "username"
    t.text     "password"
<<<<<<< HEAD
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
    t.integer  "password_group_id"
    t.integer  "favicon_id"
=======
    t.datetime "created_at",               null: false
    t.datetime "updated_at",               null: false
    t.integer  "favicon_id"
    t.integer  "password_group_id"
    t.datetime "password_last_changed_at"
>>>>>>> ca001583b7aa6aae0a7bc431fe9ee43af3d476cb
    t.index ["favicon_id"], name: "index_passwords_on_favicon_id", using: :btree
  end

  create_table "phone_numbers", force: :cascade do |t|
    t.string   "number"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "token_digest"
    t.datetime "token_sent_at"
  end

  add_foreign_key "passwords", "favicons"
end
