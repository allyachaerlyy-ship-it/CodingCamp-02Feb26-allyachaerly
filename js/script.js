// Ambil elemen dari HTML
const filterButtons = document.querySelectorAll(".filter-btn");
const taskInput = document.getElementById("taskInput");
const dateInput = document.getElementById("dateInput");
const timeInput = document.getElementById("timeInput");
const addTaskBtn = document.getElementById("addTaskBtn");

// Ambil container list task
const taskListCard = document.querySelector(".card:last-child");

// Array untuk simpan task
let tasks = [];
let currentFilter = "all";

// Event klik tombol tambah task
addTaskBtn.addEventListener("click", function () {
  const taskValue = taskInput.value.trim();
  const dateValue = dateInput.value;
  const timeValue = timeInput.value;

  // VALIDASI
  if (taskValue === "") {
    alert("Nama tugas tidak boleh kosong!");
    return;
  }

  // Buat object task
  const task = {
    name: taskValue,
    date: dateValue,
    time: timeValue,
    completed: false,
  };

  tasks.push(task);

  // Reset input
  taskInput.value = "";
  dateInput.value = "";
  timeInput.value = "";

  renderTasks();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", function () {
    currentFilter = this.dataset.filter;

    filterButtons.forEach((b) => b.classList.remove("active"));
    this.classList.add("active");

    renderTasks();
  });
});

// Render task ke HTML
function renderTasks() {
  taskListCard.innerHTML = "<h3>Daftar Tugas</h3>";

  if (tasks.length === 0) {
    taskListCard.innerHTML += `
      <div class="task-empty">
        Belum ada tugas yang ditampilkan 🌸
      </div>
    `;
    return;
  }

  tasks.forEach((task, index) => {
  if (
    (currentFilter === "pending" && task.completed) ||
    (currentFilter === "completed" && !task.completed)
  ) {
    return;
  }

  const taskItem = document.createElement("div");
  taskItem.style.marginBottom = "10px";

  taskItem.innerHTML = `
    <label style="display:flex; gap:10px; align-items:center;">
      <input type="checkbox"
        ${task.completed ? "checked" : ""}
        onchange="toggleTask(${index})">
      <strong>${task.name}</strong>
    </label>
    <small>${task.date || "-"} ${task.time || ""}</small>
    <br/>
    <button onclick="deleteTask(${index})">Hapus</button>
  `;

  taskListCard.appendChild(taskItem);
});
}
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

