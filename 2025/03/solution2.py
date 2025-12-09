#!/usr/bin/env python3

# Read input
with open('input1.txt', 'r') as f:
    input_text = f.read().strip()

# Parse banks (each line is a bank)
banks = [line.strip() for line in input_text.split('\n') if line.strip()]

# Find maximum joltage for a single bank by selecting exactly 12 digits
# Uses greedy algorithm to find lexicographically largest subsequence of length 12
def max_joltage(bank):
    digits = [int(c) for c in bank]
    length = len(digits)
    needed = 12

    # If bank has fewer than 12 digits, we can't form a 12-digit number
    if length < needed:
        return 0

    selected = []
    start_pos = 0

    # Greedily select digits: for each position we need to fill,
    # select the largest digit that still allows us to select enough remaining digits
    for remaining in range(needed):
        # We need to select (needed - remaining) more digits
        # So we can look from start_pos to (length - (needed - remaining) + 1)
        end_pos = length - (needed - remaining)

        # Find the maximum digit in the valid range
        max_digit = -1
        max_pos = -1

        for pos in range(start_pos, end_pos + 1):
            if digits[pos] > max_digit:
                max_digit = digits[pos]
                max_pos = pos

        # Select this digit and move start position forward
        selected.append(max_digit)
        start_pos = max_pos + 1

    # Convert selected digits to a number
    return int(''.join(str(d) for d in selected))

# Find maximum joltage for each bank and sum them
total_joltage = sum(max_joltage(bank) for bank in banks)

print(f"Total output joltage: {total_joltage}")
