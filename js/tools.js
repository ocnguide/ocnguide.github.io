function computeKD() {
    var kills = document.getElementById("kd_kills").value;
    var deaths = document.getElementById("kd_deaths").value;
    var d_kd = document.getElementById("kd_kd").value;

    if (kills === "" || deaths === "" || d_kd === "")
        alert("Please fill in all the information required.");
    else if (isNaN(kills) || isNaN(deaths) || isNaN(d_kd))
        alert("Invalid input(s).");
    else if (!isNaN(kills) && kills.toString().indexOf('.') !== -1)
        alert("Invalid input: kills must be an integer.");
    else if (!isNaN(deaths) && deaths.toString().indexOf('.') !== -1)
        alert("Invalid input: deaths must be an integer.");
    else if (parseInt(deaths) === 0)
        alert("Error: 0 Deaths");
    else {
        var k = parseInt(kills);
        var d = parseInt(deaths);
        var desired_kd = parseFloat(d_kd);

        if (kills/deaths === desired_kd) {
            alert("You already have your desired KD.");
        }

        else if (kills/deaths < desired_kd) {
            var n_k = Math.ceil(desired_kd * d) - k;
            alert("You need " + n_k + " kills to reach your desired KD.");
        }

        else {
            var n_d = Math.ceil(k / desired_kd) - d;
            alert("You need " + n_d + " deaths to reach your desired KD.");
        }
    }
}

function analyze() {
    var str_kills = document.getElementById("kills").value;
    var str_deaths = document.getElementById("deaths").value;
    var str_time = document.getElementById("time").value;
    var str_obj = document.getElementById("obj").value;

    if (str_kills === "" || str_deaths === "" || str_time === "" || str_obj === "")
        alert("Please fill in all the information required.");
    else if (isNaN(str_kills) || isNaN(str_deaths) || isNaN(str_time) || isNaN(str_obj))
        alert("Invalid input(s).");
    else if (!isNaN(str_kills) && str_kills.toString().indexOf('.') !== -1)
        alert("Invalid input: kills must be an integer.");
    else if (!isNaN(str_deaths) && str_deaths.toString().indexOf('.') !== -1)
        alert("Invalid input: deaths must be an integer.");
    else if (!isNaN(str_obj) && str_obj.toString().indexOf('.') !== -1)
        alert("Invalid input: objectives must be an integer.");
    else {

    }
}
