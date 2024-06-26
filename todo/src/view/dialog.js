export function createDialog() {
  const dialog = document.createElement("dialog")
  dialog.classList.add("form-container")
  const dialogCloseButton = document.createElement("button")
  dialogCloseButton.classList.add("dialog-close-btn")
  dialogCloseButton.setAttribute("autofocus", "")
  dialogCloseButton.textContent = "X"
  dialogCloseButton.addEventListener("click", (event) => dialog.close())
  dialog.append(dialogCloseButton)
  return dialog
}