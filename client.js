$(document).ready(readyNow);
let yearlyCost = 0;
function readyNow() {
    $("#submitBtn").on("click",addEmployee);
    $("tbody").on("click",".deleteBtn",deleteEmployee);
}


function addEmployee() {
    let firstEl = $("#firstInput");
    let lastEl = $("#lastInput");
    let idEl = $("#idInput");
    let titleEl = $("#titleInput");
    let salaryEl = $("#salaryInput");

    yearlyCost += Number(salaryEl.val());
    console.log(yearlyCost);
    $("table").append(
        `<tr>
            <td>${firstEl.val()}</td>
            <td>${lastEl.val()}</td>
            <td>${idEl.val()}</td>
            <td>${titleEl.val()}</td>
            <td id="annualSalary">${salaryEl.val()}</td>
            <td><button class="deleteBtn">Delete</button></td>
        </tr>`
    );

    checkMonthly(yearlyCost);
}

function deleteEmployee() {
    let employeeSalary = Number($(this).closest("tr").find("#annualSalary").text());
    yearlyCost -= employeeSalary;
    checkMonthly(yearlyCost)
    $(this).closest("tr").remove();
}

function checkMonthly(cost) {
    if(cost/12 >= 20000) {
        $("#monthlyCost").css("background-color","red");
    } else {
        $("#monthlyCost").css("background-color","white");
    }

    $("#monthlyCost").text("Monthly Total: $" + cost/12);
}