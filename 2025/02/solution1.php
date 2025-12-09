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
    if ($length % 2 != 0) {
        return false;
    }

    // Split in half and check if both halves are equal
    $half_length = $length / 2;
    $first_half = substr($id_str, 0, $half_length);
    $second_half = substr($id_str, $half_length, $half_length);

    return $first_half == $second_half;
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
