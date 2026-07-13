const form = document.querySelector("#todoList");
const input = document.querySelector("#itemAdd");
const list = document.querySelector("#newItem");

// Function to fetch data from the backend
const fetchData = async () => {
    try {
        const response = await fetch("/data");
        const data = await response.json();
        list.innerHTML = ""; // Clear the list before rendering
        data.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item.text;
            list.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};

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
            input.value = ""; // Clear input field
            fetchData(); // Refresh the list
        }
    } catch (error) {
        console.error("Error adding data:", error);
    }
});

// Fetch data on page load
fetchData();
