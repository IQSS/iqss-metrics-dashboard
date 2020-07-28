// ----------REGULAR/MAIN METRICS -----------------

function loadMainMetrics(url, div_id, group, class_override) {

    if( group === undefined) {
        group = ''
    }
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            let x = data.split("\n");

            for (let i = 1; i < x.length; i++) {
                let fields = x[i].split(/\t/);
                if (fields[0] != undefined && fields[0] != "") {
                    // console.log(fields)
                    if (group === '' || group === fields[0]) {
                        addMetric(fields, div_id, class_override);
                    }
                }
            }
        });
}

function addMetric(fields, div_id, class_override) {

    if(class_override === undefined ) {
        class_override = 'col-sm-6 col-xs-12 col-md-6 col-lg-4 col-xl-3'
    }


    const metricTemplate = document.getElementById("iq-info-box");

    const metricInstance = document.importNode(metricTemplate.content, true);
    if (fields[7].length > 1) {

        if (fields[7].substring(0, 4) == 'http') {
            metricInstance.querySelector(".info-url").setAttribute('href', fields[7])
            metricInstance.querySelector(".info-url").setAttribute('target', "_blank")
            // add _self
        } else {
            metricInstance.querySelector(".info-url").setAttribute('href', fields[7])
        }
    }
    
    metricInstance.querySelector(".info-box-icon").innerHTML = "<span class='" + fields[5] + "'></span>";
    metricInstance.querySelector(".info-box-group").innerHTML = fields[2];
    metricInstance.querySelector(".info-box-value").innerHTML = fields[3];
    metricInstance.querySelector(".info-box-unit").innerHTML = fields[4];
    metricInstance.querySelector(".info-box-div").className = class_override;
    metricInstance.querySelector(".info-box").classList.add("bg-iqss-" + fields[6]);
    // metricInstance.querySelector(".info-box-unit").innerHTML = fields[];
    if (div_id !== "") {
        document.getElementById(div_id).appendChild(metricInstance);
    } else {
        document.getElementById(fields[0]).appendChild(metricInstance);
    }
}

//---------------- SOCIAL MEDIA METRICS -----------------------

function loadSocialMediaMetrics(url, div_id) {
    // console.log(url)
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            let x = data.split("\n");
            for (let i = 1; i < x.length; i++) {
                let fields = x[i].split(/\t/);
                group = ''
                if (fields[0] != undefined && fields[0] != "") {
                    addSocialMediaMetric(fields, div_id);
                }
            }
        });
}

function addSocialMediaMetric(fields, div_id) {

    const metricTemplate = document.getElementById("iq-info-box");

    const metricInstance = document.importNode(metricTemplate.content, true);

    metricInstance.querySelector(".info-box").classList.add("bg-iqss-" + fields[7]);
    metricInstance.querySelector(".info-box-icon").innerHTML = "<span class='" + fields[6] + "'></span>";
    metricInstance.querySelector(".info-box-group").innerHTML = fields[3];
    metricInstance.querySelector(".info-box-value").innerHTML = fields[4];
    metricInstance.querySelector(".info-box-unit").innerHTML = fields[5];

    document.getElementById(div_id).appendChild(metricInstance);
}


// -------------BUSINESS OPERATIONS METRICS-------------------
// This one can use (pre-created) groups

function loadBusinessOperationsMetrics(url, div_id) {
    // console.log(url)
    fetch(url)
        .then((response) => response.text())
        .then((data) => {
            let x = data.split("\n");
            for (let i = 1; i < x.length; i++) {
                let fields = x[i].split(/\t/);
                group = ''
                if (fields[0] != undefined && fields[0] != "") {
                    // console.log(fields)
                    if (group != fields[0]) {
                        group = fields[0]
                    }
                    addBOMetric(fields, div_id);
                }
            }
        });
}



function addBOMetric(fields, div_id) {
    const metricTemplate = document.getElementById("iq-info-box");

    const metricInstance = document.importNode(metricTemplate.content, true);

    metricInstance.querySelector(".info-box").classList.add("bg-iqss-" + fields[4]);
    metricInstance.querySelector(".info-box-icon").innerHTML = "<span class='" + fields[2] + "'></span>";
    metricInstance.querySelector(".info-box-group").innerHTML = fields[1];
    metricInstance.querySelector(".info-box-value").innerHTML = fields[6];
    metricInstance.querySelector(".info-box-unit").innerHTML = fields[5];

    if (div_id !== "") {
        document.getElementById(div_id).appendChild(metricInstance);
    } else {
        document.getElementById(fields[0]).appendChild(metricInstance);
    }
}

function createUniqueGroupDivs(file, main_div, group_field) {
    d3.tsv(file, function(data) {
        groups = []
        data.forEach(element => {
            group = element[group_field]
            if (groups.indexOf(group) === -1) {
                groups.push(group)
            }
        });

        var div = document.getElementById(main_div);
        groups.forEach(element => {
            div.innerHTML += `<h4>${element}</h4>`;
            div.innerHTML += `<div id="${element}" class="row"></div>`;
        });
      });

}