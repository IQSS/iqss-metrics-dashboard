let fontFamily = "Montserrat";
// let dataSource = "https://dataversemetrics.odum.unc.edu/dataverse-metrics/"
// https://dataversemetrics.odum.unc.edu/dataverse-metrics/dataverses-toMonth.tsv

let metrics_retrieved =[]

$(document).ready(function () {

    loadJSON(function (response) {
        const config = JSON.parse(response);
        dataversesToMonth(config);
        dataversesByCategory(config);
        datasetsToMonth(config);
        datasetsBySubject(config);
        filesToMonth(config);
        // downloadsToMonth(config);
        dataverseSupport();
        harvardDataverse()
            .then(() => {
                for(let rm of metrics_retrieved) {
                    addMetric(rm, 'harvard-dataverse-metrics')
                }
        });

    }, path + "config.json");
});

async function harvardDataverse() {

    const baseUrl = 'https://dataverse.harvard.edu/api/info/metrics/';

    let metrics = [
        {id: 0, url: "files", title: "Files Deposited", time: "Files Total", icon: "file-alt", color: "orange"},
        {
            id: 1,
            url: "files/pastDays/30",
            title: "Files Deposited",
            time: "Deposited Last 30 days",
            icon: "file-alt",
            color: "orange"
        },
        {id: 2, url: "datasets", title: "Datasets Deposited", time: "Datasets Total", icon: "database", color: "red"},
        {
            id: 3,
            url: "datasets/pastDays/30",
            title: "Datasets Deposited",
            time: "Datasets Last 30 Days",
            icon: "database",
            color: "red"
        },
        {id: 4, url: "downloads", title: "Files Downloaded", time: "Files Total", icon: "file-download", color: "blue"},
        {
            id: 5,
            url: "downloads/pastDays/30",
            title: "Files Downloaded",
            time: "Downloaded Last 30 days",
            icon: "file-download",
            color: "blue"
        }]

    for (let m of metrics) {
        const response = await fetch(`${baseUrl}${m.url}`)
        const data = await response.json();
        let metricTmp = [m.id, "", m.title, data.data.count, m.time, "fa fa-" + m.icon, m.color];
        metrics_retrieved.push(metricTmp);
    }
}


function dataverseSupport() {
    d3.tsv(path + "dvs-ticket-type_aggr.tsv", function (error, data) {
        if (error) return console.error(error);

        const div = "dvs-ticket-type"; //dvs-ticket-feature-period
        const period = data[0]["period"]
        document.getElementById(`${div}-period`).innerHTML = `(${period})`

        let labels = [];
        let y= [];

        for (d of data) {
            labels.push(d["value"])
            y.push(d["count"])
        }

        horizontalBarChart(div, {
            label_x: 'Ticket Type',
            label_y: 'Total number of tickets',
            x: labels,
            y: y,
            title: 'Number of Tickets',
            color: harvard_crimson
        });
    })

    d3.tsv(path + "dvs-feature_aggr.tsv", function (error, data) {
        if (error) return console.error(error);

        const div = "dvs-ticket-feature"; //dvs-ticket-feature-period
        const period = data[0]["period"]

        document.getElementById(`${div}-period`).innerHTML = `(${period})`

        let labels = [];
        let y= [];

        for (d of data) {
            labels.push(d["value"])
            y.push(d["count"])
        }

        horizontalBarChart(div, {
            label_x: 'Feature',
            label_y: 'Total number of tickets',
            x: labels,
            y: y,
            title: 'Number of Tickets',
            color: harvard_crimson
        });
    })

}

