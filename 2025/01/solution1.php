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

    // Apply rotation
    if ($direction == 'L') {
        $position = ($position - $distance) % 100;
    } else { // direction == 'R'
        $position = ($position + $distance) % 100;
    }

    // Count if position is 0
    if ($position == 0) {
        $count++;
    }
}

echo $count . "\n";
