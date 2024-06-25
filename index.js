let addButton = document.getElementById("add");
let modalContainer = document.getElementById("full-modal");
let hideIcon = document.getElementById("close");

let form = document.getElementById("full-form");
let nameInput = document.getElementById("website-name");
let urlInput = document.getElementById("website-url");
let descInput = document.getElementById("website-description");
let totalResources = document.getElementById("resource-container");
let resources = [];

addButton.addEventListener("click", showModalContainer);

function showModalContainer() {
  if (modalContainer.classList.contains("full-modal")) {
    modalContainer.classList.remove("full-modal");
    modalContainer.classList.add("full-modal-show");
  }
}

hideIcon.addEventListener("click", hideModalContainer);
function hideModalContainer() {
  if (modalContainer.classList.contains("full-modal-show")) {
    modalContainer.classList.remove("full-modal-show");
    modalContainer.classList.add("full-modal");
  }
}

form.addEventListener("submit", collectAndSaveResource);
function collectAndSaveResource(event) {
  event.preventDefault();
  let websiteName = nameInput.value;
  let websiteUrl = urlInput.value;
  let websiteDesc = descInput.value;
  const eachResource = {
    resourceName: websiteName,
    resourceUrl: websiteUrl,
    resourceDesc: websiteDesc,
  };
  resources.push(eachResource);
  localStorage.setItem("resources", JSON.stringify(resources));
  form.reset();
  hideModalContainer();
  fetchResources();
  showResources();
}

function fetchResources() {
  if (localStorage.getItem("resources")) {
    theresources = JSON.parse(localStorage.getItem("resources"));
  }
  showResources();
}

fetchResources();

function showResources() {
  totalResources.innerHTML = "";
  resources.forEach(function (resource, index) {
    let theWebsiteName = resource.resourceName;
    let theWebsiteUrl = resource.resourceUrl;
    let theWebsiteDesc = resource.resourceDesc;

    let resourceDiv = document.createElement("div");
    resourceDiv.classList.add("resource");

    let nameIconDiv = document.createElement("div");
    nameIconDiv.classList.add("name-icon");

    let nameText = document.createElement("a");
    nameText.setAttribute("href", `${theWebsiteUrl}`);
    nameText.textContent = theWebsiteName;
    nameText.setAttribute("target", "_blank");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("ri-delete-bin-line");
    deleteIcon.setAttribute("id", "delete");

    let descDiv = document.createElement("div");
    descDiv.classList.add("resource-desc");

    let descText = document.createElement("h5");
    descText.textContent = theWebsiteDesc;

    // Appending
    nameIconDiv.append(nameText, deleteIcon);
    descDiv.append(descText);
    resourceDiv.append(nameIconDiv, descDiv);
    totalResources.append(resourceDiv);
  });
}

// Synchronous & Asynchronous
// Callback
