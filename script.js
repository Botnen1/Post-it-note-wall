var container2 = document.getElementsByClassName("container2")[0];
var container3 = document.getElementsByClassName("container3")[0];
var checkIcon = document.getElementById("checkIcon");
var closeIcon = document.getElementById("closeIcon");

closeIcon.addEventListener("click", function () {
    newNote();
});
checkIcon.addEventListener("click", function () {
    createNote();
});

function newNote() {
    if (container3.style.display == "none") {
        container3.style.display = "block";
    } else {
        container3.style.display = "none";
    }
}

function createNote() {
    var noteText = document.getElementById("note-text").value;
    if (noteText.trim() === "") {
        return; // Prevent adding empty notes
    }

    var node0 = document.createElement("div");
    var node1 = document.createElement("h1");

    node1.innerHTML = noteText;

    node1.setAttribute("style", "width:250px; height:250px; font-size:26px; padding:25px; margin-top: 10px; overflow:hidden; box-shadow: 0px 10px 24px 0px rgba(0,0,0,0.57)");

    node1.style.margin = margin();
    node1.style.transform = rotate();
    node1.style.background = color();

    node0.appendChild(node1);

    container2.insertAdjacentElement("beforeend", node0);

    node0.addEventListener("mouseenter", function () {
        node0.style.transform = "scale(1.1)";
    });
    node0.addEventListener("mouseleave", function () {
        node0.style.transform = "scale(1)";
    });

    node0.addEventListener("dblclick", function () {
        node0.remove();
        saveData();
    });

    document.getElementById("note-text").value = "";

    saveData();
}

function margin() {
    var random_margin = ["-5px", "1px", "5px", "10px", "15px", "20px"];
    return random_margin[Math.floor(Math.random() * random_margin.length)];
}

function rotate() {
    var random_rotate = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-10deg)"];
    return random_rotate[Math.floor(Math.random() * random_rotate.length)];
}

function color() {
    var random_color = ["#EE5D57", "#EE579D", "#E8EE57", "#9DEE57", "#EEA857", "#57DAEE", "#578EEE", "#6B57EE"];
    return random_color[Math.floor(Math.random() * random_color.length)];
}

function saveData() {
    var notes = container2.innerHTML;
    localStorage.setItem('notes', notes);
}

function showTask() {
    var storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
        container2.innerHTML = storedNotes;
        attachListenersToNotes(); // Reattach event listeners after restoring notes
    }
}
showTask();

function attachListenersToNotes() {
    var notes = container2.children;
    for (var i = 0; i < notes.length; i++) {
        var note = notes[i];
        note.addEventListener("mouseenter", function () {
            this.style.transform = "scale(1.1)";
        });
        note.addEventListener("mouseleave", function () {
            this.style.transform = "scale(1)";
        });
        note.addEventListener("dblclick", function () {
            this.remove();
            saveData();
        });
    }
}
