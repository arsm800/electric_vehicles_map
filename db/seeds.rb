# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require "csv"

csv_text = File.read(Rails.root.join("db", "electric_vehicles.csv"))
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  s = State.new
  s.state_abbr = row["state_abbr"]
  s.state = row["state"]
  s.electric_vehicles_2013 = row["electric_vehicles_2013"]
  s.electric_vehicles_2012 = row["electric_vehicles_2012"]
  s.electric_vehicles_2011 = row["electric_vehicles_2011"]
  s.electric_vehicles_2010 = row["electric_vehicles_2010"]
  s.electric_vehicles_2009 = row["electric_vehicles_2009"]
  s.save
  puts "#{s.state_abbr}, #{s.state}, #{s.electric_vehicles_2013}, #{s.electric_vehicles_2012}, #{s.electric_vehicles_2011}, #{s.electric_vehicles_2010}, #{s.electric_vehicles_2009}, saved"
end

require "csv"

csv_text = File.read(Rails.root.join("db", "electric_fuel_stations.csv"))
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  e.name = row["name"]
  e.street_address = row["street_address"]
  e.city = row["city"]
  e.state_abbr = row["state_abbr"]
  e.zip = row["zip"]
  e.phone_no = row["phone_no"]
  e.status = row["status"]
  e.expected_date = row["expected_date"]
  e.access = row["access"]
  e.network = row["network"]
  e.latitude = row["latitude"]
  e.longitude = row["longitude"]
  e.id_number = row["id_number"]
  e.owner = row["owner"]
  e.fed_agency_type = row["fed_agency_type"]
  e.fed_agency_name = row["fed_agency_name"]
  e.open_date = row["open_date"]
  e.ev_connector_types = row["ev_connector_types"]
  e.save
  puts "#{e.name} and corresponding data saved."
end

puts "There are now #{State.count} rows in the states table and #{Station.count} rows in the stations table."
