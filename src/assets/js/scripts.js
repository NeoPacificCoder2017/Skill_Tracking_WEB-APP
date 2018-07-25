$(document).ready(function () {
      $('.calendar').daterangepicker({
        singleDatePicker: true,
        singleClasses: "picker_4"
      }, function (start, end, label) {
        console.log(start.toISOString(), end.toISOString(), label);
      });
})
