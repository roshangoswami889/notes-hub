function addNote() {
  let title = document.getElementById("title").value;
  let link = document.getElementById("link").value;

  if (title === "" || link === "") return;

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({ title, link });

  localStorage.setItem("notes", JSON.stringify(notes));

  displayNotes();
}

function displayNotes() {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  let list = document.getElementById("notesList");
  let msg = document.getElementById("emptyMsg");

  list.innerHTML = "";

  if (notes.length === 0) {
    msg.style.display = "block";
    return;
  } else {
    msg.style.display = "none";
  }

  notes.forEach((note, index) => {
    let li = document.createElement("li");

    let titleEl = document.createElement("h3");
    titleEl.textContent = note.title;

    let openBtn = document.createElement("button");
    openBtn.textContent = "Open";
    openBtn.onclick = () => window.open(note.link);

    let delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = () => deleteNote(index);

    li.appendChild(titleEl);
    li.appendChild(openBtn);
    li.appendChild(delBtn);

    list.appendChild(li);
  });
}

function deleteNote(index) {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notes));
  displayNotes();
}

window.onload = displayNotes;
function searchNotes() {
  let input = document.getElementById("search").value.toLowerCase();
  let notes = document.querySelectorAll("#notesList li");

  notes.forEach(note => {
    let text = note.textContent.toLowerCase();
    note.style.display = text.includes(input) ? "block" : "none";
  });
}
function toggleDark() {
  document.body.classList.toggle("dark");
}
