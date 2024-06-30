export function createDialog() {
  if (document.querySelector("dialog.dialog-container")) {
    document.querySelector("dialog.dialog-container").remove()
  }
  const dialog = document.createElement("dialog")
  dialog.classList.add("dialog-container")

  const formContainer = document.createElement("div")
  formContainer.classList.add("form-container")

  const dialogCloseButton = document.createElement("button")
  dialogCloseButton.classList.add("dialog-close-btn")
  dialogCloseButton.setAttribute("autofocus", "")
  dialogCloseButton.textContent = "X"
  dialogCloseButton.addEventListener("click", (event) => dialog.close())
  
  formContainer.append(dialogCloseButton)
  dialog.append(formContainer)
  return dialog
}