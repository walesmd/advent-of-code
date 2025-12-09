#!/usr/bin/env php
<?php

// Read input
$input = trim(file_get_contents('input1.txt'));

// Parse banks (each line is a bank)
$banks = array_filter(array_map('trim', explode("\n", $input)));

// Find maximum joltage for a single bank
function max_joltage($bank) {
    $digits = array_map('intval', str_split($bank));
    $max_jolt = 0;

    // Try all pairs of positions (i, j) where i < j
    for ($i = 0; $i < count($digits); $i++) {
        for ($j = $i + 1; $j < count($digits); $j++) {
            $jolt = $digits[$i] * 10 + $digits[$j];
            $max_jolt = max($max_jolt, $jolt);
        }
    }

    return $max_jolt;
}

// Find maximum joltage for each bank and sum them
$total_joltage = 0;
foreach ($banks as $bank) {
    $total_joltage += max_joltage($bank);
}

echo "Total output joltage: " . $total_joltage . "\n";
