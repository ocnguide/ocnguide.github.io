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
        var kills = parseInt(str_kills);
        var deaths = parseInt(str_deaths);
        var time = parseFloat(str_time);
        var obj = parseInt(str_obj);

        if (deaths === 0) deaths += 1;

        var kt = kills / time;
        var ot = obj / time;
        var kd = kills / deaths;

        //critria: offense, defense, frontlines, melee, archery (out of 5)
        var offense = offenseScore(ot);
        var melee = meleeScore(kt, kd);
        var archery = archeryScore(kt, kd);
        var defense = defenseScore(archery, melee);
        var frontlines = frontlinesScore(archery, melee);

        var data =
            "Scores:<br>Offense: " + offense +
            "/5<br>Frontlines: " + frontlines +
            "/5<br>Defense: " + defense +
            "/5<br><br>Melee: " + melee +
            "/5<br>Archery: " + archery + "/5";
        var result = window.open();

        result.document.write(data);

    }
}

function offenseScore(ot) {
    var score = 0;

    if (ot < 10)
        score = 0;
    else if (ot < 15)
        score = 1;
    else if (ot < 25)
        score = 2;
    else if (ot < 40)
        score = 3;
    else if (ot < 60)
        score = 4;
    else
        score = 5;

    return score;
}

function archeryScore(kt, kd) {
    var score = 0;

    if (kd < 1)
        score = 0;
    else if (kd < 2)
        score = 1;
    else if (kd < 2.5)
        score = 2;
    else if (kd < 3)
        score = 3;
    else if (kd < 4.5)
        score = 4;
    else
        score = 5;

    if (score > 0 && kt < 1000)
        score -= 1;

    if(score <= 3 && kt > 2200)
        score += 1;

    return score;
}

function meleeScore(kt, kd) {
    var score = 0;

    if (kd < 0.75)
        score = 0;
    else if (kd < 1.25)
        score = 1;
    else if (kd < 1.75)
        score = 2;
    else if (kd < 2.25)
        score = 3;
    else if (kd < 3.75)
        score = 4;
    else
        score = 5;

    if(kt > 2500 && score < 4)
        score += 1;

    if(kt < 2000 && score > 3)
        score -= 1;

    return score;
}

function frontlinesScore(a, m) {
    var score = 0;

    score = a;

    if (score <= 3 && m >= 3)
        score += Math.round(m / 2);
    if (score > 5)
        score = 5;

    if (score >= 3 && m <= 2)
        score -= Math.round((3 - m) / 2);
    if (score < 0)
        score = 0;

    return score;
}

function defenseScore(a, m) {
    var score = 0;

    score = a;

    if (score <= 3 && m >= 4)
        score += Math.round(m / 2.5);
    if (score > 5)
        score = 5;

    if (score >= 3 && m <= 2)
        score -= Math.round((3 - m) / 2.5);
    if (score < 0)
        score = 0;

    return score;
}
