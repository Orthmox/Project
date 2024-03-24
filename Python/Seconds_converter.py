def convert_seconds(seconds):
    hours = seconds // 3600
    minutes = (seconds - hours * 3600) // 60
    remaining_seconds = seconds - (hours * 3600 + minutes * 60)
    return hours, minutes, remaining_seconds

hours, minutes, seconds = convert_seconds(7209)
hour, minute, second = convert_seconds(937499)
print("start")
print(hours, "hours :", minutes, "minutes :", seconds, "seconds")
print(hour, minute, second)
print("finish")