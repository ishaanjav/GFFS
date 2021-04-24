// Convert 3/4 digit time to String
export function convert(a) {
    a = String(a)
    var minute = a.substring(a.length - 2, a.length)
    var hour = a.substring(0, a.length / 2)
    var ending = "AM";
    if (parseInt(hour) > 12) {
        hour = parseInt(hour) - 12;
        ending = "PM"
    }
    // console.log(hour, minute, ending)
    return hour + ":" + minute + " " + ending
}
