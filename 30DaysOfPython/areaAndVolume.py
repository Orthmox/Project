def area(length, width):
    try:
        if length < 0 or width < 0:
            raise ValueError
        return length * width
    except ValueError:
        return "Error: All inputs must be positive number"
    except TypeError:
        return "Error: All inputs must be numbers"

def perimeter(length, width):
    try:
        if length < 0 or width < 0:
            raise ValueError
        return 2 * (length + width)
    except ValueError:
        return "Error: All inputs must be positive numbers"
    except TypeError:
        return "Error: All inputs must be numbers"

def volume(length, width, height):
    try:
        if length < 0 or width < 0 or height < 0:
            raise ValueError
        return length * width * height
    except ValueError:
        return "Error: All inputs must be positive numbers"
    except TypeError:
        return "Error: All inputs must be numbers"

def surfaceArea(length, width, height):
    try:
        if length < 0 or width < 0 or height < 0:
            raise ValueError
        return (length * width * 2) + (width * height * 2) + (length * height * 2)
    except ValueError:
        return "Error: All inputs must be positive numbers"
    except TypeError:
        return "Error: All inputs must be numbers"

assert area(10, 10) == 100
assert area(0, 9999) == 0
assert area(5, 8) == 40
assert perimeter(10, 10) == 40
assert perimeter(0, 9999) == 19998
assert perimeter(5, 8) == 26
assert volume(10, 10, 10) == 1000
assert volume(9999, 0, 9999) == 0
assert volume(5, 8, 10) == 400
assert surfaceArea(10, 10, 10) == 600
assert surfaceArea(9999, 0, 9999) == 199960002
assert surfaceArea(5, 8, 10) == 340

print(volume(10,-6,"hello"))