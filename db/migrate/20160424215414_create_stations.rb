class CreateStations < ActiveRecord::Migration
  def change
    create_table :stations do |t|
      t.string :name
      t.string :street_address
      t.string :city
      t.string :state_abbr
      t.intger :zip
      t.string :phone_no
      t.string :status
      t.string :expected_date
      t.string :access
      t.string :network
      t.number :latitude
      t.number :longitude
      t.integer :id_number
      t.string :owner
      t.integer :fed_agency_type
      t.string :fed_agency_name
      t.string :open_date
      t.string :ev_connector_types
      t.references :state, index: true, foreign_key: true
    end
  end
end
