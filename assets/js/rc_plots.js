$(document).ready(function () {
    console.log(path)
    generatePSRPlot(path, 'interactive', 'department');
    generatePSRPlot(path, 'interactive', 'school');
    generatePSRPlot(path, 'batch', 'department');
    generatePSRPlot(path, 'batch', 'school');
});

function generatePSRPlot(path, name, type) {
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

        // console.log(dataset)
        pieChart(div, dataset);
        document.getElementById(div + "-year").innerHTML = year;
    })
}