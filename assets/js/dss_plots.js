// D3 help for this version 
// https: //github.com/alexandersimoes/d3plus/wiki/Visualizations

// Run after DOM is loaded
let path = "assets/data/dss/";
let fontFamily = "Montserrat";


$(document).ready(function () {
    year_quarter(); //1
    timeSeriesCommunity(); //2
    patron_community(); //3
    request_type();
    workshopAttendance();
    // workshopNumber();
    // dataFestAttendance();
    // dataFestNumber();
    // resOutputDepts();
    // resOutputYears();
});

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

// Quarter #OK (1)
function year_quarter() {
    d3.csv(path + "year_quarter.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["n", "year"]);

        d3plus.viz()
            .container(".year_quarter")
            .data(myNumData)
            .type("bar")
            .id("year")
            .x({
                "value": "yearQuarter",
                "scale": "discrete",
                "label": "Year \& Quarter"
            })
            .y({
                "value": "n",
                "label": "Number of New Help Requests"
            })
            .color(d =>
                iqss_color_pallette[(new Date().getFullYear() - parseInt(d.year)) % iqss_color_pallette.length]
            )
            // .legend({
            //     "order": {
            //         "sort": "asc",
            //         "value": "year"
            //     },
            //     "size": 50,
            //     // "text": "year"
            // })
            .legend(false)
            .font({
                "family": fontFamily
            })
            .height({
                "max": false
            })
            .resize(true)
            .draw()
    });
};


//#OK (2)
function timeSeriesCommunity() {
    d3.csv(path + "timeseries_community_quarter.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, "cumulative_tickets");
        // console.log(myNumData)
        d3plus.viz()
            // .title({
            //     "value": "Cumulative Number of Requests (Top Users)",
            //     "position": "bottom",
            //     "font": {
            //         "size": "12px"
            //     }
            // })
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
            .color("patron_community")
            .legend({
                "order": {
                    "sort": "asc",
                    // "value": "patron_community"
                },
                "size": 75,
                // "text": "patron_community",
                // "filters": true,
                // "icons": true,

            })
            .font({
                "family": fontFamily
            })
            .resize(true)
            //.time({"value": "quarter"})
            .draw();
    });
};

// Patron Community (3)
function patron_community() {
    d3.tsv(path + "dss_community.tsv", function (error, data) {
        if (error) return console.error(error);
        
        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, "n");
        myNumData = coerceToNum(myNumData, "id");
        // data_aggr = create_rest_category(myNumData, 0.005, "n", "patron_community")
        
        // Visualize
        d3plus.viz()
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
                "label": "Number of Help Requests"
            })
            .order({
                "sort": "desc",
                "value": "id"
            })
            .color(d => iqss_color_pallette[1])
            .legend(false)
            .font({
                "family": fontFamily,
                "transform": "none"
            })
            .resize(true)
            .draw()
    });
};




// Request Type (4)
function request_type() {
    d3.tsv(path + "dss_request_types.tsv", function (error, data) {
        if (error) return console.error(error);
        

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, "n");
        myNumData = coerceToNum(myNumData, "id");
        // let data_aggr = create_rest_category(myNumData, 0.01, "n", "request_type")
        
        d3plus.viz()
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
                "label": "Number of Help Requests"
            })
            .order({
                "sort": "desc",
                "value": "id"
            })
            .color(d => iqss_color_pallette[0])
            .legend(false)
            .font({
                "family": fontFamily
            })
            .resize(true)
            .draw()
    });
};



//




////////////////////////////////////////////////////////////////////////////////
// WORKSHOPS

// Regular workshops (5)
function workshopAttendance() {
    d3.csv(path + "workshops.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["Attendance", "sortby"]);

        d3plus.viz()
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
            .color(d => iqss_color_pallette[0])
            .legend(false)
            .font({
                "family": fontFamily
            })
            .resize(true)
            .draw()
    });
};

function workshopNumber() {
    d3.csv(path + "workshopNumber.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["Number", "sortby"]);

        d3plus.viz()
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
            .font({
                "family": fontFamily
            })
            .resize(true)
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
            .font({
                "family": fontFamily
            })
            .resize(true)
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
            .font({
                "family": fontFamily
            })
            .resize(true)
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
            .font({
                "family": fontFamily
            })
            .resize(true)
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
            .font({
                "family": fontFamily
            })
            .resize(true)
            .draw()
    });
};