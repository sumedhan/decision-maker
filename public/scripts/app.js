// USE FOR ON PAGE EVENTS ONLY
$(() => {
  if (document.getElementById('sortable')) {
    $("#errorMsg").hide();
    let orderArray = [];
    $( "#sortable" ).sortable({
    update: function(event, ui) {
      var order =   $(this).sortable('toArray');
      orderArray = order;
      // console.log(orderArray);
      }
    });
    $( "#sortable" ).disableSelection();

    $( "#nameField" ).on("input", function() {
      $("#errorMsg").slideUp();
    });

    $( "#voteSubmit").on("click", function(event) {
      event.preventDefault();
      let voterName = $(this).parents("#voteSubmitForm").find("#nameField").val();
      if(voterName === "") {
        $("#errorMsg").slideDown();
      } else {
        $.ajax({
          method: 'POST',
          url: '/polls/:v_url/',
          data: JSON.stringify({orderArray}),
          contentType: 'application/json',
          success:function(result){
            console.log("we are working");
            window.location = "http://localhost:8080" ;
          },
          error:function(err){
            console.log("something happened");
          }
        });
      }
    });
  }

  if (document.getElementById('addOptionBtn')) {
    let optionCount = 3;
    $( "#addOptionBtn").on('click', function (event) {
      event.preventDefault();
      let newOption = $('<div>').addClass("form-group");
      let newDesc = $('<div>').addClass("form-group");
      newOption.append(
        $('<label>')
          .attr('for', `option${optionCount}`)
          .text(`Option ${optionCount}`),
        $('<input>')
          .attr('type', 'text')
          .addClass('form-control')
          .attr('name', `option${optionCount}`)
          .attr('placeholder', `Option ${optionCount}`)
      );
      newDesc.append(
        $('<label>')
          .attr('for', "comment")
          .text("Description (optional):"),
        $('<textarea>')
          .addClass('form-control')
          .attr('rows', '5')
          .attr('name', `details${optionCount}`)
      );
      let renderOption = newOption[0].outerHTML;
      let renderDesc = newDesc[0].outerHTML;
      $('#optionsList').append(renderOption);
      $('#optionsList').append(renderDesc);
      optionCount += 1;
    });
  }
});
