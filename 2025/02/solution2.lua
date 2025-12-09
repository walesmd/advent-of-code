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

  -- Try all possible pattern lengths from 1 to length/2
  -- (need at least 2 repetitions, so pattern can be at most length/2)
  for pattern_length = 1, math.floor(length / 2) do
    -- Check if length is divisible by pattern_length
    if length % pattern_length ~= 0 then
      goto continue
    end

    local repetitions = length / pattern_length
    -- Need at least 2 repetitions
    if repetitions < 2 then
      goto continue
    end

    -- Extract the pattern (first pattern_length characters)
    local pattern = id_str:sub(1, pattern_length)

    -- Check if repeating the pattern repetitions times equals the whole string
    local repeated = ""
    for i = 1, repetitions do
      repeated = repeated .. pattern
    end

    if repeated == id_str then
      return true
    end

    ::continue::
  end

  return false
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
