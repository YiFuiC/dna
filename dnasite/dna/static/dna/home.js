function loadPage() {
  submit = document.getElementById("transcribeTranslateButton");
  submit.addEventListener("click", sequenceInput);
}

function sequenceInput() {
  const csrftoken = getCookie("csrftoken");

  seq = document.getElementById("sequenceInput").value;

  console.log(seq);

  postData = {
    seq: seq,
  };

  console.log(postData);

  $.ajax({
    type: "POST",
    url: "/api/dna/transcribe",
    headers: { "X-CSRFToken": csrftoken },
    data: JSON.stringify(postData),
    success: function (returnedValue) {
      if (returnedValue.ok) {
        // Render data
        console.log(returnedValue);
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

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

document.addEventListener("projectLoaded", loadPage());
