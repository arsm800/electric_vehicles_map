# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20160424215414) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "states", force: :cascade do |t|
    t.string  "state_abbr"
    t.string  "state"
    t.integer "electric_vehicles_2013"
    t.integer "electric_vehicles_2012"
    t.integer "electric_vehicles_2011"
    t.integer "electric_vehicles_2010"
    t.integer "electric_vehicles_2009"
  end

  create_table "stations", force: :cascade do |t|
    t.string  "city"
    t.string  "state_abbr"
    t.integer "zip"
    t.string  "status"
    t.string  "access"
    t.string  "network"
    t.decimal "latitude"
    t.decimal "longitude"
    t.integer "id_number"
    t.string  "owner"
    t.integer "fed_agency_type"
    t.string  "fed_agency_name"
    t.string  "ev_connector_types"
    t.integer "state_id"
  end

  add_index "stations", ["state_id"], name: "index_stations_on_state_id", using: :btree

  add_foreign_key "stations", "states"
end
