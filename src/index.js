const ROOT_NODE = document.querySelector("#app");

const appendElementToNode = (node, element) => {
  node.appendChild(element);
};

const getID = () => {
  return Date.now().toString();
};

const setStylePropToEl = (el, prop, value) => {
  el.style[prop] = value;
};

const getMemberNameInputEl = (id) => {
  const el = document.createElement("INPUT");

  el.setAttribute("type", "text");
  el.setAttribute("placeholder", "Name of member");
  el.setAttribute("id", id);

  setStylePropToEl(el, "display", "block");

  return el;
};

const handleDeleteMemberBtnClick = (id) => {
  document.querySelector(`[data-id="${id}"]`).remove();
};

const getDeleteMemberBtnEl = (id) => {
  const el = document.createElement("BUTTON");

  el.textContent = "Remove member";

  setStylePropToEl(el, "display", "block");
  setStylePropToEl(el, "margin-left", "5px");

  el.addEventListener("click", () => {
    handleDeleteMemberBtnClick(id);
  });

  return el;
};

const makeMemberControl = () => {
  const ID = getID();
  const el = document.createElement("DIV");

  setStylePropToEl(el, "display", "flex");
  setStylePropToEl(el, "margin-bottom", "10px");

  el.dataset.id = ID;

  appendElementToNode(el, getMemberNameInputEl(ID));
  appendElementToNode(el, getDeleteMemberBtnEl(ID));
  appendElementToNode(ROOT_NODE, el);
};

const handleAddInputButtonClick = () => {
  makeMemberControl();
};

const makeAddInputButton = () => {
  const el = document.createElement("BUTTON");

  el.textContent = "Add member";

  el.addEventListener("click", handleAddInputButtonClick);

  appendElementToNode(ROOT_NODE, el);
};

const makeHeading = () => {
  const el = document.createElement("H1");

  el.textContent = "Random Ryan";

  appendElementToNode(ROOT_NODE, el);
};

const initApp = () => {
  makeHeading();
  makeAddInputButton();
};

initApp();
