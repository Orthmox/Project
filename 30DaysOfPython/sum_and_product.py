def calculateSum(numbers):
    if(numbers):
        add = 0
        for i in numbers:
            add += i
        return add
    return 0

def calculateProduct(numbers):
    if(numbers):
        product = 1
        for i in numbers:
            product *= i
        return product
    return 1

assert calculateSum([]) == 0
assert calculateSum([2, 4, 6, 8, 10]) == 30
assert calculateProduct([]) == 1
assert calculateProduct([2, 4, 6, 8, 10]) == 3840