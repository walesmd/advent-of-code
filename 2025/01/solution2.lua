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

  -- Count how many times we're at position 0 during this rotation
  -- We need to count every click (1 through distance) where the dial is at 0
  if direction == 'R' then
    -- For right: after k clicks, position is (p + k) % 100
    local first_k
    if position % 100 == 0 then
      first_k = 100
    else
      first_k = 100 - (position % 100)
    end

    if first_k <= distance then
      count = count + 1 + math.floor((distance - first_k) / 100)
    end

    position = (position + distance) % 100
  else
    -- For left: after k clicks, position is (p - k) % 100
    local first_k
    if position % 100 == 0 then
      first_k = 100
    else
      first_k = position % 100
    end

    if first_k <= distance then
      count = count + 1 + math.floor((distance - first_k) / 100)
    end

    position = (position - distance) % 100
  end

  ::continue::
end

print(count)
