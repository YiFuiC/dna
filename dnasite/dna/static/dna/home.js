
function loadPage(){

   submit = document.getElementById("transcribeTranslateButton")
   submit.addEventListener("click",sequenceInput)
}

function sequenceInput(){



    seq = document.getElementById("sequenceInput").value

    console.log(seq)

    postData={
        seq: seq
    }

    $.ajax({
        type: "GET",
        url: "/api/transcribe",
        data: postData,
        success: function (returnedValue){
            if (returnedValue.ok) {
                // Render data
                console.log(returnedValue)
                return true
            }else{
                console.log(returnedValue)
            }
        },
        error: function(returnedValue){
            console.log(returnedValue)
        }

    })


}

document.addEventListener('projectLoaded', loadPage());