// Run after DOM is loaded
let path =
    "assets/data/dss/"
$(document).ready(function () {
    patron_community();
    request_type();
    year_quarter();
    timeSeriesCommunity();
    workshopAttendance();
    workshopNumber();
    dataFestAttendance();
    dataFestNumber();
    resOutputDepts();
    resOutputYears();
});


// Coerce data values to be numeric (one input)
// function coerceToNum(data, variable){
//     data.forEach(function(d) {
//         d3.keys(d).forEach(function(k){
//             if(k == variable){
//                 d[k] = +d[k]
//             }
//         })
//     });
//     return data;
// };

// Coerce data values to be numeric (multiple inputs)
function coerceToNum(data, vararray) {
    if (jQuery.type(vararray) == "string") {
        data.forEach(function (d) {
            d3.keys(d).forEach(function (k) {
                if (k == vararray) {
                    d[k] = +d[k]
                }
            });
        });
    } else if (jQuery.type(vararray) == "array") {
        data.forEach(function (d) {
            d3.keys(d).forEach(function (k) {
                if (jQuery.inArray(k, vararray) != -1) {
                    d[k] = +d[k]
                }
            });
        });
    } else {
        return console.error("coerceToNum: Variables input specified incorrectly");
    }
    return data;
};


// Patron Community
function patron_community() {
    d3.csv(path + "community.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, "n");

        // Visualize
        var visualization = d3plus.viz()
            .container(".patron_community")
            .data(myNumData)
            .type("bar")
            .id("patron_community")
            .y({
                "value": "patron_community",
                "scale": "discrete",
                "label": "Affiliation"
            })
            .x({
                "value": "n",
                "label": "Number of Help Requests by Affiliation"
            })
            .order({
                "sort": "asc",
                "value": "n"
            })
            .color("col")
            .legend(false)
            .draw()
    });
};


// Request Type
function request_type() {
    d3.csv(path + "request_types.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, "n");

        var visualization = d3plus.viz()
            .container(".request_type")
            .data(myNumData)
            .type("bar")
            .id("request_type")
            .y({
                "value": "request_type",
                "scale": "discrete",
                "label": "Type of Help Requested"
            })
            .x({
                "value": "n",
                "label": "Number of Help Requests by Type"
            })
            .order({
                "sort": "asc",
                "value": "n"
            })
            .color("colRs")
            .legend(false)
            .draw()
    });
};

// Quarter
function year_quarter() {
    d3.csv(path + "year_quarter.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, "n");

        var visualization = d3plus.viz()
            .container(".year_quarter")
            .data(myNumData)
            .type("bar")
            .id("year")
            .y({
                "value": "yearQuarter",
                "scale": "discrete",
                "label": "Year \& Quarter"
            })
            .x({
                "value": "n",
                "label": "Number of New Help Requests"
            })
            .color("year")
            .legend({
                "order": {
                    "sort": "desc",
                    "value": "size"
                },
                "size": 35,
                "text": "year"
            })
            .draw()
    });
};

//

function timeSeriesCommunity() {
    d3.csv(path + "timeseries_community_quarter.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, "cumulative_tickets");

        var visualization = d3plus.viz()
            .container(".timeseriesCommunity")
            .data(myNumData)
            .type("line")
            .id("patron_community")
            .y({
                "value": "cumulative_tickets",
                "label": "Cumulative Requests"
            })
            .x({
                "value": "quarter",
                "label": "Quarter"
            })
            .title({
                "value": "Cumulative Number of Requests (Top Users)",
                "position": "bottom",
                "font": {
                    "size": "12px"
                }
            })
            //.time({"value": "quarter"})
            .draw();
    });
};


////////////////////////////////////////////////////////////////////////////////
// WORKSHOPS

// Regular workshops
function workshopAttendance() {
    d3.csv(path + "workshopAttendance.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["Attendance", "sortby"]);

        var visualization = d3plus.viz()
            .container(".workshopAttendance")
            .data(myNumData)
            .type("bar")
            .id("Period")
            .y({
                "value": "Period",
                "scale": "discrete",
                "label": "Time Period"
            })
            .x({
                "value": "Attendance",
                "label": "Number of Workshop Attendees"
            })
            .order({
                "sort": "asc",
                "value": "sortby"
            })
            // .color("")
            // .legend(false)
            .draw()
    });
};

function workshopNumber() {
    d3.csv(path + "workshopNumber.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["Number", "sortby"]);

        var visualization = d3plus.viz()
            .container(".workshopNumber")
            .data(myNumData)
            .type("bar")
            .id("Period")
            .y({
                "value": "Period",
                "scale": "discrete",
                "label": "Time Period"
            })
            .x({
                "value": "Number",
                "label": "Number of Workshops Offered"
            })
            .order({
                "sort": "asc",
                "value": "sortby"
            })
            // .color("")
            // .legend(false)
            .draw()
    });
};

// DataFest
function dataFestAttendance() {
    d3.csv(path + "dataFest.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["Attendance", "sortby"]);

        var visualization = d3plus.viz()
            .container(".dataFestAttendance")
            .data(myNumData)
            .type("bar")
            .id("Period")
            .y({
                "value": "Period",
                "scale": "discrete",
                "label": "Time Period"
            })
            .x({
                "value": "Attendance",
                "label": "Number of DataFest Attendees"
            })
            .order({
                "sort": "asc",
                "value": "sortby"
            })
            // .color("")
            // .legend(false)
            .draw()
    });
};

function dataFestNumber() {
    d3.csv(path + "dataFest.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["Number", "sortby"]);

        var visualization = d3plus.viz()
            .container(".dataFestNumber")
            .data(myNumData)
            .type("bar")
            .id("Period")
            .y({
                "value": "Period",
                "scale": "discrete",
                "label": "Time Period"
            })
            .x({
                "value": "Number",
                "label": "Number of DataFest Workshops Offered"
            })
            .order({
                "sort": "asc",
                "value": "sortby"
            })
            // .color("")
            // .legend(false)
            .draw()
    });
};

// Research Output section

function resOutputDepts() {
    d3.csv(path + "research_output_dept.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["count"]);

        var visualization = d3plus.viz()
            .container(".resOutputDepts")
            .data(myNumData)
            .type("bar")
            .id("dept")
            .y({
                "value": "dept",
                "scale": "discrete",
                "label": "Department"
            })
            .format({
                "text": function (text) {
                    return text.toUpperCase()
                }
            })
            .x({
                "value": "count",
                "label": "Number of Academic Publications"
            })
            .order({
                "sort": "asc",
                "value": "count"
            })
            // .color("")
            // .legend(false)
            .draw()
    });
};

function resOutputYears() {
    d3.csv(path + "research_output_year.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["count"]);

        var visualization = d3plus.viz()
            .container(".resOutputYears")
            .data(myNumData)
            .type("bar")
            .id("year")
            .y({
                "value": "year",
                "scale": "discrete",
                "label": "Year"
            })
            .x({
                "value": "count",
                "label": "Number of Academic Publications"
            })
            // .order({"sort": "asc", "value": "sortby"})
            // .color("")
            // .legend(false)
            .draw()
    });
};