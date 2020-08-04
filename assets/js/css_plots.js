

$(document).ready(function () {
    loadPlots(path)
    loadPlots2(path)
});


function loadPlots2(path){

    d3.tsv(path + "css_quarterly_tickets_last_5yr.tsv", function (data) {
        console.log(data)   
        let labels = [];
        let dataverse = [];
        let rce = [];
        let desktop = [];

        //    Last 12 quarters
        for (var i = data.length - 12; i < data.length; i++) {
            labels.push(data[i].Year + "-" + data[i].Quarter);
            desktop.push(parseInt(data[i].Desktop));
            dataverse.push(parseInt(data[i].Dataverse));
            rce.push(parseInt(data[i].RCE));
        }

        let datasets = [{
                label: "Desktop",
                data: desktop,
                borderColor: iqss_blue,
            },
            {
                label: "RCE",
                data: rce,
                borderColor: iqss_orange,
            },
            {
                label: "Dataverse",
                data: dataverse,
                borderColor: harvard_red,
            },

        ];

        stackedArea("quarterly_tickets", {
            label_x: "Quarter",
            label_y: "Number of tickets",
            x: labels,
            datasets: datasets,
            title: "Number of ticktes",
        });
    })

    // d3.tsv(path + "css_quarterly_tickets_last_5yr.tsv", function (data) {
    //     console.log(data)   
    // })


    // d3.tsv(path + "css_quarterly_tickets_last_year.tsv", function (data) {
    //     console.log(data)   
    // })
    // d3.tsv(path + "css_monthly_tickets_last_3yr.tsv", function (data) {
    //     console.log(data)   
    // })
    // d3.tsv(path + "css_monthly_tickets_last_3yr.tsv", function (data) {
    //     console.log(data)   
    // })
    // d3.tsv(path + "css_device_type_last_year.tsv", function (data) {
    //     console.log(data)   
    // })

    // d3.tsv(path + "css_patron_community_last_year.tsv", function (data) {
    //     console.log(data)   
    // })
    // d3.tsv(path + "css_patron_community_last_year.tsv", function (data) {
    //     console.log(data)   
    // })
    // d3.tsv(path + "css_pc_mac_last_year.tsv", function (data) {
    //     console.log(data)   
    // })
    // d3.tsv(path + "css_pc_mac_last_year_total.tsv", function (data) {
    //     console.log(data)   
    // })
    // d3.tsv(path + "css_pc_mac.tsv", function (data) {
    //     console.log(data)   
    // })
}






function loadPlots(path) {
    d3.tsv(path + "cssDeviceType.tsv", function (data) {
        let dataset = [];
        console.log(data);
        console.log(path + "cssDeviceType.tsv")
        //    Last 12 quarters
        for (var i = 0; i < data.length; i++) {
            keys = Object.keys(data[i]);

            for (k = 0; k < keys.length; k++) {
                if (i === 0) {
                    // console.log(k - 1)
                    dataset[k] = {
                        label: keys[k],
                        data: [],
                        borderColor: iqss_color_pallette[k - 1],
                    };
                } else {
                    dataset[k].data.push(data[i][keys[k]]);
                }
            }
        }

        // line chart
        multiLineChart("device_type", {
            label_x: "Quarter",
            label_y: "Number of tickets",
            x: dataset[0].data,
            datasets: dataset.slice(1),
            title: "Number of ticktes",
        });

        // PIE
        i = data.length - 1;
        keys = Object.keys(data[i]).slice(1);
        let pieData = [];

        for (k = 0; k < keys.length; k++) {
            pieData.push(data[i][keys[k]]);
        }

        document.getElementById("FYpie").innerHTML = "FY20";

        horizontalBarChart("device_type-pie", {
            x: keys,
            y: pieData,
            title: "Title",
            color: iqss_color_pallette
        });
    });

    d3.tsv(path + "cssQuarterlyTickets.tsv", function (data) {

    });


    d3.tsv(path + "cssPatronCommunity.tsv", function (data) {
        console.log(data)
    })

}