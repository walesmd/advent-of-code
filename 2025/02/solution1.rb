#!/usr/bin/env ruby

input = File.read('input.txt').strip

# Parse ranges
ranges = input.split(',').map do |range_str|
  start_id, end_id = range_str.split('-').map(&:to_i)
  [start_id, end_id]
end

def invalid_id?(id)
  id_str = id.to_s
  return false if id_str.length.odd?

  # Split in half and check if both halves are equal
  half_length = id_str.length / 2
  first_half = id_str[0, half_length]
  second_half = id_str[half_length, half_length]

  first_half == second_half
end

# Find all invalid IDs in all ranges
invalid_ids = []

ranges.each do |start_id, end_id|
  (start_id..end_id).each do |id|
    invalid_ids << id if invalid_id?(id)
  end
end

# Sum all invalid IDs
sum = invalid_ids.sum

puts "Total invalid IDs found: #{invalid_ids.length}"
puts "Sum of invalid IDs: #{sum}"
