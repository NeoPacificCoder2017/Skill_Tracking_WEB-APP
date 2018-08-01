$(document).ready(function () {

  var 
  $BODY = $('body'),
  $MENU_TOGGLE = $('#menu_toggle'),
  $SIDEBAR_MENU = $('#sidebar-menu'),
  $SIDEBAR_FOOTER = $('.sidebar-footer'),
  $LEFT_COL = $('.left_col'),
  $RIGHT_COL = $('.right_col'),
  $NAV_MENU = $('.nav_menu'),
  $FOOTER = $('footer');
  
  $('#sidebar-menu').find('a').on('click', function(ev) {
    console.log('clicked - sidebar_menu');
    var $li = $(this).parent();
    
    if ($li.is('.active')) {
      $li.removeClass('active active-sm');
      $('ul:first', $li).slideUp(function() {
        setContentHeight();
      });
    } else {
      // prevent closing menu if we are on child menu
      if (!$li.parent().is('.child_menu')) {
        $('#sidebar-menu').find('li').removeClass('active active-sm');
        $('#sidebar-menu').find('li ul').slideUp();
      }else
      {
        if ( $BODY.is( ".nav-sm" ) )
        {
          $('#sidebar-menu').find( "li" ).removeClass( "active active-sm" );
          $('#sidebar-menu').find( "li ul" ).slideUp();
        }
      }
      $li.addClass('active');
      
      $('ul:first', $li).slideDown(function() {
        setContentHeight();
      });
    }
  });

  var setContentHeight = function () {
    // reset height
    $RIGHT_COL.css('min-height', $(window).height());
  
    var bodyHeight = $BODY.outerHeight(),
      footerHeight = $BODY.hasClass('footer_fixed') ? -10 : $FOOTER.height(),
      leftColHeight = $LEFT_COL.eq(1).height() + $SIDEBAR_FOOTER.height(),
      contentHeight = bodyHeight < leftColHeight ? leftColHeight : bodyHeight;
  
    // normalize content
    contentHeight -= $NAV_MENU.height() + footerHeight;
  
    $RIGHT_COL.css('min-height', contentHeight);
  };
  
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
