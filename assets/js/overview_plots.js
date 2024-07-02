$(document).ready(function () {
    resize();
    loadOverviewPlots(path)
});

function loadOverviewPlots(path) {
    d3.tsv(path + "overview_plots.tsv", function (error, data) {
        if (error) return console.error(error);

        let tcaLabels = [];
        let tcaLabelsCount = [];
        let ibLabels = [];
        let ibLabelsCount = [];
        let ebLabels = [];
        let ebLabelsCount = [];

        for (d of data) {
            if (d["composition"] === "Team Composition and Affiliates") {
                tcaLabels.push(d["metric"])
                tcaLabelsCount.push(d["value"])
            }
            else if (d["composition"] === "Expense Breakdown") {
                ebLabels.push(d["metric"])
                ebLabelsCount.push(d["value"])
            }
            else if (d["composition"] === "Income Breakdown") {
                ibLabels.push(d["metric"])
                ibLabelsCount.push(d["value"])
            } else { 
                console.log(d)
                addMetric(d, "mainmetrics", "col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3")
            }
        }

        pieChart("team-composition", {
            label_x: 'Group',
            label_y: 'Individuals',
            x: tcaLabels,
            y: tcaLabelsCount,
            title: 'Team Composition and Affiliates',
            color: iqss_orange
        });

        pieChart("income-breakdown", {
            label_x: 'Type',
            label_y: 'USD',
            x: ibLabels,
            y: ibLabelsCount,
            title: 'Income breakdown',
            color: iqss_orange
        });

        pieChart("expense-breakdown", {
            label_x: 'Group',
            label_y: 'USD',
            x: ebLabels,
            y: ebLabelsCount,
            title: 'Expense breakdown',
            color: iqss_orange
        })
    })
}

function addMetric(d, div_id, class_override) {

    if(class_override === undefined ) {
        class_override = 'col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3'
    }


    const metricTemplate = document.getElementById("iq-info-box");

    const metricInstance = document.importNode(metricTemplate.content, true);

    
    metricInstance.querySelector(".info-box-group").innerHTML = d['metric'];
    metricInstance.querySelector(".info-box-value").innerHTML = d['value'];
    metricInstance.querySelector(".info-box-unit").innerHTML = d['unit'];
    metricInstance.querySelector(".info-box-icon").innerHTML = "<span class='" + d['icon'] + "'></span>";
    metricInstance.querySelector(".info-box").classList.add("bg-iqss-orange");
    metricInstance.querySelector(".info-box-div").className = class_override;
    document.getElementById(div_id).appendChild(metricInstance);

}