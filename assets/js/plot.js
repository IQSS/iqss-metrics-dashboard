// color

var iqss_orange = '#d16103';
var iqss_blue = '#152844';
var iqss_dark_blue = '#152844'; // same
var iqss_dark_grey = '#555555';
var iqss_lighter_blue = '#215990';

var harvard_red = '#A41034';
var harvard_crimson = '#A41034';
var harvard_black = '#000000';
var harvard_light_grey = '#B6B6B6';

var green = "#2CA02C"
var purple = "#9467BD"
var brown = "#7F7F7F"
var pink = "#E377C2"
var olive = "#BCBD22"
var cyan = "#17BECF"

// chartJS default settings
Chart.defaults.global.defaultFontSize = 14;
Chart.defaults.global.defaultFontFamily = "Montserrat";
Chart.defaults.global.defaultFontColor = "#000";

// 12 colors
var iqss_color_pallette = [iqss_dark_blue, iqss_orange, green, harvard_crimson, purple,
    harvard_black, pink, harvard_light_grey, iqss_lighter_blue, brown, olive, cyan, iqss_dark_grey
]

// UNIQUE COLORS
// LIGHTBLUE, DARK BLUE, LIGHT GREEN DARK GREEN
var cp_qual_3 = ['#a6cee3', '#1f78b4', '#b2df8a']
var cp_qual_4 = ['#a6cee3', '#1f78b4', '#b2df8a', '#33a02c']

// SEQUENTIAL PALETTE FROM LIGHT TO DARK BLUE AND ORANGE
var cp_seq_oranges = ['#fff5eb', '#fee6ce', '#fdd0a2', '#fdae6b', '#fd8d3c', '#f16913', '#d94801', '#a63603', '#7f2704']
var cp_seq_blues = ['#f7fbff', '#deebf7', '#c6dbef', '#9ecae1', '#6baed6', '#4292c6', '#2171b5', '#08519c', '#08306b']


// DIVERGING PALETTE RED -> YELLOW -> BLUE
var cp_div_11 = ['#a50026',
    '#d73027',
    '#f46d43',
    '#fdae61',
    '#fee090',
    '#ffffbf',
    '#e0f3f8',
    '#abd9e9',
    '#74add1',
    '#4575b4',
    '#313695'
]

//TODO: 
// Add to canvas element aria-label="Hello ARIA World" role="img">
// Add fallback text in canvas element <p>Hello Fallback World</p>

function addAccessibilityItems(div_id, title) {
    var elm = document.getElementById(div_id);
    elm.innerHTML += '<p>Plot ' + title + '</p>';
    elm.setAttribute("aria-label", title);
    elm.setAttribute("role", "img");
}


function pieChart(div_id, data) {
    // data.x: labels
    // data.y: values
    // data.title: 
    var ctx = document.getElementById(div_id).getContext('2d');
    const reducer = (accumulator, currentValue) => parseFloat(accumulator) + parseFloat(currentValue);

    new Chart(ctx, {
        type: "pie",
        data: {
            labels: data.x,
            datasets: [{
                label: data.title,
                data: data.y,
                backgroundColor: iqss_color_pallette
            }]
        },
        options: {
            aspectRatio: 1,
            legend: {
                position: 'bottom',
                labels: {
                    // fontColor: 'rgb(255, 99, 132)',
                    fontSize: 13
                }
                // display: false,
            },
            tooltips: {
                callbacks: {
                    label: function(tooltipItem, data) {
                        // console.log(data)
                        total = data.datasets[tooltipItem.datasetIndex].data.reduce(reducer)
                        value = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]
                        
                        percentage = Math.round((100 *value) / total)
                        // console.log(percentage)
                        var label = data.labels[tooltipItem.index] || '';
    
                        if (label) {
                            label += ': ';
                        }
                        label += `${value} (${percentage}%)`;
                        return label;
                    }
                }
            }
        }
    });
}

