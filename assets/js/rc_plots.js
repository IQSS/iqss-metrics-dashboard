$(document).ready(function () {
    // console.log(path)
    generateRCPlot(path, 'interactive', 'department');
    generateRCPlot(path, 'interactive', 'school');
    generateRCPlot(path, 'batch', 'department');
    generateRCPlot(path, 'batch', 'school');
    // d3Pie(path, 'batch', 'school'); # not ready for production
});

function generateRCPlot(path, name, type) {
    let div = `rc-${name}-by-${type}`;

    d3.tsv(path + div + ".tsv", function (data) {

        // console.log(div)
        let labels = []
        let values = []
        let year = data[0]["year"];
        let title = "RCE " + name + "by" + type + " in " + year // not used

        for (i = 0; i < data.length; i++) {
            labels.push(`${data[i][type]} (${data[i]["percentage"]})`);
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
// https://bl.ocks.org/davelandry/33fc382f1f1913682ec1
function d3Pie(path, name, type) {
    let div = `rc-${name}-by-${type}`;
    let id = '#' + div;

    d3.tsv(path + div + ".tsv", function (data) {
        data.map(i => i.count = parseInt(i.count))
        // data.map(i => i.school = i.school.toUpperCase())
        console.log(data)
        d3plus
            .viz()
            .container('#rc-batch-by-school')
            .data(data)
            .type("pie")
            .id("school")
            .size("count")
            .legend(true)
            .format(function(text, key) {
                
                if(key === 'school') {
                    return text.toUpperCase() ;
                } 
                
                if (key === 'count') {
                    return(texttoFixed(0) + "%")
                } else  {
                    return text;
                }

            })
            .draw()


        // new d3plus.Pie()
        //     .config({
        //         data: data,
        //         container: '#rc-batch-by-school',
        //         groupBy: "school",
        //         value: function (d) {
        //             return parseInt(d.count);
        //         }
        //     })
        //     .render();


    });
}