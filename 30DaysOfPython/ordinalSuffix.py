def ordinalSuffix(number):
    try:
        if number < 0:
            raise ValueError("Error: Input must be a positive integer")
        numstring = str(number)
        lastDigit = numstring[-1:]
        lastTwoDigits = numstring[-2:]
        if lastTwoDigits in ('11', '12', '13') and len(numstring) < 3:
            return numstring + "th"
        if lastDigit == '1':
            return numstring + "st"
        if lastDigit == '2':
            return numstring + "nd"
        if lastDigit == '3':
            return numstring + "rd"
        else:
            return numstring + "th"
    except (ValueError, TypeError):
        return "Error: Input must be a positive integer"
    
assert ordinalSuffix(0) == '0th'
# print(ordinalSuffix(1))
assert ordinalSuffix(2) == '2nd'
assert ordinalSuffix(3) == '3rd'
assert ordinalSuffix(4) == '4th'
assert ordinalSuffix(10) == '10th'
assert ordinalSuffix(11) == '11th'
assert ordinalSuffix(12) == '12th'
assert ordinalSuffix(13) == '13th'
assert ordinalSuffix(14) == '14th'
assert ordinalSuffix(101) == '101st'
assert ordinalSuffix(23) == '23rd'
assert ordinalSuffix(111) == '111st'