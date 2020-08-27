$(document).ready(function () {
    generateRCPlot(path, 'interactive', 'department');
    generateRCPlot(path, 'interactive', 'school');
    generateRCPlot(path, 'batch', 'department');
    generateRCPlot(path, 'batch', 'school');
});

function generateRCPlot(path, name, type) {
    let div = `rc-${name}-by-${type}`
    d3.tsv(path + div + ".tsv", function (data) {

        // console.log(div)
        let labels = []
        let values = []
        let year = data[0]["year"];
        let title = "RCE " + name + "by" + type + " in " + year // not used

        for (i = 0; i < data.length; i++) {
            // labels.push(`${data[i][type]} (${data[i]["percentage"]})`);
            labels.push(`${data[i][type]}`);
            values.push(data[i]["count"]);
        }

        let dataset = {
            x: labels,
            y: values,
            title: title
        }

        pieChart(div, dataset);
        document.getElementById(div + "-period").innerHTML = `(${year})`;
    })
}