// D3 help for this version 
// https: //github.com/alexandersimoes/d3plus/wiki/Visualizations

// Run after DOM is loaded
let path = "assets/data/dss/";
let fontFamily = "Montserrat";
const financialYearColorsCache = {};
var financialYearColorsIdx = 0;

$(document).ready(function () {
    dssOverview();
    year_quarter();
    timeSeriesCommunity(); 
    patron_community(); 
    request_type();
});



function colorMemo(financial_year) {
    let c = financialYearColorsIdx; 
    if (financialYearColorsCache[`${financial_year}`]) return financialYearColorsCache[`${financial_year}`];
    if (c > iqss_color_pallette.length) financialYearColorsIdx = 0;
    financialYearColorsCache[`${financial_year}`] = iqss_color_pallette[c];
    financialYearColorsIdx = financialYearColorsIdx + 1;
    return c;
}

function dssOverview() { 
    d3.tsv(path + "overview.tsv", function (error, data) {
        console.log(error);
        for (d of data) {
            dssAddMetric(d, "dssOverview", "col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3")
        }
    })
}

function dssAddMetric(d, div_id, class_override) {

    if (class_override === undefined) {
        class_override = 'col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3'
    }

    const metricTemplate = document.getElementById("iq-info-box");
    const metricInstance = document.importNode(metricTemplate.content, true);

    metricInstance.querySelector(".info-box-group").innerHTML = d['metric'];
    metricInstance.querySelector(".info-box-value").innerHTML = Number(d['value']).toLocaleString();
    metricInstance.querySelector(".info-box-unit").innerHTML = '';
    metricInstance.querySelector(".info-box-icon").innerHTML = "<span class='" + d['icon'] + "'></span>";
    metricInstance.querySelector(".info-box").style.color = "#ffffff";
    metricInstance.querySelector(".info-box").style.backgroundColor = iqss_color_pallette[colorMemo(d['metric'])]
    metricInstance.querySelector(".info-box-div").className = class_override;
    document.getElementById(div_id).appendChild(metricInstance);

}
// Quarter 
function year_quarter() {
    d3.csv(path + "metrics_by_quarter.csv", function (error, data) {

        if (error) return console.error(error);

        const myNumData = data;

        d3plus.viz()
            .container(".totalNumHelpRequests")
            .data(myNumData)
            .type("bar")
            .id("fyear_quarter")
            .y({
                "value": "fyear_quarter",
                "scale": "discrete",
                "label": "Year \& Quarter",
            })
            .x({
                "value": "unique_tickets",
                "label": "Number of Help requests"
            })
            .color((d) => { return colorMemo(d.fyear_quarter) } )
            .font({
                "family": fontFamily
            })
            .legend(false)
            .resize(true)
            .draw()
    });
};


// patron_community,fyear_quarter,unique_tickets,cumulative_tickets
function timeSeriesCommunity() {
    d3.csv(path + "metrics_by_department_cumulative.csv", function (error, data) {
        if (error) return console.error(error);

        // color: get unique values for affiliation:

        // Coerce data values to be numeric
        const myNumData = data.map(d => ({
            ...d,
            unique_tickets: parseInt(d.unique_tickets),
            cumulative_tickets: parseInt(d.cumulative_tickets)
        }));

        d3plus.viz()
            .container(".helpRequestsByDepartmentCm")
            .data(myNumData)
            .type("line")
            .id("patron_community")
            .x({
                "value": "fyear_quarter",
                "label": "Year \& Quarter",
                "scale": "discrete",
            })
            .y({
                "value": "cumulative_tickets",
                "label": "Cumulative Requests"
            })
            .legend(false)
            .font({
                "family": fontFamily
            })
            .color((d) => { return colorMemo(d.patron_community) })
            .resize(true)
            //.time({"value": "quarter"})
            .draw();
    });
};

// Patron Community (3)
function patron_community() {
    // affiliation_types.csv
    d3.csv(path + "metrics_by_department.csv", function (error, data) {
        if (error) return console.error(error);

        const myNumData = data.map(d => ({
            ...d,
            unique_tickets: parseInt(d.unique_tickets)
        }));

        const div = "helpRequestsByDepartment"

        // Visualize
        d3plus.viz()
            .container("." + div)
            .data(myNumData)
            .type("bar")
            .id(["patron_community", "financial_year"])
            .y({
                "value": "patron_community",
                "scale": "discrete",
                "label": "Department"
            })
            .x({
                "value": "unique_tickets",
                "label": "Number of Help Requests",
            })
            .order({
                "sort": "asc",
                "value": "unique_tickets"
            })
            .legend(false)
            .color((d) => iqss_color_pallette[Math.floor(Math.random() * iqss_color_pallette.length)]) // iqss_color_pallette[Math.floor(Math.random() * iqss_color_pallette.length)]))
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
    d3.csv(path + "metrics_by_request_type.csv", function (error, data) {
        if (error) return console.error(error);

        const myNumData = data.map(d => ({
            ...d,
            total_count: parseInt(d.total_count),
            unique_tickets: parseInt(d.unique_tickets),
            financialYearColor: colorMemo(d.financial_year)
        }))

        const div = "helpRequestsByType"

        d3plus.viz()
            .container("." + div)
            .data(myNumData)
            .type("bar")
            .id(["request_type","financial_year"])
            .x({
                "value": "total_count",
                "label": "Number of Help Requests"
            })
            .y({
                "value": "request_type",
                "scale": "discrete",
                "label": "Type of Help Requested"
            })
            .order({
                "sort": "asc",
                "value": "total_count"
            })
            .color((d) => { return Array.isArray(d.financialYearColor) ? d.financialYearColor.at(-1) : d.financialYearColor })
            .font({
                "family": fontFamily,
                "transform": "none"
            })
            .legend(false)
            .resize(true)
            .draw()
    });
};