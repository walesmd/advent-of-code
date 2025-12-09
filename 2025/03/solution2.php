#!/usr/bin/env php
<?php

// Read input
$input = trim(file_get_contents('input1.txt'));

// Parse banks (each line is a bank)
$banks = array_filter(array_map('trim', explode("\n", $input)));

// Find maximum joltage for a single bank by selecting exactly 12 digits
// Uses greedy algorithm to find lexicographically largest subsequence of length 12
function max_joltage($bank) {
    $digits = array_map('intval', str_split($bank));
    $length = count($digits);
    $needed = 12;

    // If bank has fewer than 12 digits, we can't form a 12-digit number
    if ($length < $needed) {
        return 0;
    }

    $selected = [];
    $start_pos = 0;

    // Greedily select digits: for each position we need to fill,
    // select the largest digit that still allows us to select enough remaining digits
    for ($remaining = 0; $remaining < $needed; $remaining++) {
        // We need to select (needed - remaining) more digits
        // So we can look from start_pos to (length - (needed - remaining) + 1)
        $end_pos = $length - ($needed - $remaining);

        // Find the maximum digit in the valid range
        $max_digit = -1;
        $max_pos = -1;

        for ($pos = $start_pos; $pos <= $end_pos; $pos++) {
            if ($digits[$pos] > $max_digit) {
                $max_digit = $digits[$pos];
                $max_pos = $pos;
            }
        }

        // Select this digit and move start position forward
        $selected[] = $max_digit;
        $start_pos = $max_pos + 1;
    }

    // Convert selected digits to a number
    return (int)implode('', $selected);
}

// Find maximum joltage for each bank and sum them
$total_joltage = 0;
foreach ($banks as $bank) {
    $total_joltage += max_joltage($bank);
}

echo "Total output joltage: " . $total_joltage . "\n";
