var Name = document.getElementById("bookmarkName");
var url = document.getElementById("bookmarkURL");

var Sites;
if (localStorage.getItem("Sites") == null) {
  Sites = [];
} else {
  Sites = JSON.parse(localStorage.getItem("Sites"));
}

validation = {
  bookmarkName: /^\w{3,}$/,
  bookmarkURL: /^(https?:\/\/)(www\.)?[a-zA-Z]{1,63}\.(com|org|edu)$/,
};

function validInputs(element) {
  element.classList.remove("inpFocus");
  if (validation[element.id].test(element.value) == true) {
    element.classList.remove("is-invalid");
    element.classList.add("is-valid");
    element.nextElementSibling.classList.add("d-none");
  } else {
    element.classList.remove("is-valid");
    element.classList.add("is-invalid");
    element.nextElementSibling.classList.remove("d-none");
  }
}

function isNameUnique(name) {
  const count = Sites.filter((site) => site.name === name).length;
  return count === 1;
}
function addMark() {
  if (
    Name.classList.contains("is-valid") &&
    url.classList.contains("is-valid") &&
    !isNameUnique(Name.value)
  ) {
    var Site = {
      name: Name.value,
      url: url.value,
    };
    Sites.push(Site);
    localStorage.setItem("Sites", JSON.stringify(Sites));
    display();
  } else {
    document.getElementById("error-message").classList.remove("d-none");
  }
}
function cancel() {
  document.getElementById("error-message").classList.add("d-none");
}

function display() {
  var content = ``;
  for (var i = 0; i< Sites.length; i++) {
    content += `<tr class="border-top-0 border-start-0 border-end-0 border-3 border-light text-center" >
              <td class=" py-2">${i + 1}</td>
              <td class=" py-2">${Sites[i].name}</td>
              <td  class=" py-2 ">
              <button onclick='Visit("${
                Sites[i].url
              }")' class= "btn-visit border-0 p-2  rounded-2 text-white fw-semibold "><i class="fa-regular fa-eye " ></i> visit</td>
              <td class=" py-2">
              <button onclick='
              Delete(${i})' class= "btn-delete  border-0 p-2 rounded-2 text-white fw-semibold"> <i class="fa-regular fa-trash-can "></i> Delelte</button></td>
             </tr>`;
  }
  document.getElementById("records").innerHTML = content;
}

function Visit(url) {
  window.location.href = url;
}

display();
function Delete(index) {
  Sites.splice(index, 1);
  display();
  localStorage.setItem("Sites", JSON.stringify(Sites));
}
 