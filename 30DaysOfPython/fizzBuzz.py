def fizzBuzz(upTo):
    try:
        if upTo < 1:
            raise ValueError
        for i in range(1,upTo + 1):
            if i % 15 == 0:
                print("FizzBuzz",end=" ")
            elif i % 5 == 0:
                print("Buzz",end=" ")
            elif i % 3 == 0:
                print("Fizz",end=" ")
            else:
                print(i,end=" ")
    except ValueError:
        print("Error: Please input a positive integer")
        return "Error: Please input a positive integer"
    except TypeError:
        print("Error: Please input a positive integer")
        return "Error: Please input a positive integer"

