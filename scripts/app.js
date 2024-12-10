function saveTask()
{
    console.log("saving task");
    //get values

    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#selDate").val();
    const status = $("#selStatus").val();
    const budget = $("#numBudget").val();
    console.log(title,desc,color,date,status,budget);

    //build an object
    let taskToSave = new Task(title,desc,color,date,status,budget);
    console.log(taskToSave); 
    displayTask(taskToSave);

    //save to server
    $.ajax({
        type: "POST",
        url: "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response) {
        console.log(response);
        },
        error: function(error) {
            console.log(error);
        }
    });
}
    //display the task
function displayTask(task)
{
    console.log(task)
    let syntax = `<div class="task">
        <h5>${task.title}</h5>
        <p>${task.desc}</p>
        </div>
        <div><label>${task.status}</label></div>
        <div><label>${task.date}</label></div>
        <div><label>${task.budget}</label></div>`
        ;



        $(".list-class").append(syntax);
}

function testRequest() {
$.ajax({
        type: "get",
        url: "http://fsdiapi.azurewebsites.net",
        success: function(response){
            console.log(response);
        },
        error: function(error){
            console.log(error)
        }
});
}

function loadTask() {
$.ajax({
        type: "get",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",

        success: function(response) {
            console.log(response);
            let data = JSON.parse(response);
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
})
}
function init() {
    console.log("task manager");

    //load data
    loadTask();

    //hook the events
    $("#btnSave").click(saveTask);
}

window.onload = init;
