def getSmallest(numbers):
    # elem = all(isinstance(x,(int,float)) for x in numbers)
    if(numbers):
        smallest = numbers[0]
        for i in numbers:
            if i < smallest:
                smallest = i
        return smallest
    
    return None

def getBiggest(numbers):
    if(numbers):
        biggest = numbers[0]
        for i in numbers:
            if i > biggest:
                biggest = i
        return biggest
    else:
        isinsta
        return None


lit = [3,4,1,34,12,45,-1]
alp = ['am','we', 'they', 'you']
print(getSmallest(lit))
print(getSmallest(alp))
print(getBiggest(lit))
assert getSmallest([1, 2, 3]) == 1
assert getSmallest([3, 2, 1]) == 1
assert getSmallest([28, 25, 42, 2, 28]) == 2
assert getSmallest([1]) == 1
assert getSmallest([]) == None