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

    # Try all possible pattern lengths from 1 to length/2
    # (need at least 2 repetitions, so pattern can be at most length/2)
    for pattern_length in range(1, length // 2 + 1):
        # Check if length is divisible by pattern_length
        if length % pattern_length != 0:
            continue

        repetitions = length // pattern_length
        # Need at least 2 repetitions
        if repetitions < 2:
            continue

        # Extract the pattern (first pattern_length characters)
        pattern = id_str[:pattern_length]

        # Check if repeating the pattern repetitions times equals the whole string
        if pattern * repetitions == id_str:
            return True

    return False

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
