$(document).ready(function () {
    loadCSSPlots(path)
    loadLabPlots(path)
});


function loadCSSPlots(path) {

    d3.tsv(path + "css_quarterly_tickets_last_5yr.tsv", function (data) {
        
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
                borderColor: iqss_color_pallette[0],
            },
            {
                label: "RCE",
                data: rce,
                borderColor: iqss_color_pallette[1],
            },
            {
                label: "Dataverse",
                data: dataverse,
                borderColor: iqss_color_pallette[2],
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


    d3.tsv(path + "css_quarterly_tickets_last_year.tsv", function (data) {

        let year = data[0]["Year"]
        let dataset = {
            x: ["Desktop", "RCE", "Dataverse"],
            y: [data[0]["Desktop"], data[0]["RCE"], data[0]["Dataverse"]],
            title: "title"
        }

        // console.log(dataset)
        div = "tickets-by-subject"
        pieChart(div, dataset);
        document.getElementById(div + "-period").innerHTML = year;


    })

    d3.tsv(path + "css_monthly_tickets_last_3yr.tsv", function (data) {
        console.log(data)
        let dataset = [];
        let y = []
        for (var i = 0; i < data.length; i++) {
            keys = Object.keys(data[i]);
            // console.log(keys)
            y.push(data[i]["Year_Month"])
            let d = 0 // dataset
            for (k = 0; k < keys.length; k++) {

                if (keys[k] !== 'Year' && keys[k] !== 'Month' && keys[k] !== 'Year_Month') {


                    if (i === 0) {

                        dataset[d] = {
                            label: keys[k],
                            data: [],
                            borderColor: iqss_color_pallette[d - 1],
                        };
                    }
                    dataset[d].data.push(data[i][keys[k]]);

                    d += 1
                }


            }
        }

        // line chart
        multiLineChart("monthly_tickets", {
            label_x: "Month",
            label_y: "Number of resolved tickets",
            x: y,
            // x: dataset[0].data,
            // y: y,
            datasets: dataset.slice(1),
            title: "Number of resolved ticktes",
        });
    })


    d3.tsv(path + "css_device_type_last_year.tsv", function (data) {
        
        let div ="tickets-by-device-type"
        let labels = []
        let d = [];

        for (var i = 0; i < data.length; i++) {
            labels.push(data[i]["device"]);
            d.push(parseInt(data[i].count));
        }
        horizontalBarChart(div, {
            x: labels,
            y: d,
            title: 'Total Resolved Tickets', // this is the popup label
            color: iqss_orange,
            label_x: "Device",
            label_y: "Number of Resolved Tickets"
        });

        
        document.getElementById(div + "-period").innerHTML = data[0]["year"];
    })

    d3.tsv(path + "css_patron_community_last_year.tsv", function (data) {
        
        div = 'patron-community'
        let year = data[0]["Year"]

        let x= [];
        let y = [];
        for(d of data) {
            
            x.push(d["patron"])
            y.push(d["count"])
            
        }

        let dataset = {
            x: x,
            y: y,
            title: 'Total Resolved Tickets', // this is the popup label
            color: iqss_blue,
            label_x: "Patron Community",
            label_y: "Number of Resolved Tickets"
        }

        horizontalBarChart(div+'-bar', dataset);
        document.getElementById(div + "-bar-period").innerHTML = year;   
    })


    d3.tsv(path + "css_pc_mac_last_year.tsv", function (data) {

        let div = "mac-pc-type";
        let labels = [];
        let year = data[0]["Year"]
        let pc = [];
        let mac = [];
        

        
        for (var i = 0; i < data.length; i++) {
            labels.push(data[i]["id"]);
            pc.push(parseInt(data[i]["PC"]));
            mac.push(parseInt(data[i]["Mac"]));
        }

        let datasets = [{
                label: "PC",
                data: pc,
                borderColor: iqss_blue,
            },
            {
                label: "Mac",
                data: mac,
                borderColor: iqss_orange,
            }
        ];

        stackedHorizontalBar(div, {
            label_y: "Issue type",
            label_x: "Number of tickets",
            x: labels,
            datasets: datasets,
            title: "Number of ticktes",
        });

        document.getElementById(div + "-period").innerHTML = year;   
    })
    // d3.tsv(path + "css_pc_mac_last_year_total.tsv", function (data) {
    //     console.log(data)   
    // })
    d3.tsv(path + "css_pc_mac.tsv", function (data) {
        let div = "mac-pc-years";
        let labels = [];
        
        let pc = [];
        let mac = [];
        

        
        for (var i = 0; i < data.length; i++) {
            labels.push(data[i]["year"]);
            pc.push(parseInt(data[i]["PC"]));
            mac.push(parseInt(data[i]["Mac"]));
        }

        let datasets = [{
                label: "PC",
                data: pc,
                borderColor: iqss_blue,
            },
            {
                label: "Mac",
                data: mac,
                borderColor: iqss_orange,
            }
        ];

        stackedArea(div, {
            label_x: "Year",
            label_y: "Number of tickets",
            x: labels,
            datasets: datasets,
            title: "Number of ticktes",
        });

    })
}


function loadLabPlots(path) {
    
    d3.tsv(path + "lab/lab_request_per_month.tsv", function (error, data) {
        if (error) return console.error(error);

        const div = "lab_request_per_quarter";
        let labels = [];
        let y= [];
        
        for (d of data) {
            labels.push(d["year_month"])
            y.push(d["count"])
        }

        lineChart(div, {
            label_x: 'Month',
            label_y: 'Requests',
            x: labels,
            y: y,
            title: 'Number of Requests',
            color: iqss_orange,
            line_tension: 0
            });
    })

    d3.tsv(path + "lab/lab_request_school.tsv", function (error, data) {
        if (error) return console.error(error);

        const div = "lab_request_school";
        const period = data[0]["period"]
        document.getElementById(`${div}-period`).innerHTML = `(${period})`
        let labels = [];
        let y= [];
        
        for (d of data) {
            labels.push(d["School"])
            y.push(d["count"])
        }

        barChart(div, {
            label_x: 'School',
            label_y: 'Requests',
            x: labels,
            y: y,
            title: 'Number of Requests',
            color: iqss_blue
            });
    })

    d3.tsv(path + "lab/lab_request_status.tsv", function (error, data) {
        if (error) return console.error(error);

        const div = "lab_request_status";
        const period = data[0]["period"]
        document.getElementById(`${div}-period`).innerHTML = `(${period})`
        let labels = [];
        let y= [];
        
        for (d of data) {
            labels.push(d["Status"])
            y.push(d["count"])
        }

        horizontalBarChart(div, {
            label_x: 'Status',
            label_y: 'Requests',
            x: labels,
            y: y,
            title: 'Number of Requests',
            color: iqss_orange
            });
    })

    d3.tsv(path + "lab/lab_request_department.tsv", function (error, data) {
        if (error) return console.error(error);

        const div = "lab_request_department";
        const period = data[0]["period"]
        document.getElementById(`${div}-period`).innerHTML = `(${period})`
        let labels = [];
        let y= [];
        
        for (d of data) {
            labels.push(d["Department/Concentration"])
            y.push(d["count"])
        }

        horizontalBarChart(div, {
            label_x: 'Department/Concentration',
            label_y: 'Requests',
            x: labels,
            y: y,
            title: 'Number of Requests',
            color: iqss_orange
            });
    })
    d3.tsv(path + "lab/lab_request_reason.tsv", function (error, data) {
        if (error) return console.error(error);

        const div = "lab_request_reason";
        const period = data[0]["period"]
        document.getElementById(`${div}-period`).innerHTML = `(${period})`
        let labels = [];
        let y= [];
        
        for (d of data) {
            labels.push(d["Reason for Lab Access"])
            y.push(d["count"])
        }

        pieChart(div, {
            label_x: 'Department/Concentration',
            label_y: 'Requests',
            x: labels,
            y: y,
            title: 'Number of Requests',
            color: iqss_orange
            });
    })
    d3.tsv(path + "lab/lab_request_discovery.tsv", function (error, data) {
        if (error) return console.error(error);

        const div = "lab_request_discovery";
        const period = data[0]["period"]
        document.getElementById(`${div}-period`).innerHTML = `(${period})`

        let labels = [];
        let y= [];
        
        for (d of data) {
            labels.push(d["Lab Discovery"])
            y.push(d["count"])
        }

        pieChart(div, {
            label_x: 'Discovery',
            label_y: 'Requests',
            x: labels,
            y: y,
            title: 'Number of Requests',
            color: iqss_orange
            });
    })
    
}


