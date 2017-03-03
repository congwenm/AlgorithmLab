require 'csv'

CSV.parse("CSV,\"weather \"\"is good\"\"\",String") do |row|
  puts row
end
