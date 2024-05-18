def area_triangle():
    print("Area of a triangle")
    base = int(input("Enter length of triangle's base: "))
    height = int(input("Enter height of triangle: "))
    area = (0.5 * base) * height
    return area


def perimeter_triangle():
    print("Perimeter of a triangle")
    side_a = int(input("Enter side A: "))
    side_b = int(input("Enter side B: "))
    side_c = int(input("Enter side C: "))
    perimeter = side_a + side_b + side_c

    return perimeter

def rectangle_area_perimeter():
    print("Area of a rectangle")
    length = int(input("Enter length of rectangle: "))
    width = int(input("Enter width of rectangle: "))
    area = length * width
    perimeter = 2 * (length * width)

    return "Area of rectangle is {}, perimeter of rectangle is {}".format(area, perimeter)

def print_triangle(size):
    if size > 0:
        for i in range(1, size):
            print(' ' * (size-i) + '#' * i)
    else:
        print()


#print_triangle(9)

def area_circle():
    print("Area of a circle")
    radius = int(input("Enter radius of circle: "))
    pi = 3.14
    area = pi * (radius**2)
    circumference = 2 * (pi * radius)

    return "Area of the circle is {}. \nCircumference of the circle is {}".format(area, circumference)

def weekly_earning():
    print("Calculate your weekly earnings.")
    hours = float(input("Enter your total hours for the week: "))
    rate = float(input("Enter rate per hour: "))
    earning = rate * hours

    return "Your weekly earning is {}".format(earning)

def seconds_lived():
    print("Find out how many seconds you have lived")
    age = int(input("Enter your age: "))
    seconds_per_year = 365*24*60*60
    lived_seconds = age * seconds_per_year

    return "You have lived for {} seconds.".format(lived_seconds)


def table_print(size):
    table = ""
    if size >= 1:
        for i in range(1, size+1):
            print("{} {} {} {} {}".format(i, i**0, i**1, i**2, i**3))
    


table_print(9)