import { dragElement } from "../../util/draggable.js";
import { buildToolBar } from "../../util/ToolBar.js";
const arena = document.getElementById("arena");
const notepad = document.getElementById("notepad");

const notes = JSON.parse(localStorage.getItem("notes"));

if (notes) {
  notes.forEach((note) => {
    if (note != "") addNewNote(note);
  });
}

notepad.addEventListener("click", () => {
  if (!document.getElementById("notePadNote")) addNewNote();
});
window.onload = () => {
  document.querySelectorAll("textarea").forEach((text) => {
    text.onpaste = (e) => e.preventDefault();
  });
};

function addNewNote(text = "") {
  const note = document.createElement("div");
  note.classList.add("note");
  note.id = "notePadNote";
  /**ToolBar */
  const noteToolBar = buildToolBar(
    note,
    "noteToolBar",
    "noteToolBar",
    "Notepad"
  );
  /**Tools */
  const tools = document.createElement("div");
  tools.classList.add("tools");
  const editBtn = document.createElement("button");
  editBtn.classList.add("edit");
  editBtn.innerHTML = `<i class="fas fa-edit"></i>`;
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete");
  deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;

  tools.appendChild(editBtn);
  tools.appendChild(deleteBtn);
  /**Main and text area */
  const main = document.createElement("div");
  main.classList.add("notePadMain");
  if (!text) {
    main.classList.add("notePadHidden");
  }
  const textarea = document.createElement("textarea");
  if (text) {
    textarea.classList.add("notePadHidden");
  }

  note.appendChild(noteToolBar);
  note.appendChild(tools);
  note.appendChild(main);
  note.appendChild(textarea);
  arena.appendChild(note);

  textarea.value = text;
  main.innerHTML = marked(text);
  deleteBtn.addEventListener("click", () => {
    textarea.value = ``;
    main.innerHTML = ``;
    updateLS();
  });

  editBtn.addEventListener("click", () => {
    main.classList.toggle("notePadHidden");
    textarea.classList.toggle("notePadHidden");
  });

  textarea.addEventListener("input", (e) => {
    const { value } = e.target;
    main.innerHTML = marked(value);
    updateLS();
  });

  dragElement(note, noteToolBar);
}

function updateLS() {
  const notesText = document.querySelectorAll("textarea");

  const notes = [];

  notesText.forEach((note) => notes.push(note.value));

  localStorage.setItem("notes", JSON.stringify(notes));
}
