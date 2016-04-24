class CreateStates < ActiveRecord::Migration
  def change
    create_table :states do |t|
      t.string :state_abbr
      t.string :state
      t.integer :electric_vehicles_2013
      t.integer :electric_vehicles_2012
      t.integer :electric_vehicles_2011
      t.integer :electric_vehicles_2010
      t.integer :electric_vehicles_2009
    end
  end
end
