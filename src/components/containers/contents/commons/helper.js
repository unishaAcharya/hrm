const helpers = {
    convertTo12Hours: function (time) {
        var ts = time;
        var H = +ts.substr(0, 2);
        var h = (H % 12) || 12;
        h = (h < 10) ? ("0" + h) : h;
        var ampm = H < 12 ? " AM" : " PM";
        ts = h + ts.substr(2, 3) + ampm;
        return ts;
    },
    convertTo24Hours: function (time) {
        var PM = time.match('PM') ? true : false

        time = time.split(':')
        var min = time[1]

        if (PM) {
            var hour = 12 + parseInt(time[0], 10)
        } else {
            var hour = time[0]
        }
        return (hour + ':' + min).replace(/(AM|PM)/, '').replace(/\s+/g, '')
    }
}

export default helpers;