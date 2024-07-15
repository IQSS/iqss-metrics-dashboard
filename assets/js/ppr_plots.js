$(document).ready(function () {
    resize();
    loadPprPlots(path)
});

function loadPprPlots(path) {
    d3.tsv(path + "ppr.tsv", function (error, data) {
        if (error) return console.error(error);
        for (d of data) {
            if (d["composition"] === "Overview") addPprMetric(d, "pprOverview", "col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3");
            if (d["composition"] === "Authors") addPprMetric(d, "pprAuthors", "col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3");
        }
    })
}

function addPprMetric(d, div_id, class_override) {

    if (class_override === undefined) {
        class_override = 'col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3'
    }


    const metricTemplate = document.getElementById("iq-info-box");

    const metricInstance = document.importNode(metricTemplate.content, true);

    metricInstance.querySelector(".info-box-group").innerHTML = d['metric'];
    metricInstance.querySelector(".info-box-value").innerHTML = Number(d['value']).toLocaleString();
    metricInstance.querySelector(".info-box-unit").innerHTML = d['unit'];
    metricInstance.querySelector(".info-box-icon").innerHTML = "<span class='" + d['icon'] + "'></span>";
    metricInstance.querySelector(".info-box").classList.add("bg-iqss-orange");
    metricInstance.querySelector(".info-box-div").className = class_override;
    document.getElementById(div_id).appendChild(metricInstance);

}