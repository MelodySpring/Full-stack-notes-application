const form = document.querySelector("#todoList");
const input = document.querySelector("#itemAdd");
const list = document.querySelector("#newItem");

// Fetch and render data
const fetchData = async () => {
    try {
        const response = await fetch("/data");
        const data = await response.json();

        list.innerHTML = ""; // Clear list

        data.forEach((item) => {
            const li = document.createElement("li");

            // Item text
            const textSpan = document.createElement("span");
            textSpan.textContent = item.text;

            // Delete button
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.dataset.id = item.id;

            deleteBtn.addEventListener("click", async () => {
                try {
                    await fetch(`/data/${item.id}`, {
                        method: "DELETE",
                    });
                    fetchData(); // Refresh list
                } catch (error) {
                    console.error("Error deleting item:", error);
                }
            });

            li.appendChild(textSpan);
            li.appendChild(deleteBtn);
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

// Add new item
form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const newData = { text: input.value };

    try {
        const response = await fetch("/data", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newData),
        });

        if (response.ok) {
            input.value = "";
            fetchData();
        }
    } catch (error) {
        console.error("Error adding data:", error);
    }
});

// Load items on page start
fetchData();
