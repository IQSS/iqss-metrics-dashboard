$(document).ready(function () {
    generatePSRPlots('school');
    generatePSRPlots('role');
});

function titleCaseWord(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function generatePSRPlots(t) {
    let div1 = `psr-${t}`
    let div2 = `psr-${t}-distribution`

    let file = `psrAdvisesBy${titleCaseWord(t)}.tsv`
    
    d3.tsv(path + file, function (data) {

        let labels = []
        let values1 = []
        let values2 = []

        let year = data[0]["Period"];

        let view = titleCaseWord(t)
        let title = `Number of Advisees by ${view}`
        

        // Process TSV file
        for (i = 0; i < data.length; i++) {
            labels.push(`${data[i][view]}`);
            values1.push(data[i]["Number of Advisees"]);
            values2.push(data[i]["Cumulative Advisees"]);
        }


        // Mixed Chart
        let datasets = []
        let dataset1 = {
            backgroundColor: iqss_blue,
            borderColor: iqss_blue,
            borderWidth: 4,
            order: 1
        }
        let dataset2 = {        
            backgroundColor: iqss_orange + '22',
            borderColor: iqss_orange,
            borderWidth: 4,
            lineTension: 0,
            order: 2}
        
        dataset1["label"] = "Number of Advisees"
        dataset1["data"] = values1
        
        dataset2["label"] = "Cumulative"
        dataset2["data"] = values2
        dataset2["type"] = "line"


        datasets.push(dataset1)
        datasets.push(dataset2)

        let mixed_data_set ={
            x: labels,
            y: datasets,
            title: title,
            color: iqss_blue,
            label_x: view,
            label_y: "Number of Advisees"

        }

        mixedChart(div1, mixed_data_set)


        // Pie Chart
        let pie_data_set = {
            x: labels,
            y: values1,
            title: title,
            color: iqss_blue,
            label_x: view,
            label_y: "Number of Advisees"
        }
        pieChart(div2, pie_data_set);
        elms = document.getElementsByClassName("psr-period")
        for (e of elms) {
            e.innerHTML = `(${year})`
        }

        
    })
}