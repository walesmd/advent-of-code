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

  # Count how many times we're at position 0 during this rotation
  # We need to count every click (1 through distance) where the dial is at 0
  if direction == 'R'
    # For right: after k clicks, position is (p + k) % 100
    first_k = (position % 100 == 0) ? 100 : (100 - (position % 100))

    if first_k <= distance
      count += 1 + (distance - first_k) / 100
    end

    position = (position + distance) % 100
  else
    # For left: after k clicks, position is (p - k) % 100
    first_k = (position % 100 == 0) ? 100 : (position % 100)

    if first_k <= distance
      count += 1 + (distance - first_k) / 100
    end

    position = (position - distance) % 100
  end
end

puts count
