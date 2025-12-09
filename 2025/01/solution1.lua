#!/usr/bin/env lua

local input_file = 'input.txt'
local position = 50
local count = 0

-- Process each rotation
for line in io.lines(input_file) do
  line = line:match("^%s*(.-)%s*$")  -- strip whitespace
  if line == "" then
    goto continue
  end

  -- Parse rotation: L or R followed by a number
  local direction, distance_str = line:match("^([LR])(%d+)$")
  if not direction then
    goto continue
  end

  local distance = tonumber(distance_str)

  -- Apply rotation
  if direction == 'L' then
    position = (position - distance) % 100
  else -- direction == 'R'
    position = (position + distance) % 100
  end

  -- Count if position is 0
  if position == 0 then
    count = count + 1
  end

  ::continue::
end

print(count)
