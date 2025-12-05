#!/usr/bin/env ruby

input = File.read('input.txt').strip

# Parse ranges
ranges = input.split(',').map do |range_str|
  start_id, end_id = range_str.split('-').map(&:to_i)
  [start_id, end_id]
end

def invalid_id?(id)
  id_str = id.to_s
  length = id_str.length

  # Try all possible pattern lengths from 1 to length/2
  # (need at least 2 repetitions, so pattern can be at most length/2)
  (1..(length / 2)).each do |pattern_length|
    # Check if length is divisible by pattern_length
    next unless length % pattern_length == 0

    repetitions = length / pattern_length
    # Need at least 2 repetitions
    next if repetitions < 2

    # Extract the pattern (first pattern_length characters)
    pattern = id_str[0, pattern_length]

    # Check if repeating the pattern repetitions times equals the whole string
    if pattern * repetitions == id_str
      return true
    end
  end

  false
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
