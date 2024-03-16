def reverse_string(org_string):
    org_string = str(org_string)
    length = len(org_string)
    new_string = ""
    if length >= 2:
        while length >= 1:
            length -= 1
            new_string += org_string[length]
    elif length == 1:
        print("You entered a single letter: " + org_string, end = " ")
    else:
        print("No string to reverse!", end="")
    return new_string
    
print(reverse_string("Noble"))
print(reverse_string("A"))
print(reverse_string(""))
print(reverse_string("supercalifigilicous"))
name = "Amegayibor"
print(reverse_string(name))
print(reverse_string(1425))
print(reverse_string(False))
