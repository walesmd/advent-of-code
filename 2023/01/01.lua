-- Read input file
local lines = {}
local file = io.open("input.txt", "r")
for line in file:lines() do
    table.insert(lines, line)
end
file:close()

-- Process each line to find calibration values
local calibrationCodes = {}
for _, line in ipairs(lines) do
    local firstDigit, lastDigit
    
    -- Find first digit
    for i = 1, #line do
        local char = line:sub(i,i)
        if tonumber(char) then
            firstDigit = char
            break
        end
    end
    
    -- Find last digit
    for i = #line, 1, -1 do
        local char = line:sub(i,i)
        if tonumber(char) then
            lastDigit = char
            break
        end
    end
    
    -- Combine digits and add to calibration codes
    if firstDigit and lastDigit then
        local calibrationValue = tonumber(firstDigit .. lastDigit)
        table.insert(calibrationCodes, calibrationValue)
    end
end

-- Sum all calibration codes
local sum = 0
for _, code in ipairs(calibrationCodes) do
    sum = sum + code
end

print("Sum of calibration values:", sum)