#!/usr/bin/env python3

# Read input
with open('input1.txt', 'r') as f:
    input_text = f.read().strip()

# Parse banks (each line is a bank)
banks = [line.strip() for line in input_text.split('\n') if line.strip()]

# Find maximum joltage for a single bank
def max_joltage(bank):
    digits = [int(c) for c in bank]
    max_jolt = 0

    # Try all pairs of positions (i, j) where i < j
    for i in range(len(digits)):
        for j in range(i + 1, len(digits)):
            jolt = digits[i] * 10 + digits[j]
            max_jolt = max(max_jolt, jolt)

    return max_jolt

# Find maximum joltage for each bank and sum them
total_joltage = sum(max_joltage(bank) for bank in banks)

print(f"Total output joltage: {total_joltage}")
