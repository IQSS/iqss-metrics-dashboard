let rcDataPath = "assets/data/rc/from_2025";

$(document).ready(function () {
    resize();
    generateRCPiePlot(`${rcDataPath}/cpu.tsv`, '.fassocrccpuxdept2024', "Dept", "Num");
    generateRCPiePlot(`${rcDataPath}/gpu.tsv`, '.fassocrcgpuxdept2024', "Dept", "Num")
    generateRCPiePlot(`${rcDataPath}/jobs.tsv`, '.fassocrcexecxdept2024', "Dept", "Num")
    generateRCPiePlot(`${rcDataPath}/dept.tsv`, '.fasssrc2024', "Dept", "Num");
});

function generateRcPiePlotFrom2025(path, div, id, size) {

    d3.tsv(path, function (data) {
        data.forEach(function (d) {
            d.CpuHours = +d.CpuHours; // explicitly convert Num to numeric
            d.GpuHours = +d.GpuHours;
            d.Jobs = +d.Jobs;
            d.Pis = +d.Pis
            d.Num = +d.Num
            d.Users = +d.Users
        });

        d3plus.viz()
            .container(div)
            .data(data)
            .type("pie")
            .labels({ value: true })
            .id(id)
            .color(id)
            .size(size)
            .legend({ labels: true, text: (d) => { return d[`${id}`].substring(0, 3); } })
            .order({ "value": size, sort: "asc" })
            .format({
                text: function (text, params) {
                  if (params.key === "id" && text === "Iqss") return "IQ";
                  return text;
                }
              })
            .resize(true)
            .draw()
    });
};

function generateRCLinePlot(path, div, id, label) {
    d3.tsv(path, function (data) {
        data.forEach(function (d) {
            d.Year = +d.Year;
            d.Num = +d.Num
        });

        d3plus
            .viz()
            .type("line")
            .container(div)
            .data(data)
            .id(id)
            .color(id)
            .x({
                "value": "Year",
                "label": "Year",
                "scale": "discrete",
            })
            .y({
                "value": "Num",
                label
            })
            .legend({ labels: true, text: (d) => { return d[`${id}`].substring(0, 3); } })
            .resize(true)
            .draw();
    });
}