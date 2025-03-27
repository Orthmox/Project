def writeToFile(filename,text):
    with open(filename, "w") as file:
        file.write(text)

def appendToFile(filename,text):
    with open(filename, 'a') as file:
        file.write(text)

def readFromFile(filename):
    with open(filename, 'r') as file:
        content = file.read()
        print(content)
    return content
# file = "notafile.txt"
# text = "there's nothing to see here too\n"
# appendToFile(file, text)
# readFromFile(file)
writeToFile('greet.txt', 'Hello!\n')
appendToFile('greet.txt', 'Goodbye!\n')
assert readFromFile('greet.txt') == 'Hello!\nGoodbye!\n'