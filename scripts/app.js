function saveTask(){
    console.log("saving task");
}

function init() {
    console.log("task manager");
    //load data

    //hook the events
    $("#btnSave").onClick(saveTask);
}

window.onload = init;