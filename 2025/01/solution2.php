#!/usr/bin/env php
<?php

$input_file = 'input.txt';
$position = 50;
$count = 0;

// Process each rotation
$lines = file($input_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
foreach ($lines as $line) {
    $line = trim($line);
    if (empty($line)) {
        continue;
    }

    // Parse rotation: L or R followed by a number
    if (!preg_match('/^([LR])(\d+)$/', $line, $matches)) {
        continue;
    }

    $direction = $matches[1];
    $distance = (int)$matches[2];

    // Count how many times we're at position 0 during this rotation
    // We need to count every click (1 through distance) where the dial is at 0
    if ($direction == 'R') {
        // For right: after k clicks, position is (p + k) % 100
        if ($position % 100 == 0) {
            $first_k = 100;
        } else {
            $first_k = 100 - ($position % 100);
        }

        if ($first_k <= $distance) {
            $count += 1 + intval(($distance - $first_k) / 100);
        }

        $position = ($position + $distance) % 100;
    } else {
        // For left: after k clicks, position is (p - k) % 100
        if ($position % 100 == 0) {
            $first_k = 100;
        } else {
            $first_k = $position % 100;
        }

        if ($first_k <= $distance) {
            $count += 1 + intval(($distance - $first_k) / 100);
        }

        $position = ($position - $distance) % 100;
    }
}

echo $count . "\n";
