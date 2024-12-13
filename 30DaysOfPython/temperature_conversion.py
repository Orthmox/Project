def convertTemp():
    unit = input("Select unit for temperature conversion.\n1 - Convert degrees Celsius to degrees Fahrenheit.\n2 - Convert degrees Fahrenheit to degrees Celsius.\n")
    print("You selected option", unit)
    
    def convertToFahrenheit(degreesCelsius):
        #degreesCelsius = input("Input the temperature in degrees Celsius\n")
        Fahrenheit = float(degreesCelsius) * (9/5) + 32
        #print("Your temperature in degrees Fahrenheit is: ",Fahrenheit)
        return Fahrenheit
    def convertToCelsius(degreesFahrenheit):
        #degreesFahrenheit = input("Enter the temperature in degrees Fahrenheit\n")
        Celsius = (float(degreesFahrenheit) - 32) * (5/9)
        #print("Your temperature in degrees Celsius is: ",Celsius)
        return Celsius

    if int(unit) == 1:
        cel = input("Please enter your value in degrees Celsius\n")
        fah = convertToFahrenheit(float(cel))
        print("Your temperature in degrees Fahrenheit is: ",fah)
    elif int(unit) == 2:
        fah = input("Please enter your value in degrees Fahrenheit\n")
        cel = convertToCelsius(fah)
        print("Your temperature in degrees Celsius is: ",cel)
    else:
        print("You selected an incorrect option")
        exit
    # 
    #     convertToCelsius()

    assert convertToCelsius(0) == -17.77777777777778
    assert convertToCelsius(180) == 82.22222222222223
    assert convertToFahrenheit(0) == 32
    assert convertToFahrenheit(100) == 212
    assert convertToCelsius(convertToFahrenheit(15)) == 15
    assert convertToCelsius(convertToFahrenheit(42)) == 42.00000000000001

if __name__ == "__main__":
    convertTemp()
