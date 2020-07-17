let fontFamily = "Montserrat";

$(document).ready(function () {
    // console.log(path)
    loadJSON(function (response) {
        var config = JSON.parse(response);
        dataversesToMonth(config);
        dataversesByCategory(config);
        datasetsToMonth(config);
        datasetsBySubject(config);
        filesToMonth(config);
        // downloadsToMonth(config);
    }, path + "config.json");
});

function dataversesToMonth(config) {
    var color = config["colors"]["dataverses/toMonth"];
    var month_filter_enabled = config["month_filter_enabled"];

    d3.tsv(path + "dataverses-toMonth.tsv", function (error, data) {

        if (error) return console.error(error);
        if (month_filter_enabled) {
            data = data.filter(function (d) {
                return parseInt(d.month.split("-")[1]) % 2 == 0;
            });
        }
        coerceToNumeric(data);
        var yLabel = "Number of Dataverses";
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
    var colors = config["colors"]["dataverses/byCategory"];
    d3.tsv(path + "dataverses-byCategory.tsv", function (error, data) {
        if (error) return console.error(error);
        var tileLabel = "Number of Dataverses";
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
    var color = config["colors"]["datasets/toMonth"];
    var month_filter_enabled = config["month_filter_enabled"];
    d3.tsv(path + "datasets-toMonth.tsv", function (error, data) {
        if (error) return console.error(error);
        if (month_filter_enabled) {
            data = data.filter(function (d) {
                return parseInt(d.month.split("-")[1]) % 2 == 0;
            });
        }
        coerceToNumeric(data);
        var yLabel = "Number of Datasets";
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
    var subjectBlacklist = config["blacklists"]["datasets/bySubject"];
    var colors = config["colors"]["datasets/bySubject"];
    d3.tsv(path + "datasets-bySubject.tsv", function (error, data) {
        if (error) return console.error(error);
        var tileLabel = "Number of Datasets";
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
                mute: subjectBlacklist,
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
    var color = config["colors"]["files/toMonth"];
    var month_filter_enabled = config["month_filter_enabled"];
    d3.tsv(path + "files-toMonth.tsv", function (error, data) {
        if (error) return console.error(error);
        if (month_filter_enabled) {
            data = data.filter(function (d) {
                return parseInt(d.month.split("-")[1]) % 2 == 0;
            });
        }
        coerceToNumeric(data);
        var yLabel = "Number of Files";
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
    var color = config["colors"]["downloads/toMonth"];
    var month_filter_enabled = config["month_filter_enabled"];
    d3.tsv(path + "downloads-toMonth.tsv", function (error, data) {
        if (error) return console.error(error);
        if (month_filter_enabled) {
            data = data.filter(function (d) {
                return parseInt(d.month.split("-")[1]) % 2 == 0;
            });
        }
        coerceToNumeric(data);
        var yLabel = "Number of File Downloads";
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
    var min = metricArray[0].count;
    var max = metricArray[metricArray.length - 1].count;
    if (min < modNum) {
        return [0, max + 10];
    }
    var rangeStart = min - (min % modNum);
    var rangeEnd = max - (max % modNum) + modNum;
    return [rangeStart, rangeEnd];
}

function createListOfInstallations(config, allInstallations) {
    var all = allInstallations.installations;
    var polled = config.installations;
    var list = "<ul>";
    for (var i = 0; i < all.length; ++i) {
        // Some installations in the "all" file have a trailing slash.
        var url = all[i].url.replace(/\/+$/, "");
        var name = all[i].name;
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
    var xobj = new XMLHttpRequest();
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

        if (fields[0] != undefined && fields[0] != "") {
            d.push(fields);
        }
    }

    return d;

}