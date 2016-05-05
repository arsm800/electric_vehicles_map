class AddLatitudeLongitudeToVehicles < ActiveRecord::Migration
  def change
    add_column :states, :latitude, :decimal
    add_column :states, :longitude, :decimal
  end
end
