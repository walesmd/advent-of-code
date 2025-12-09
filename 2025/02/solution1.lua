#!/usr/bin/env lua

local input = io.open('input.txt', 'r'):read('*all'):match('^%s*(.-)%s*$')

-- Parse ranges
local ranges = {}
for range_str in input:gmatch('[^,]+') do
  local start_id, end_id = range_str:match('(%d+)-(%d+)')
  table.insert(ranges, {tonumber(start_id), tonumber(end_id)})
end

local function invalid_id(id)
  local id_str = tostring(id)
  local length = #id_str
  if length % 2 ~= 0 then
    return false
  end

  -- Split in half and check if both halves are equal
  local half_length = length / 2
  local first_half = id_str:sub(1, half_length)
  local second_half = id_str:sub(half_length + 1, length)

  return first_half == second_half
end

-- Find all invalid IDs in all ranges
local invalid_ids = {}

for _, range in ipairs(ranges) do
  local start_id, end_id = range[1], range[2]
  for id = start_id, end_id do
    if invalid_id(id) then
      table.insert(invalid_ids, id)
    end
  end
end

-- Sum all invalid IDs
local sum = 0
for _, id in ipairs(invalid_ids) do
  sum = sum + id
end

print("Total invalid IDs found: " .. #invalid_ids)
print("Sum of invalid IDs: " .. sum)
