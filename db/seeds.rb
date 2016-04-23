# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

require "csv"

csv_text = File.read(Rails.root.join("db", "2013_electric_vehicles.csv"))
csv = CSV.parse(csv_text, :headers => true)
csv.each do |row|
  s = State.new
  s.state = row["state"]
  s.electric_vehicles = row["electric_vehicles"]
  s.save
  puts "#{s.state}, #{s.electric_vehicles} saved"
end

puts "There are now #{State.count} rows in the transactions table."
