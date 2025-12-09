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

        # Count how many times we're at position 0 during this rotation
        # We need to count every click (1 through distance) where the dial is at 0
        if direction == 'R':
            # For right: after k clicks, position is (p + k) % 100
            if position % 100 == 0:
                first_k = 100
            else:
                first_k = 100 - (position % 100)

            if first_k <= distance:
                count += 1 + (distance - first_k) // 100

            position = (position + distance) % 100
        else:
            # For left: after k clicks, position is (p - k) % 100
            if position % 100 == 0:
                first_k = 100
            else:
                first_k = position % 100

            if first_k <= distance:
                count += 1 + (distance - first_k) // 100

            position = (position - distance) % 100

print(count)