function barChart(div_id, data) {
    // data.x
    // data.y
    // data.title
    // data.color

    var ctx = document.getElementById(div_id).getContext('2d');
    addAccessibilityItems(div_id, data.title);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: data.x,
            datasets: [{
                label: data.title,
                backgroundColor: data.color,
                data: data.y
            }]
        },
        options: {
            elements: {
                rectangle: {
                    borderWidth: 0,
                }
            },
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                        fontSize: 10
                    }
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    display: true,
                }]
            },
            legend: {
                // position: 'right',
                display: false,
            },
            // title: {
            //     display: true,
            //     text: 'Chart.js Horizontal Bar Chart'
            // }
        }
    })
}


// functions
function horizontalBarChart(div_id, data) {
    // data.x
    // data.y
    // data.title
    // data.color

    var ctx = document.getElementById(div_id).getContext('2d');
    addAccessibilityItems(div_id, data.title);

    new Chart(ctx, {
        type: "horizontalBar",
        data: {
            labels: data.x,
            datasets: [{
                label: data.title,
                backgroundColor: data.color,
                data: data.y
            }]
        },
        options: {
            elements: {
                rectangle: {
                    borderWidth: 0,
                }
            },
            responsive: true,
            tooltips: {
                mode: 'index',
                intersect: false
            },
            scales: {
                xAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                      scaleLabel: {
                        display: true,
                        labelString: data.label_y,
                        fontStyle: 'bold',
                        fontSize: 14,
                    },
                }],
                yAxes: [{
                    ticks: {
                        beginAtZero: true,
                    },
                    display: true,
                }],
                
               
                    // gridLines: false,
                
            },
            legend: {
                // position: 'right',
                display: false,
            },
            layout: {
                padding: {
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0
                }
            }
            // title: {
            //     display: true,
            //     text: 'Chart.js Horizontal Bar Chart'
            // }
        }
    })
}

function multiLineChart(div_id, data) {

    var ctx = document.getElementById(div_id).getContext('2d');
    addAccessibilityItems(div_id, data.title);

    // add default settings to the dataset.
    d2 = []
    templateObj = {
        fill: false,
        borderWidth: 4,
        lineTension: 0
    }

    for (d of data.datasets) {

        let merged = {
            ...templateObj,
            ...d
        };
        d2.push(merged)
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.x,
            datasets: d2,
        },
        options: {
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            responsive: true,
            // events: ['click' ],
            tooltips: {
                // position: position,
                mode: "nearest",
                intersect: false,
            },
            legend: {
                display: true,
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_x,
                    },
                    // gridLines: false,
                }, ],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_y,
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {

                            if (value > 1000000) {
                                return value / 1000000 + "M";
                            }
                            if (value > 1000) {
                                return value / 1000 + "K";

                            } else {
                                return value
                            }
                        }
                    },
                    // gridLines: true,
                }, ],
            },
        },
    });
}

function stackedArea(div_id, data) {

    var ctx = document.getElementById(div_id).getContext('2d');
    addAccessibilityItems(div_id, data.title);
    console.log(data.datasets)
    // add default settings to the dataset.
    let d2 = []
    let templateObj = {
        fill: true,
        borderWidth: 4,
        lineTension: 0        
    }
    let i = 0

    for (d of data.datasets) {
        if (i==0) {
            val = 'origin'
        } else {
            val = "-1"
        }
        let merged = {
            ...templateObj,
            ...d,
            fill: val, 
            backgroundColor: d.borderColor +"66", 
        };
        d2.push(merged)
        i += 1;
    }

    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.x,
            datasets: d2,
        },
        options: {
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            responsive: true,
            // events: ['click' ],
            tooltips: {
                // position: position,
                mode: "nearest",
                intersect: false,
            },
            legend: {
                display: true,
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_x,
                    },
                    // gridLines: false,
                }, ],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_y,
                    },
                    stacked:true,
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {

                            if (value > 1000000) {
                                return value / 1000000 + "M";
                            }
                            if (value > 1000) {
                                return value / 1000 + "K";

                            } else {
                                return value
                            }
                        }
                    },
                    // gridLines: true,
                }, ],
            },
        },
    });
}


