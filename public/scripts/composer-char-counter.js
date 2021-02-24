$(document).ready(function() {
  document.getElementById("tweet-text").addEventListener("input", function () {
    const charCount = 140 - $(this).val().length;
    const counter = $(this).parent().find(".counter");
    $(counter).val(charCount);
    colorChange(counter, charCount)
  })
});

const colorChange = function (counter, charCount) {
  if (charCount < 0) {
    $(counter).css("color", "red")
  }
  if (charCount >=0) {
    $(counter).css("color", "dimgrey")
  }
}