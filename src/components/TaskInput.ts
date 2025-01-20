import { Component } from "./Component";
// @ts-ignore
import { LocalStorageService } from "./LocalStorageService";

export class TaskInput extends Component<HTMLDivElement, HTMLDivElement> {
  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  status: "active" | "complete";

  constructor() {
    super("task-input", "app", true, "task-input");

    this.titleInput = this.element.querySelector("#title") as HTMLInputElement;
    this.descriptionInput = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;
    this.status = "active";

    this.submitHandler = this.submitHandler.bind(this);
    this.configure();
  }

  private clearInputs() {
    this.titleInput.value = "";
    this.descriptionInput.value = "";
  }

  configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }

  renderContent() {}

  submitHandler(event: Event) {
    event.preventDefault();
    const userInput = this.gatherUserInput();

    if (userInput) {
      LocalStorageService.set(userInput.id, userInput);

      const event = new CustomEvent("tasksUpdated");
      document.dispatchEvent(event);
    }

    this.clearInputs();
  }

  gatherUserInput(): {
    id: string;
    title: string;
    description: string;
    status: string;
  } | void {
    const taskId = performance.now().toString();
    const taskTitle = this.titleInput.value;
    const taskDescription = this.descriptionInput.value;
    const taskStatus = this.status;

    return {
      id: taskId,
      title: taskTitle,
      description: taskDescription,
      status: taskStatus,
    };
  }
}
