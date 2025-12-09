#!/usr/bin/env ruby

# Read input
input = File.read('input1.txt').strip

# Parse banks (each line is a bank)
banks = input.lines.map(&:strip)

# Find maximum joltage for a single bank by selecting exactly 12 digits
# Uses greedy algorithm to find lexicographically largest subsequence of length 12
def max_joltage(bank)
  digits = bank.chars.map(&:to_i)
  length = digits.length
  needed = 12

  # If bank has fewer than 12 digits, we can't form a 12-digit number
  return 0 if length < needed

  selected = []
  start_pos = 0

  # Greedily select digits: for each position we need to fill,
  # select the largest digit that still allows us to select enough remaining digits
  needed.times do |remaining|
    # We need to select (needed - remaining) more digits
    # So we can look from start_pos to (length - (needed - remaining) + 1)
    end_pos = length - (needed - remaining)

    # Find the maximum digit in the valid range
    max_digit = -1
    max_pos = -1

    (start_pos..end_pos).each do |pos|
      if digits[pos] > max_digit
        max_digit = digits[pos]
        max_pos = pos
      end
    end

    # Select this digit and move start position forward
    selected << max_digit
    start_pos = max_pos + 1
  end

  # Convert selected digits to a number
  selected.join.to_i
end

# Find maximum joltage for each bank and sum them
total_joltage = banks.sum { |bank| max_joltage(bank) }

puts "Total output joltage: #{total_joltage}"
