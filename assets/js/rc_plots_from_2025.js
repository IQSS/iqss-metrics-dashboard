let rcDataPath = "assets/data/rc/from_2025";

$(document).ready(function () {
    resize();
    generateRCPiePlot(`${rcDataPath}/cpu.tsv`, '.plot_dept_x_cpu', "Dept", "Num");
    generateRCPiePlot(`${rcDataPath}/gpu.tsv`, '.plot_dept_x_gpu', "Dept", "Num");
    generateRCPiePlot(`${rcDataPath}/jobs.tsv`, '.plot_dept_x_jobs', "Dept", "Num");
    generateRCPiePlot(`${rcDataPath}/dept.tsv`, '.plot_pis_x_dept', "Dept", "Num");
    generateRCPiePlot(`${rcDataPath}/users_by_dept.tsv`, '.plot_users_x_dept', "Dept", "Num");
});

function generateRcPiePlotFrom2025(path, div, id, size) {

    d3.tsv(path, function (data) {
        data.forEach(function (d) {
            d.Num = +d.Num;
            d.Year = ~~(+d.Year);
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