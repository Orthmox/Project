letter = 'P'
print(letter)
print(len(letter))
greeting = "Hello, World!"
print(greeting)
print(len(greeting))

multilinestring = """For many centuries the cosmos has found
a way to perfectly align all forces in my favour.
Be it in the small or the big things,
I have always had it made"""

print(multilinestring)
print("Days\tTopics\tExercises")
# print("Week1\tWeek2\tWeek3")
print("Day1\t5\t\t6")

# Reverse a string
print(greeting[::-1])

# Skip characters while slicing
language = "Python"
print(language[0:6:2]) #format [start:end:increment-default is 1]
name = "Pythonix"
print(name[0:8:3])
print(name[0:8:1])

#formatted strings
radius = 10
pi = 3.149
area = pi * radius**2
result = "The area of a circle with radius {} is {}".format(radius, area)
print(result)

session = "{} {} {} {}".format("thirty", 'days', "of", "Python")
print(session)

company = "Coding For All"
sub = "Python For Everyone"
print(company)
print(len(company))

print(company.upper())

print(company.lower())
print(company.capitalize(), company.title(), company.swapcase())
print(company[0:6])
print(company.index("Coding"))
print(company.find("Coding"))
print(company.replace("Coding", "Python"))
print(company.split())
print("Facebook, Google, Microsoft, Apple, IBM, Oracle, Amazon".split(","))
print(company[0])
print(company[-1])
print(company[10])
abbr = company.split()
print(abbr[0][0]+abbr[1][0]+abbr[2][0])
acr = sub.split()
print(acr[0][0]+acr[1][0]+acr[2][0])

print(company.index("C"))
print(company.index("F"))
print(company.rfind("l"))
seny = "You cannot end a sentence with because because because is a conjunction"
print(seny.rfind("because"))
print(seny.find("because"))
print(seny[31:54])
print(company.startswith("Coding"))
print(company.endswith("coding"))
print(" Coding For All ".strip())
print("30DaysOfPython".isidentifier())
print("thirty_days_of_python".isidentifier())
library = ['Django', 'Flask', 'Bottle', 'Pyramid', 'Falcon']
print(", ".join(library))
print("I am enjoying this challenge.\nI just wonder what is next.")
print("Name\t\tAge\t\tCountry\t\tCity")
print("Pneumou\t\t250\t\tFinland\t\tHelsinki")
radius = 10
area = 3.14 * radius ** 2
print("The area of a circle with radius {} is {} meters square.".format(radius, area))
a = 8
b = 6
print(f'{a} + {b} = {a+b}')
print(f'{a} - {b} = {a-b}')
print(f'{a} * {b} = {a*b}')
print(f'{a} / {b} = {a/b:.2f}')
print(f'{a} % {b} = {a%b}')
print(f'{a} // {b} = {a//b}')
print(f'{a} ** {b} = {a**b}')