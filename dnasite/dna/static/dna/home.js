function loadPage() {
  submit = document.getElementById("transcribeTranslateButton");

  // Add event listener to the submit button
  submit.addEventListener("click", function (event) {
    textfield = document.getElementById("sequenceInput").value;

    if (textfield == null || textfield == "") {
      alert("No DNA sequence entered");
      return;
    }

    sequenceInput();
    event.stopPropagation();
  });
}

function sequenceInput() {
  // Obtain csrftoken using getCookie function found in layout.js
  const csrftoken = getCookie("csrftoken");

  seq = document.getElementById("sequenceInput").value;

  console.log(seq);

  postData = {
    seq: seq,
  };

  // Send request to API to transcribe the input DNA
  $.ajax({
    type: "POST",
    url: "/api/dna/transcribe",
    headers: { "X-CSRFToken": csrftoken },
    data: JSON.stringify(postData),
    success: function (returnedValue) {
      if (returnedValue.ok) {
        // Render data
        console.log(returnedValue);
        mRNA = returnedValue.mRNA;
        displaySeq(mRNA);
        return true;
      } else {
        console.log(returnedValue);
      }
    },
    error: function (returnedValue) {
      console.log(returnedValue);
    },
  });
}

function displaySeq(mRNA) {
  displayField = document.getElementById("sequences");

  if (document.getElementById("outputmRNA") != null) {
    elem = document.getElementById("outputmRNA");
    elem.remove();
    elem2 = document.getElementById("originalOutput");
    elem2.remove();
  }

  displayField.innerHTML += `
  <div class="row justify-content-center" id="outputmRNA">
    <div class="col">
        <p>mRNA Sequence:</p>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-md" id="originalOutput">
        <p class="word-wrap">${mRNA}</p>
    </div>
  </div>
  `;

  loadPage();
}

document.addEventListener("projectLoaded", loadPage());