function dataversesToMonth(config) {
    const color = config["colors"]["dataverses/toMonth"];
    const month_filter_enabled = config["month_filter_enabled"];

    d3.tsv(path + "dataverses-toMonth.tsv", function (error, data) {

        if (error) return console.error(error);
        if (month_filter_enabled) {
            data = data.filter(function (d) {
                return parseInt(d.month.split("-")[1]) % 2 == 0;
            });
        }
        coerceToNumeric(data);
        const yLabel = "Number of Dataverses";
        d3plus
            .viz()
            .data(data)
            // .title("Total Dataverses")
            .container("#dataverses-to-month")
            .type("bar")
            .id("month")
            .x({
                value: "month",
                label: "Month",
            })
            .y({
                //"range": yAxisTruncation(data, 500),
                range: [0, data[data.length - 1].count * 1.3],
                value: "count",
                label: yLabel,
            })
            .color(function (d) {
                return color;
            })
            .format({
                text: function (text, params) {
                    if (text === "count") {
                        return yLabel;
                    } else {
                        return d3plus.string.title(text, params);
                    }
                },
            })
            .font({ "family": fontFamily})
            .resize(true)
            .draw();
    });
}

function dataversesByCategory(config) {
    let colors = config["colors"]["dataverses/byCategory"];
    d3.tsv(path + "dataverses-byCategory.tsv", function (error, data) {
        if (error) return console.error(error);
        let tileLabel = "Number of Dataverses";
        coerceToNumeric(data);
        d3plus
            .viz()
            .data(data)
            // .title("Dataverses by Category")
            .title({
                total: true,
            })
            .container("#dataverses-by-category")
            .type("tree_map")
            .id("name")
            .size("count")
            .color({
                value: "count",
                heatmap: colors.reverse(),
            })
            .format({
                text: function (text, params) {
                    if (text === "count") {
                        return tileLabel;
                    } else {
                        return d3plus.string.title(text, params);
                    }
                },

            })
            .font({ "family": fontFamily})
            .legend(false)
            .resize(true)
            .draw();
    });
}

function datasetsToMonth(config) {
    let color = config["colors"]["datasets/toMonth"];
    let month_filter_enabled = config["month_filter_enabled"];
    d3.tsv(path + "datasets-toMonth.tsv", function (error, data) {
        if (error) return console.error(error);

        if (month_filter_enabled) {
            data = data.filter(function (d) {
                return parseInt(d.month.split("-")[1]) % 2 == 0;
            });
        }
        coerceToNumeric(data);
        let yLabel = "Number of Datasets";
        d3plus
            .viz()
            .data(data)
            // .title("Total Datasets")
            .container("#datasets-to-month")
            .type("bar")
            .id("month")
            .x({
                value: "month",
                label: "Month",
            })
            .y({
                //"range": yAxisTruncation(data, 10000),
                range: [0, data[data.length - 1].count * 1.3],
                value: "count",
                label: yLabel,
            })
            .color(function (d) {
                return color;
            })
            .format({
                text: function (text, params) {
                    if (text === "count") {
                        return yLabel;
                    } else {
                        return d3plus.string.title(text, params);
                    }
                },
            })
            .font({ "family": fontFamily})
            .resize(true)
            .draw();
    });
}

function datasetsBySubject(config) {
    let subjectBlockedlist = config["blockedlists"]["datasets/bySubject"];
    let colors = config["colors"]["datasets/bySubject"];
    d3.tsv(path + "datasets-bySubject.tsv", function (error, data) {
        if (error) return console.error(error);
        let tileLabel = "Number of Datasets";
        coerceToNumeric(data);
        d3plus
            .viz()
            .data(data)
            // .title("Datasets by Most Common Subject")
            .title({
                total: true,
            })
            .container("#datasets-by-subject")
            .type("tree_map")
            .id("name")
            .id({
                mute: subjectBlockedlist,
            })
            .size("count")
            .color({
                value: "count",
                heatmap: colors.reverse(),
            })
            .format({
                text: function (text, params) {
                    if (text === "count") {
                        return tileLabel;
                    } else {
                        return d3plus.string.title(text, params);
                    }
                },
            })
            .font({ "family": fontFamily})
            .legend(false)
            .resize(true)
            .draw();
    });
}

