$(document).ready(function () {
  $('#menu_toggle').on('click', function() {
		console.log('clicked - menu toggle');
		
		if ($("body").hasClass('nav-md')) {
			$('#sidebar-menu').find('li.active ul').hide();
			$('#sidebar-menu').find('li.active').addClass('active-sm').removeClass('active');
		} else {
			$('#sidebar-menu').find('li.active-sm ul').show();
			$('#sidebar-menu').find('li.active-sm').addClass('active').removeClass('active-sm');
		}

    $("body").toggleClass('nav-md nav-sm');
  });
  // $('.calendar').daterangepicker({
  //   singleDatePicker: true,
  //   singleClasses: "picker_4",
  //   autoUpdateInput: true,
  //   autoApply: true,
  //   locale: {
  //     format: 'DD/MM/YYYY'
  //   }
  // }, function (start, end, label) {
  //   console.log(start.toISOString(), end.toISOString(), $(this));
  // });
  // $('.calendar').on('change.datepicker', function(ev){
  //   var picker = $(ev.target).data('daterangepicker');
  //   var id = $(ev.target).attr('id');
  //   console.log($("#"+id).val()); 
  //   console.log($(ev.target).attr('id')); 
  //   console.log(picker.startDate.format('DD-MM-YYYY'));
  // });
})
