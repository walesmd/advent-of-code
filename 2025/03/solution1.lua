#!/usr/bin/env lua

-- Read input
local file = io.open('input1.txt', 'r')
local input = file:read('*all'):match('^%s*(.-)%s*$')
file:close()

-- Parse banks (each line is a bank)
local banks = {}
for line in input:gmatch('[^\r\n]+') do
  table.insert(banks, line:match('^%s*(.-)%s*$'))
end

-- Find maximum joltage for a single bank
local function max_joltage(bank)
  local digits = {}
  for i = 1, #bank do
    table.insert(digits, tonumber(bank:sub(i, i)))
  end
  local max_jolt = 0

  -- Try all pairs of positions (i, j) where i < j
  for i = 1, #digits do
    for j = i + 1, #digits do
      local jolt = digits[i] * 10 + digits[j]
      if jolt > max_jolt then
        max_jolt = jolt
      end
    end
  end

  return max_jolt
end

-- Find maximum joltage for each bank and sum them
local total_joltage = 0
for _, bank in ipairs(banks) do
  total_joltage = total_joltage + max_joltage(bank)
end

print("Total output joltage: " .. total_joltage)