function filesToMonth(config) {
    let color = config["colors"]["files/toMonth"];
    let month_filter_enabled = config["month_filter_enabled"];
    d3.tsv(path + "files-toMonth.tsv", function (error, data) {
        if (error) return console.error(error);
        if (month_filter_enabled) {
            data = data.filter(function (d) {
                return parseInt(d.month.split("-")[1]) % 2 == 0;
            });
        }
        coerceToNumeric(data);
        let yLabel = "Number of Files";
        d3plus
            .viz()
            .data(data)
            // .title("Total Files")
            .container("#files-to-month")
            .type("bar")
            .id("month")
            .x({
                value: "month",
                label: "Month",
            })
            .y({
                //"range": yAxisTruncation(data, 20000),
                range: [0, data[data.length - 1].count * 1.3],
                value: "count",
                label: yLabel,
            })
            .color(function (d) {
                return color;
            })
            .format({
                text: function (text, params) {
                    if (text === "count") {
                        return yLabel;
                    } else {
                        return d3plus.string.title(text, params);
                    }
                },
            })
            .font({ "family": fontFamily})
            .resize(true)
            .draw();
    });
}

function downloadsToMonth(config) {
    let color = config["colors"]["downloads/toMonth"];
    let month_filter_enabled = config["month_filter_enabled"];
    d3.tsv(path + "downloads-toMonth.tsv", function (error, data) {
        if (error) return console.error(error);
        if (month_filter_enabled) {
            data = data.filter(function (d) {
                return parseInt(d.month.split("-")[1]) % 2 == 0;
            });
        }
        coerceToNumeric(data);
        let yLabel = "Number of File Downloads";
        d3plus
            .viz()
            .data(data)
            // .title("Total File Downloads")
            .container("#downloads-to-month")
            .type("bar")
            .id("month")
            .x({
                value: "month",
                label: "Month",
            })
            .y({
                //"range": yAxisTruncation(data, 1000000),
                range: [0, data[data.length - 1].count * 1.3],
                value: "count",
                label: yLabel,
            })
            .color(function (d) {
                return color;
            })
            .format({
                text: function (text, params) {
                    if (text == "count") {
                        return yLabel;
                    } else {
                        return d3plus.string.title(text, params);
                    }
                },
            })
            .font({ "family": fontFamily})
            .resize(true)
            .draw();
    });
}

function coerceToNumeric(data) {
    data.forEach(function (d) {
        d3.keys(d).forEach(function (k) {
            if (k == "count") {
                d[k] = +d[k];
            }
        });
    });
    return data;
}

function yAxisTruncation(metricArray, modNum) {
    let min = metricArray[0].count;
    let max = metricArray[metricArray.length - 1].count;
    if (min < modNum) {
        return [0, max + 10];
    }
    let rangeStart = min - (min % modNum);
    let rangeEnd = max - (max % modNum) + modNum;
    return [rangeStart, rangeEnd];
}

function createListOfInstallations(config, allInstallations) {
    let all = allInstallations.installations;
    let polled = config.installations;
    let list = "<ul>";
    for (let i = 0; i < all.length; ++i) {
        // Some installations in the "all" file have a trailing slash.
        let url = all[i].url.replace(/\/+$/, "");
        let name = all[i].name;
        if (polled.includes(url)) {
            list += "<li>";
            list += '<a href="' + url + '" target="_blank">' + name + "</a>";
            list += "</li>";
        }
    }
    list += "</ul>";
    return list;
}

// https://codepen.io/KryptoniteDove/post/load-json-file-locally-using-pure-javascript
function loadJSON(callback, jsonFile) {
    let xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open("GET", jsonFile, true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

async function loadTSV(url) {
    // console.log(url)

    let response = await fetch(url)
    let data = await response.text()

    d = [];
    let x = data.split("\n");

    for (let i = 1; i < x.length; i++) {
        let fields = x[i].split(/\t/);

        if (fields[0] !== undefined && fields[0] != "") {
            d.push(fields);
        }
    }

    return d;

}