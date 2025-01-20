export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    source: string,
    target: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = document.getElementById(
      source
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById(target) as T;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild! as U;
    this.element.id = newElementId ? newElementId : this.element.id;

    this.attach(insertAtStart);
  }

  private attach(insertAtBeggining: boolean) {
    this.hostElement.insertAdjacentElement(
      insertAtBeggining ? "afterbegin" : "beforeend",
      this.element
    );
  }

  abstract configure?(): void;
  abstract renderContent(): void;
}
