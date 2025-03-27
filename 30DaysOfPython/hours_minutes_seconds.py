def getHoursMinutesSeconds(totalSeconds):
    hms = []
    if (totalSeconds == 0):
        return str(totalSeconds)+"s"
    else:
        hours = totalSeconds // 3600
        hour_string = str(hours) + "h"
        if (hours > 0):
            hms.append(hour_string)
        minutes = (totalSeconds - (hours * 3600)) // 60
        minute_string = str(minutes) + "m"
        if(minutes > 0):
            hms.append(minute_string)
        
        seconds = totalSeconds - ((hours * 3600) + (minutes * 60))
        second_string = str(seconds) + "s"
        if(seconds > 0):
            hms.append(second_string)
        
        return ' '.join(hms)

assert getHoursMinutesSeconds(9603) == '2h 40m 3s'
assert getHoursMinutesSeconds(30) == '30s'
assert getHoursMinutesSeconds(60) == '1m'
assert getHoursMinutesSeconds(90) == '1m 30s'
assert getHoursMinutesSeconds(3600) == '1h'
assert getHoursMinutesSeconds(3601) == '1h 1s'
assert getHoursMinutesSeconds(3661) == '1h 1m 1s'
assert getHoursMinutesSeconds(90042) == '25h 42s'
assert getHoursMinutesSeconds(0) == '0s'