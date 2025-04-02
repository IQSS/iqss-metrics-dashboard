let rcDataPath = "assets/data/rc";

$(document).ready(function () {
    resize();
    generateRCPiePlot(`${rcDataPath}/20251217FasrcPisDeptSocSciUsageLab2024.tsv`, '.fassocrccpuxdept2024', "Dept", "CpuHours");
    generateRCPiePlot(`${rcDataPath}/20251217FasrcPisDeptSocSciUsageLab2024.tsv`, '.fassocrcgpuxdept2024', "Dept", "GpuHours")
    generateRCPiePlot(`${rcDataPath}/20251217FasrcPisDeptSocSciUsageLab2024.tsv`, '.fassocrcexecxdept2024', "Dept", "Jobs")
    generateRCPiePlot(`${rcDataPath}/20251217FasrcPisDeptSocSciPis.tsv`, '.fasrcpisxdept2024', "Dept", "Pis");
    generateRCLinePlot(`${rcDataPath}/20251217FasrcPisDeptSocSciUsers.tsv`, '.fasrcsocresearcherxdeptxyear', "Dept", "Users");
    generateRCLinePlot(`${rcDataPath}/20251217FasrcPisDeptSocSciCpuHours.tsv`, '.fasrcsoccomptimexdeptxyear', "Dept", "Cpu hours");

});

function generateRCPiePlot(path, div, id, size) {

    d3.tsv(path, function (data) {
        data.forEach(function (d) {
            d.CpuHours = +d.CpuHours; // explicitly convert Num to numeric
            d.GpuHours = +d.GpuHours;
            d.Jobs = +d.Jobs;
            d.Pis = +d.Pis
        });

        d3plus.viz()
            .container(div)
            .data(data)
            .type("pie")
            .id(id)
            .color(id)
            .size(size)
            .legend({ "labels": true, "size": 25 })
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
            .legend({size: 75})
            .resize(true)
            .draw();
    });
}