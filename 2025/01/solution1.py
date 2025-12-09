#!/usr/bin/env python3

input_file = 'input.txt'
position = 50
count = 0

# Process each rotation
with open(input_file, 'r') as f:
    for line in f:
        line = line.strip()
        if not line:
            continue

        # Parse rotation: L or R followed by a number
        if line[0] not in ['L', 'R']:
            continue
        
        direction = line[0]
        distance = int(line[1:])

        # Apply rotation
        if direction == 'L':
            position = (position - distance) % 100
        else:  # direction == 'R'
            position = (position + distance) % 100

        # Count if position is 0
        if position == 0:
            count += 1

print(count)
