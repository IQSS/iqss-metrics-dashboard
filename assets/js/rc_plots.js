let rcDataPath = "assets/data/rc";

$(document).ready(function () {
    resize();
    //generateRCPlot(`${rcDataPath}/20251217FasrcPisDeptSocSciPis.tsv`);
    generateRCPlots(`${rcDataPath}/20251217FasrcPisDeptSocSciUsageLab2024.tsv`, '.fassocrccpuxdept2024', "Dept", "CpuHours");
    generateRCPlots(`${rcDataPath}/20251217FasrcPisDeptSocSciUsageLab2024.tsv`, '.fassocrcgpuxdept2024', "Dept", "GpuHours")

});

function generateRCPlots(path, div, id, size) {
    
    d3.tsv(path, function (data) {
        data.forEach(function(d) {
            d.CpuHours = +d.CpuHours; // explicitly convert Num to numeric
            d.GpuHours = +d.GpuHours;
        });

        d3plus.viz()
        .container(div)
        .data(data)
        .type("pie")
        .id(id)
        .size(size)
        .legend(true)
        .draw();
    });
};