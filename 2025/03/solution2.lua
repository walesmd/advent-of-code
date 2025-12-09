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

-- Find maximum joltage for a single bank by selecting exactly 12 digits
-- Uses greedy algorithm to find lexicographically largest subsequence of length 12
local function max_joltage(bank)
  local digits = {}
  for i = 1, #bank do
    table.insert(digits, tonumber(bank:sub(i, i)))
  end
  local length = #digits
  local needed = 12

  -- If bank has fewer than 12 digits, we can't form a 12-digit number
  if length < needed then
    return 0
  end

  local selected = {}
  local start_pos = 1  -- Lua is 1-indexed, so 1 is equivalent to Ruby's 0

  -- Greedily select digits: for each position we need to fill,
  -- select the largest digit that still allows us to select enough remaining digits
  for remaining = 0, needed - 1 do
    -- We need to select (needed - remaining) more digits
    -- In Ruby: end_pos = length - (needed - remaining) (0-indexed)
    -- In Lua (1-indexed): end_pos = length - (needed - remaining) + 1
    -- But we need to ensure we can still select enough digits, so:
    -- We can look from start_pos to (length - (needed - remaining) + 1)
    local end_pos = length - (needed - remaining) + 1

    -- Find the maximum digit in the valid range
    local max_digit = -1
    local max_pos = -1

    for pos = start_pos, end_pos do
      if digits[pos] > max_digit then
        max_digit = digits[pos]
        max_pos = pos
      end
    end

    -- Select this digit and move start position forward
    table.insert(selected, max_digit)
    start_pos = max_pos + 1
  end

  -- Convert selected digits to a number
  local result = ""
  for _, digit in ipairs(selected) do
    result = result .. tostring(digit)
  end
  return tonumber(result)
end

-- Find maximum joltage for each bank and sum them
local total_joltage = 0
for _, bank in ipairs(banks) do
  total_joltage = total_joltage + max_joltage(bank)
end

print("Total output joltage: " .. total_joltage)
