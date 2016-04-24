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

puts "There are now #{State.count} rows in the transactions table."
