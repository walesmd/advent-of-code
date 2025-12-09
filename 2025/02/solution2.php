#!/usr/bin/env php
<?php

$input = trim(file_get_contents('input.txt'));

// Parse ranges
$ranges = [];
foreach (explode(',', $input) as $range_str) {
    list($start_id, $end_id) = explode('-', $range_str);
    $ranges[] = [(int)$start_id, (int)$end_id];
}

function invalid_id($id) {
    $id_str = (string)$id;
    $length = strlen($id_str);

    // Try all possible pattern lengths from 1 to length/2
    // (need at least 2 repetitions, so pattern can be at most length/2)
    for ($pattern_length = 1; $pattern_length <= $length / 2; $pattern_length++) {
        // Check if length is divisible by pattern_length
        if ($length % $pattern_length != 0) {
            continue;
        }

        $repetitions = $length / $pattern_length;
        // Need at least 2 repetitions
        if ($repetitions < 2) {
            continue;
        }

        // Extract the pattern (first pattern_length characters)
        $pattern = substr($id_str, 0, $pattern_length);

        // Check if repeating the pattern repetitions times equals the whole string
        if (str_repeat($pattern, $repetitions) == $id_str) {
            return true;
        }
    }

    return false;
}

// Find all invalid IDs in all ranges
$invalid_ids = [];

foreach ($ranges as $range) {
    list($start_id, $end_id) = $range;
    for ($id = $start_id; $id <= $end_id; $id++) {
        if (invalid_id($id)) {
            $invalid_ids[] = $id;
        }
    }
}

// Sum all invalid IDs
$sum = array_sum($invalid_ids);

echo "Total invalid IDs found: " . count($invalid_ids) . "\n";
echo "Sum of invalid IDs: " . $sum . "\n";
