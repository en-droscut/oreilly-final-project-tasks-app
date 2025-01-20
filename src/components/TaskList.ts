import { Component } from "./Component";
import { LocalStorageService } from "./LocalStorageService";

export class TaskList extends Component<HTMLDivElement, HTMLElement> {
  constructor(private type: "active" | "finished") {
    super("task-list", "app", true, `tasks-list`);
    this.renderContent();
    this.configure();
  }

  configure() {
    document.addEventListener("tasksUpdated", () => this.renderContent());
  }

  renderContent() {
    const listId = `${this.type}-tasks`;
    const listElement = this.element.querySelector("ul");
    listElement!.id = listId;

    const tasks = LocalStorageService.getAll();
    listElement!.innerHTML = "";

    Object.values(tasks).forEach((task: any) => {
      const item = document.createElement("li");

      if ("complete" === task.status) {
        item.className += "complete";
      }

      this.populateTaskCard(item, task);

      listElement!.appendChild(item);
    });

    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " TASKS";
  }

  populateTaskCard(item: HTMLLIElement, task: any) {
    const title = document.createElement("h2");
    title.textContent = task.title;

    const description = document.createElement("p");
    description.textContent = task.description;

    const deleteIcon = document.createElement("img");
    deleteIcon.className = "icon delete-icon";
    deleteIcon.src = "/src/img/delete.png";
    deleteIcon.addEventListener("click", () => {
      LocalStorageService.remove(task.id);
      document.dispatchEvent(new CustomEvent("tasksUpdated"));
    });

    const editIcon = document.createElement("img");
    editIcon.className = "icon edit-icon";
    editIcon.src = "/src/img/edit.png";

    item.appendChild(title);
    item.appendChild(description);
    item.appendChild(deleteIcon);
    item.appendChild(editIcon);

    if ("active" === task.status) {
      const completeIcon = document.createElement("img");
      completeIcon.className = "icon complete-icon";
      completeIcon.src = "/src/img/complete.png";
      completeIcon.addEventListener("click", () => {
        LocalStorageService.set(task.id, {
          id: task.id,
          title: task.title,
          description: task.description,
          status: "complete",
        });

        document.dispatchEvent(new CustomEvent("tasksUpdated"));
      });

      item.appendChild(completeIcon);
    } else if ("complete" === task.status) {
      const activateIcon = document.createElement("img");
      activateIcon.className = "icon activate-icon";
      activateIcon.src = "/src/img/activate.webp";
      activateIcon.addEventListener("click", () => {
        LocalStorageService.set(task.id, {
          id: task.id,
          title: task.title,
          description: task.description,
          status: "active",
        });

        document.dispatchEvent(new CustomEvent("tasksUpdated"));
      });

      item.appendChild(activateIcon);
    }
  }
}
