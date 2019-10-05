$(document).ready(readyNow);
let yearlyCost = 0;
let rowColor = "white";

function readyNow() {
    $("#submitBtn").on("click", addEmployee);
    $("tbody").on("click", ".deleteBtn", deleteEmployee);
    $("body").on("mouseover", "#submitBtn", borderToWhite);
}


function addEmployee() {
    let firstEl = $("#firstInput");
    let lastEl = $("#lastInput");
    let idEl = $("#idInput");
    let titleEl = $("#titleInput");
    let salaryEl = $("#salaryInput");

    checkInputs(firstEl,lastEl,idEl,titleEl,salaryEl);

    //if (!firstEl.val() &&
    //    !lastEl.val() &&
    //    !idEl.val() &&
    //    !titleEl.val() &&
    //    !salaryEl.val()
    //) {
        try {
            yearlyCost += Number(salaryEl.val());
        } catch(error) {
            
        }
        switchRowColor();
        
        $("table").append(
            `<tr style="background-color:${rowColor}">
            <td>${firstEl.val()}</td>
            <td>${lastEl.val()}</td>
            <td>${idEl.val()}</td>
            <td>${titleEl.val()}</td>
            <td id="annualSalary">${salaryEl.val()}</td>
            <td class="deleteTd"><button class="deleteBtn">Delete</button></td>
        </tr>`
        );

        // firstEl.val("");
        // lastEl.val("");
        // idEl.val("");
        // titleEl.val("");
        // salaryEl.val("");
    //}



    checkMonthly(yearlyCost);
}

function deleteEmployee() {
    let employeeSalary = Number($(this).closest("tr").find("#annualSalary").text());
    yearlyCost -= employeeSalary;
    checkMonthly(yearlyCost)
    $(this).closest("tr").remove();
}

function checkMonthly(cost) {
    if (cost / 12 >= 20000) {
        $("#monthlyCost").css("background-color", "red");
        $("#monthlyCost").css("color","white");
    } else {
        $("#monthlyCost").css("background", "transparent");
        $("#monthlyCost").css("color","black");
    }

    $("#monthlyCost").text("Monthly Total: $" + cost / 12);
}

function borderToWhite() {
    $("#submitBtn").css("border-color", "white");

    $("#submitBtn").on("mouseout", function () {
        $(this).css("border-color", " rgb(78, 206, 78)");
    });
}


function checkInputs(firstEl,lastEl,idEl,titleEl,salaryEl) {
    let inputArray = [firstEl,lastEl,idEl,titleEl,salaryEl];

    for (el of inputArray) {
        if (!el.val()) {
            el.css("border-color","red");
        } else {
            el.css("border-color","rgba(153,236,255,1)");
        }
    }
}

function switchRowColor() {
    if (rowColor == "white") rowColor ="#ebebeb";
    else rowColor = "white";
}