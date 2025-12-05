#!/usr/bin/env ruby

input_file = 'input.txt'
position = 50
count = 0

# Process each rotation
File.readlines(input_file).each do |line|
  line = line.strip
  next if line.empty?

  # Parse rotation: L or R followed by a number
  match = line.match(/^([LR])(\d+)$/)

  direction = match[1]
  distance = match[2].to_i

  # Apply rotation
  if direction == 'L'
    position = (position - distance) % 100
  else # direction == 'R'
    position = (position + distance) % 100
  end

  # Count if position is 0
  count += 1 if position == 0
end

puts count
