#!/usr/bin/env ruby

# Read input
input = File.read('input1.txt').strip

# Parse banks (each line is a bank)
banks = input.lines.map(&:strip)

# Find maximum joltage for a single bank
def max_joltage(bank)
  digits = bank.chars.map(&:to_i)
  max_jolt = 0

  # Try all pairs of positions (i, j) where i < j
  (0...digits.length).each do |i|
    ((i + 1)...digits.length).each do |j|
      jolt = digits[i] * 10 + digits[j]
      max_jolt = [max_jolt, jolt].max
    end
  end

  max_jolt
end

# Find maximum joltage for each bank and sum them
total_joltage = banks.sum { |bank| max_joltage(bank) }

puts "Total output joltage: #{total_joltage}"
