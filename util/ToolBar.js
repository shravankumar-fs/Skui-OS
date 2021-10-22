/**
 *
 * @param {HTMLDivElement} windowElement
 * @param {String} customToolbarID
 * @param {String} customToolbarStyle
 * @param {String title
 * @param {String} stats
 * @returns HTMLDivElement ToolBar Object
 */

export function buildToolBar(
  windowElement,
  customToolbarID,
  customToolbarStyle,
  title,
  stats
) {
  const toolBar = document.createElement("div");
  toolBar.id = customToolbarID;
  toolBar.classList.add(customToolbarStyle);

  const titleEl = document.createElement("span");
  titleEl.classList.add("toolBarTitle");
  /**Take decision whether title should be innerHTML or innerText */
  titleEl.innerText = title;

  const closeBtn = document.createElement("button");
  closeBtn.classList.add("close");
  closeBtn.innerText = "X";
  closeBtn.addEventListener("click", () => {
    windowElement.remove();
  });
  toolBar.appendChild(titleEl);
  toolBar.appendChild(closeBtn);

  return toolBar;
}
