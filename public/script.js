var form = document.querySelector("#todoList");
var input = document.querySelector("#itemAdd");
var list = document.querySelector("#newItem");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    var item = input.value.trim();

    if (item === "") {
        alert("Nothing entered. Please enter an item.");
        return;
    }

    var existingItems = document.querySelectorAll("#newItem li span");
    for (var span of existingItems) {
        if (span.innerText.toLowerCase() === item.toLowerCase()) {
            input.value = "";
            alert("That item already exists, please enter a new To Do item.");
            return;
        }
    }

    var newLI = document.createElement("li");


    var textSpan = document.createElement("span");
    textSpan.innerText = item;

    var deleteBtn = document.createElement("button");
    deleteBtn.innerText = "DELETE";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        newLI.remove();
    });

    newLI.appendChild(textSpan);
    newLI.appendChild(deleteBtn);
    list.appendChild(newLI);

    input.value = "";
});
