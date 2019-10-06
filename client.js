$(document).ready(readyNow);
let yearlyCost = 0;
let rowColor = "white";

function readyNow() {
    $("#submitBtn").on("click", addEmployee); // add Employee function
    $("tbody").on("click", ".deleteBtn", deleteEmployee); // delete Employee function
    $("body").on("mouseover", "#submitBtn", borderToWhite); // sumbit button styling element

}


function addEmployee() {
    let firstEl = $("#firstInput");
    let lastEl = $("#lastInput");
    let idEl = $("#idInput");
    let titleEl = $("#titleInput");
    let salaryEl = $("#salaryInput");

    checkInputs(firstEl, lastEl, idEl, titleEl, salaryEl); // Styling: if any inputs are empty on submit, turn border of that input red

    // need all inputs
    if (firstEl.val() &&
        lastEl.val() &&
        idEl.val() &&
        titleEl.val() &&
        salaryEl.val()
    ) {
        // add new yearly cost
        yearlyCost += Number(salaryEl.val());

        switchRowColor(); // Styling: table row alternates color

        $("table").append( // append row... accounting function used to style salary number
            `<tr class="notHeader" style="background-color:${rowColor}">
            <td>${firstEl.val()}</td>
            <td>${lastEl.val()}</td>
            <td>${idEl.val()}</td>
            <td>${titleEl.val()}</td>
            <td id="annualSalary">${accounting.formatMoney(salaryEl.val())}</td> 
            <td class="deleteTd"><button class="deleteBtn">Delete</button></td>
        </tr>`
        );

        // clear inputs
        firstEl.val("");
        lastEl.val("");
        idEl.val("");
        titleEl.val("");
        salaryEl.val("");
    }

    // get new monthly cost
    checkMonthly(yearlyCost);
}

function deleteEmployee() {

    // Styling, makes sure 2 rows arent the same color after employee is deleted
    $(this).parent().parent().nextAll().each(function () {
        if ($(this).css("background-color") == "rgb(255, 255, 255)") {
            $(this).css("background-color", "rgb(224, 224, 224)");
        } else {
            $(this).css("background-color", "rgb(255, 255, 255)");
        }
    });
    switchRowColor();


    // get employee salary with account function and recalculate monthly cost
    let employeeSalary = accounting.unformat($(this).closest("tr").find("#annualSalary").text());
    yearlyCost -= employeeSalary;
    checkMonthly(yearlyCost)
    $(this).closest("tr").remove(); // delete row

}


function checkMonthly(cost) {

    // Styling, turns monthly cost display red is over $20000
    if (cost / 12 >= 20000) {
        $("#monthlyCost").css("background-color", "red");
        $("#monthlyCost").css("color", "white");
    } else {
        $("#monthlyCost").css("background", "transparent");
        $("#monthlyCost").css("color", "black");
    }

    // set new monthly cost
    $("#monthlyCost").text("Monthly Total: " + accounting.formatMoney(cost / 12));
}

function borderToWhite() { // styling for submit button
    $("#submitBtn").css("border-color", "white");
    $("#submitBtn").on("mouseout", function () {
        $(this).css("border-color", " rgb(78, 206, 78)");
    });
}


function checkInputs(firstEl, lastEl, idEl, titleEl, salaryEl) {
    let inputArray = [firstEl, lastEl, idEl, titleEl, salaryEl];

    // runs through inputs and turns border red if they are empty when submit is clicked
    for (el of inputArray) {
        if (!el.val()) {
            el.css("border-color", "red");
        } else {
            el.css("border-color", "rgba(153,236,255,1)");
        }
    }
}

// alternate table row color
function switchRowColor() {
    if (rowColor == "white") rowColor = "rgb(224, 224, 224)";
    else rowColor = "white";
}