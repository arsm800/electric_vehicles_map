class CreateStations < ActiveRecord::Migration
  def change
    create_table :stations do |t|
      t.string :city
      t.string :state_abbr
      t.integer :zip
      t.string :status
      t.string :access
      t.string :network
      t.decimal :latitude
      t.decimal :longitude
      t.integer :id_number
      t.string :owner
      t.integer :fed_agency_type
      t.string :fed_agency_name
      t.string :ev_connector_types
      t.references :state, index: true, foreign_key: true
    end
  end
end