function lineChart(div_id, data) {

    var ctx = document.getElementById(div_id).getContext('2d');
    addAccessibilityItems(div_id, data.title);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.x,
            datasets: [{
                label: data.title,
                data: data.y,
                backgroundColor: data.color + '22',
                borderColor: data.color,
                borderWidth: 4,
                lineTension: data.line_tension,
                // fill: false,
            }, ],
        },
        options: {
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            responsive: true,
            // events: ['click' ],
            tooltips: {
                // position: position,
                mode: "nearest",
                intersect: false,
            },
            legend: {
                display: false,
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_x,
                        fontStyle: 'bold',
                        fontSize: 14,
                    },
                    // gridLines: false,
                }, ],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_y,
                        fontStyle: 'bold',
                        fontSize: 14,
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {

                            if (value > 1000000) {
                                return value / 1000000 + "M";
                            }
                            if (value > 1000) {
                                return value / 1000 + "K";

                            } else {
                                return value
                            }
                        }
                    },
                    // gridLines: true,
                }, ],
            },
        },
    });
}


function mixedChart(div_id, data) {
    var ctx = document.getElementById(div_id).getContext('2d');
    addAccessibilityItems(div_id, data.title);
    console.log(data.y)
    new Chart(ctx, {
        type: 'bar',
        data: {
            datasets: data.y,
            labels: data.x
        },
        options: {
            maintainAspectRatio: true,
            aspectRatio: 1,
            responsive: true,
            // events: ['click' ],
            tooltips: {
                // position: position,
                mode: "nearest",
                intersect: false,
            },
            legend: {
                display: true,
                position: 'bottom'
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_x,
                        fontStyle: 'bold',
                        fontSize: 14,
                    },
                    // gridLines: false,
                }, ],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_y,
                        fontStyle: 'bold',
                        fontSize: 14,
                    },
                    ticks: {
                        beginAtZero: true,
                        callback: function (value, index, values) {

                            if (value > 1000000) {
                                return value / 1000000 + "M";
                            }
                            if (value > 1000) {
                                return value / 1000 + "K";

                            } else {
                                return value
                            }
                        }
                    },
                    // gridLines: true,
                }, ],
            },
        },
    });
}

function pointChart(div_id, data) {

    var ctx = document.getElementById(div_id).getContext('2d');
    addAccessibilityItems(div_id, data.title);

    new Chart(ctx, {
        type: "line",
        data: {
            labels: data.x,
            datasets: [{
                label: data.title,
                data: data.y,
                backgroundColor: data.color + '22',
                borderColor: data.color,
                showLine: false,
                pointRadius: 10,
                pointStyle: 'rectRounded',
                borderWidth: 4,
                lineTension: data.line_tension,
                // fill: false,
            }, ],
        },
        options: {
            maintainAspectRatio: true,
            aspectRatio: 1.5,
            responsive: true,
            // events: ['click' ],
            tooltips: {
                // position: position,
                mode: "nearest",
                intersect: false,
            },
            legend: {
                display: false,
            },
            layout: {
                padding: {
                    left: 0,
                    right: 10,
                    top: 0,
                    bottom: 0
                }
            },
            scales: {
                xAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_x,
                        fontStyle: 'bold',
                        fontSize: 14,
                    },
                    // gridLines: false,
                }, ],
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: data.label_y,
                        fontStyle: 'bold',
                        fontSize: 14,
                    },
                    ticks: {
                        min: 1,
                        // beginAtZero: true,
                        callback: function (value, index, values) {

                            if (value > 1000000) {
                                return value / 1000000 + "M";
                            }
                            if (value > 1000) {
                                return value / 1000 + "K";

                            } else {
                                return value
                            }
                        }
                    },
                    // gridLines: true,
                }, ],
            },
        },
    });
}

// Helper function for DSS
function create_rest_category(data, fraction, numfield, charfield) {

    // get total
    const reducer = (accumulator, currentValue) => accumulator + parseInt(currentValue.n);
    const total = data.reduce(reducer, 0)

    // Sort
    data.sort(function (a, b) {
        return b[numfield] - a[numfield]
    })


    let data_aggr = []
    let rest = 0
    let i = 0

    const threshold = fraction * total

    for (d of data) {
        // console.log(d)

        if (d[numfield] < threshold) {
            rest = rest + d.n
        } else {
            let d2 = d;
            d2["order"] = i;
            data_aggr.push(d2)
            i++;
        }
    }

    let new_record = data[0]
    new_record[numfield] = rest
    new_record[charfield] = "Other"
    new_record["order"] = i

    data_aggr.push(new_record);

    return data_aggr;
}