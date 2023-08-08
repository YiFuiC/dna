var total_pages;

function loadPage() {
  proteinSubmit = document.getElementById("proteinSubmit");

  pForm = document.forms["pForm"];

  // Add event listener to the submit button
  proteinSubmit.addEventListener("click", function (event) {
    data = {};

    container = document.getElementById("pForm");

    inputs = container.getElementsByTagName("input");

    for (index = 1; index < inputs.length; ++index) {
      if (inputs[index].value != "") {
        data[inputs[index].id] = inputs[index].value;
      }
    }

    getProteins(data);

    event.stopPropagation();
  });
}

function getProteins(data) {
  // Obtain csrftoken using getCookie function found in layout.js
  const csrftoken = getCookie("csrftoken");

  // Send request to API to get proteins
  $.ajax({
    type: "POST",
    url: "/api/dna/listProteins",
    headers: { "X-CSRFToken": csrftoken },
    data: JSON.stringify(data),
    success: function (returnedValue) {
      if (returnedValue.ok) {
        // Render data
        console.log(returnedValue.data);
        total_pages = returnedValue.total_pages;
        drawTable(returnedValue.data);
        displayProteins(returnedValue.data, 1);
      } else {
        console.log(returnedValue);
      }
    },
    error: function (returnedValue) {
      console.log(returnedValue);
    },
  });
}

function drawTable(pages) {
  console.log(total_pages);

  proteinTableDiv = document.getElementById("proteinTableDiv");
  proteinTableDiv.innerHTML = ``;
  proteinTableDiv.innerHTML += `
    <table class = "table" id="proteinTable">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Taxonomy ID</th>
          <th scope="col">Full Name</th>
        </tr>
      </thead>
      <tbody id="proteinTableBody">
      </tbody>
    </table>
  <nav aria-label="Page navigation">
    <ul class="pagination justify-content-center" id="proteinPagination">
    </ul>
  </nav>
  `;

  for (index = 1; index <= total_pages; ++index) {
    proteinPagination = document.getElementById("proteinPagination");

    proteinPagination.innerHTML += `
    
    <li class="page-item"><a class="page-link" id="${index}">${index}</a></li>
    
    `;
  }

  pageNumbers = document.getElementsByClassName("page-link");

  for (i = 0; i < pageNumbers.length; i++) {
    pageNumbers[i].addEventListener("click", function (event) {
      displayProteins(pages, this.id);
    });
  }
}

function displayProteins(pages, currentPage) {
  proteinTableBody = document.getElementById("proteinTableBody");

  proteinTableBody.innerHTML = ``;

  for (index = 0; index < pages[currentPage].length; ++index) {
    proteinTableBody.innerHTML += `
    <tr id="${pages[currentPage][index].accession}">
      <td>${pages[currentPage][index].name}</td>
      <td>${pages[currentPage][index].taxid}</td>
      <td>${pages[currentPage][index].fullName}</td>
    </tr>
    
    `;
  }
}

document.addEventListener("projectLoaded", loadPage());
