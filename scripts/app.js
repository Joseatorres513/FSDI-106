function saveTask()
{
    console.log("saving task");
    //get values

    const title = $("#txtTitle").val();
    const desc = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date = $("#startDate").val();
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
        <p>${task.description}</p>
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
            for(let i= 0; i<data.length;i++){
                let task = data[i];
                if (task.name === "Jose513") {
                    displayTask(task);
                }
            }
            console.log(data);
        },
        error: function(error) {
            console.log(error);
        }
})
}

// from the object returned get only messages that were created by you.
//tip 1. Modify the class to include your user.
//tip 2. use a for loop
//tip3. then an if statement


function deleteAllTasks(){
    $.ajax({
        type: "DELETE",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response){
            console.log("Tasks deleted successfully");
            $(".list-class").html("");
        },
        error: function(error){
            console.log("Error deleting tasks",error);
        }
    });
}


function init() {
    console.log("task manager");

    //load data
    loadTask();

    //hook the events
    $("#btnSave").click(saveTask);
    $("#btnDeleteAll").click(deleteAllTasks);
}

window.onload = init;