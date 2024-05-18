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