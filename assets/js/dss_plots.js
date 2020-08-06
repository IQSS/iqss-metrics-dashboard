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
    workshopNumber();
    dataFestAttendance();
    dataFestNumber();
    resOutputDepts();
    resOutputYears();
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

// Quarter 
function year_quarter() {
    d3.csv(path + "tickets_created_quarterly.csv", function (error, data) {
        
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["n_tickets", "year"]);

        d3plus.viz()
            .container(".year_quarter")
            .data(myNumData)
            .type("bar")
            .id("year")
            .x({
                "value": "year_quarter",
                "scale": "discrete",
                "label": "Year \& Quarter"
            })
            .y({
                "value": "n_tickets",
                "label": "Number of New Help Requests"
            })
            .color(d =>
                iqss_color_pallette[(new Date().getFullYear() - parseInt(d.year)) % iqss_color_pallette.length]
            )
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
    d3.csv(path + "affiliation_quarterly.csv", function (error, data) {
        if (error) return console.error(error);
        
        // color: get unique values for affiliation:

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["n_tickets", "cumulative_tickets"]);
        // console.log(myNumData)
        d3plus.viz()
            .container(".timeseriesCommunity")
            .data(myNumData)
            .type("line")
            .id("affiliation")
            .x({
                "value": "year_quarter",
                "label": "Year \& Quarter",
                "scale": "discrete",
            })
            .y({
                "value": "cumulative_tickets",
                "label": "Cumulative Requests"
            })
            // .color("affiliation")
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
    // affiliation_types.csv
    d3.csv(path + "affiliation_types.csv", function (error, data) {
        if (error) return console.error(error);
        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["order", "n_tickets"]);
        
        
        // Visualize
        d3plus.viz()
            .container(".patron_community")
            .data(myNumData)
            .type("bar")
            .id("affiliation")
            .y({
                "value": "affiliation",
                "scale": "discrete",
                "label": "Affiliation"
            })
            .x({
                "value": "n_tickets",
                "label": "Number of Help Requests"
            })
            .order({
                "sort": "asc",
                "value": "id"
            })
            .color(d => iqss_color_pallette[0])
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
    // request_types.csv
    d3.csv(path + "request_types.csv", function (error, data) {
        if (error) return console.error(error);
        
        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["n_tickets", "order"]);
        
        d3plus.viz()
            .container(".request_type")
            .data(myNumData)
            .type("bar")
            .id("request_type")
            .x({
                "value": "n_tickets",
                "label": "Number of Help Requests"
            })
            .y({
                "value": "request_type",
                "scale": "discrete",
                "label": "Type of Help Requested"
            })
            .order({
                "sort": "asc",
                "value": "order"
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
    // workshops.csv
    d3.csv(path + "workshops.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["attendees", "order"]);

        d3plus.viz()
            .container(".workshopAttendance")
            .data(myNumData)
            .type("bar")
            .id("period")
            .y({
                "value": "period",
                "scale": "discrete",
                "label": "Time Period"
            })
            .x({
                "value": "attendees",
                "label": "Number of Workshop Attendees"
            })
            .order({
                "sort": "desc",
                "value": "order"
            })
            .color(d => iqss_color_pallette[1])
            .legend(false)
            .font({
                "family": fontFamily
            })
            .resize(true)
            .draw()
    });
};

function workshopNumber() {

    d3.csv(path + "workshops.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["workshops_offered", "order"]);
        
        d3plus.viz()
            .container(".workshopNumber")
            .data(myNumData)
            .type("bar")
            .id("period")
            .y({
                "value": "period",
                "scale": "discrete",
                "label": "Time Period"
            })
            .x({
                "value": "workshops_offered",
                "label": "Number of Workshops Offered"
            })
            .order({
                "sort": "desc",
                "value": "order"
            })
            .color(d => iqss_color_pallette[1])
            .legend(false)
            .font({
                "family": fontFamily
            })
            .resize(true)
            .draw()
    });
};

// DataFest
function dataFestAttendance() {
    // zelfde
    d3.csv(path + "datafest.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["attendees", "order"]);
        console.log(myNumData)
        d3plus.viz()
            .container(".dataFestAttendance")
            .data(myNumData)
            .type("bar") 
            .id("date")
            .y({
                "value": "date",
                "scale": "discrete",
                "label": "Date"
            })
            .x({
                "value": "attendees",
                "label": "Number of DataFest Attendees"
            })
            .order({
                "sort": "desc",
                "value": "order"
            })
            .color(d => iqss_color_pallette[0])
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
    // zelfde
    d3.csv(path + "datafest.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["workshops_offered", "order"]);

        d3plus.viz()
            .container(".dataFestNumber")
            .data(myNumData)
            .type("bar")
            .id("date")
            .y({
                "value": "date",
                "scale": "discrete",
                "label": "Date"
            })
            .x({
                "value": "workshops_offered",
                "label": "Number of DataFest Workshops Offered"
            })
            .order({
                "sort": "desc",
                "value": "order"
            })
            .color(d => iqss_color_pallette[0])
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
// 
    d3.csv(path + "research_output_department.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["publications", "order"]);

        var visualization = d3plus.viz()
            .container(".resOutputDepts")
            .data(myNumData)
            .type("bar")
            .id("department")
            .y({
                "value": "department",
                "scale": "discrete",
                "label": "Department"
            })
            .format({
                "text": function (text) {
                    return text.toUpperCase()
                }
            })
            .x({
                "value": "publications",
                "label": "Number of Academic Publications"
            })
            .order({
                "sort": "asc",
                "value": "order"
            })
            .color(d => iqss_color_pallette[3])
            // .legend(false)
            .font({
                "family": fontFamily
            })
            .resize(true)
            .draw()
    });
};

function resOutputYears() {
    
    d3.csv(path + "research_output.csv", function (error, data) {
        if (error) return console.error(error);

        // Coerce data values to be numeric
        var myNumData = coerceToNum(data, ["publications", "order"]);

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
                "value": "publications",
                "label": "Number of Academic Publications"
            })
            // .order({"sort": "asc", "value": "sortby"})
            .color(d => iqss_color_pallette[3])
            // .legend(false)
            .font({
                "family": fontFamily
            })
            .resize(true)
            .draw()
    });
};