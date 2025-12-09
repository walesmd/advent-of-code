#!/usr/bin/env python3

with open('input.txt', 'r') as f:
    input_text = f.read().strip()

# Parse ranges
ranges = []
for range_str in input_text.split(','):
    start_id, end_id = map(int, range_str.split('-'))
    ranges.append((start_id, end_id))

def invalid_id(id):
    id_str = str(id)
    length = len(id_str)
    if length % 2 != 0:
        return False

    # Split in half and check if both halves are equal
    half_length = length // 2
    first_half = id_str[:half_length]
    second_half = id_str[half_length:]

    return first_half == second_half

# Find all invalid IDs in all ranges
invalid_ids = []

for start_id, end_id in ranges:
    for id in range(start_id, end_id + 1):
        if invalid_id(id):
            invalid_ids.append(id)

# Sum all invalid IDs
sum_total = sum(invalid_ids)

print(f"Total invalid IDs found: {len(invalid_ids)}")
print(f"Sum of invalid IDs: {sum_total}")
