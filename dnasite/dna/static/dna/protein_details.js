function loadPage() {
  proteinAccession = window.location.pathname.split("/").pop();

  console.log(proteinAccession);

  data = {
    proteinAccession: proteinAccession,
  };

  $.ajax({
    type: "GET",
    url: "/api/dna/getProteinDetails",
    data: data,
    success: function (returnedValue) {
      if (returnedValue.ok) {
        // Render data
        console.log(returnedValue);
        displayProteinDetails(returnedValue.data);
      } else {
        console.log(returnedValue);
      }
    },
    error: function (returnedValue) {
      console.log(returnedValue);
    },
  });
}

function displayProteinDetails(details) {
  mainContent = document.getElementById("main-content");
  console.log(details.gnCoordinate[0].genomicLocation.chromosome);
  mainContent.innerHTML = `
  <div class="row justify-content-start" id="${details.accession}">
    <p class="text-left">Name: ${details.name}</p>
    <p class="text-left">Taxonomy ID: ${details.taxid}</p>
    <p class="text-left">Gene Name: ${details.gene[0].value}</p>
    <p class="text-left">Located on Chromosome ${
      details.gnCoordinate[0].genomicLocation.chromosome
    }</p>
    <p class="text-left word-wrap">Sequence: </p>
    <p class="text-left word-wrap">${details.sequence.replace(
      /(.{10})/g,
      "$1 "
    )}</p>
  </div>
  `;

  proteinFeatures = details.gnCoordinate[0].feature;

  detailSection = document.getElementById(details.accession);

  if (details.gnCoordinate[0].feature != null) {
    for (i = 0; i < details.gnCoordinate[0].feature.length; ++i) {
      detailSection.innerHTML += `
        <p class="text-left">Feature ${i + 1}:</p>
        <dl class = "row">
          <dt class="col-sm-3">Feature Type:</dt>
          <dd class="col-sm-9">${proteinFeatures[i].type}</dd>
          
          <dt class="col-sm-3">Description:</dt>
          <dd class="col-sm-9">${proteinFeatures[i].description}</dd>

          <dt class="col-sm-3">Genome Location:</dt>
          <dd class="col-sm-9">${
            proteinFeatures[i].genomeLocation.begin.position
          } (${proteinFeatures[i].genomeLocation.begin.status}) to ${
        proteinFeatures[i].genomeLocation.end.position
      } (${proteinFeatures[i].genomeLocation.end.status})</dd>

          <dt class="col-sm-3">Location Relative to Gene:</dt>
          <dd class="col-sm-9">${proteinFeatures[i].location.begin.position} (${
        proteinFeatures[i].location.begin.status
      }) to ${proteinFeatures[i].location.end.position} (${
        proteinFeatures[i].location.end.status
      })</dd>
        </dl>
      `;
    }
  }

  if (details.PDBURL != null) {
    detailSection.innerHTML += `
  
    <div style="height: 400px; width: 400px; position: relative;" class='viewer_3Dmoljs' data-href='${details.PDBURL}' data-backgroundcolor='0xffffff' data-style='stick' data-ui='true'></div>       
    
    `;
  }
}

document.addEventListener("projectLoaded", loadPage());
