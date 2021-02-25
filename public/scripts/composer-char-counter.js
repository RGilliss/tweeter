$(document).ready(function() {
  //sets counter equal to 140 minus the length of the input in the text box
  document.getElementById("tweet-text").addEventListener("input", function () {
    const charCount = 140 - $(this).val().length;
    const counter = $(this).parent().find(".counter");
    $(counter).val(charCount);
    colorChange(counter, charCount)
  })
});


//Changes color of character count if above or below 0
const colorChange = function (counter, charCount) {
  if (charCount < 0) {
    $(counter).css("color", "red")
  }
  if (charCount >=0) {
    $(counter).css("color", "dimgrey")
  }
}