$(function() {

  var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if (isMobile.any()) {
    FastClick.attach(document.body);
  }

  function isAndroid() {
    var nua = navigator.userAgent,
        isAndroid = (nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1 && nua.indexOf('Chrome') === -1);
    if (isAndroid) {
      $('html').addClass('android-browser');
    }
  }

  isAndroid();

  $('.menu-trigger').on('click', function() {
    $(this).next('.menu').toggleClass('menu-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.mob-collpanel-trigger').on('click', function() {
    $(this).next('.mob-collpanel').toggleClass('panel-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.collpanel-trigger').on('click', function() {
    $(this).next('.collpanel').toggleClass('panel-open');
    $(this).toggleClass('triggered');
    return false;
  });

  $('.button-toggler').on('click', function() {
    var $this = $(this),
        $target = $this.attr('data-target');

    $('#' + $target).toggleClass('toggle-content');

    return false;
  });

  // Create linked input fields (For using email address as username)
  $('.linked-input-master').on('keyup blur', function() {
    var masterVal = $(this).val();
    $('.linked-input-slave').val(masterVal);
    $('.linked-input-slave').removeClass('hidden').text(masterVal);
    if($(this).val() == '') {
      $('.linked-input-slave').addClass('hidden');
    }
  });

  $(".block-label").each(function(){
    var $target = $(this).attr('data-target');

    // Add focus
    $(".block-label input").focus(function() {
      $("label[for='" + this.id + "']").addClass("add-focus");
      }).blur(function() {
      $("label").removeClass("add-focus");
    });
    // Add selected class
    $('input:checked').parent().addClass('selected');

    if($(this).hasClass('selected')) {
      $('#' + $target).show();
    }
  });

  // Add/remove selected class
  $('.block-label').on('click', 'input[type=radio], input[type=checkbox]', function() {
    var $this   = $(this),
        $target = $this.parent().attr('data-target');

    $('input:not(:checked)').parent().removeClass('selected');
    $('input:checked').parent().addClass('selected');

    if($target == undefined) {
      $this.closest('.form-group').next('.toggle-content').hide().attr('aria-hidden', true);
      $this.closest('.form-group').find('[aria-expanded]').attr('aria-expanded', false);
    } else {
      $('#' + $target).show();
    }

  });

  $('.amend-answers').on('click', function() {
    $(this).closest('.form-group').toggleClass('expanded');
    return false;
  });

  $('.update-answers').on('click', function() {
    $(this).closest('.form-group').toggleClass('expanded');
  });

  $('.summary-trigger').on('click', function() {
    $('.summary-box').toggle();
  });

  $('.summary-close').on('click', function() {
    $('.summary-box').toggle();
  });

  $('.inpage-focus').on('click', function() {
    var $this      = $(this),
        $target    = $this.attr('href'),
        $targetFor = $($target).attr('for');

    $('#' + $targetFor).focus();
  });


  //--------Max character length on textareas

  $('textarea').on('keyup', function() {
    characterCount(this);
  });

  $('textarea:not(:empty)').each(function() {
    characterCount(this);
  });

  function characterCount(that) {
    var $this         = $(that),
        $maxLength    = $this.attr('data-val-length-max'),
        $lengthOfText = $this.val().length, // Removed regex for replacing breaks
        $charCountEl  = $this.closest('.form-group').find('.maxchar-count'),
        $thisAria     = $this.closest('.form-group').find('.aria-limit');

    if($maxLength) {
      $($charCountEl).text($maxLength - $lengthOfText);
    }

    if($lengthOfText > $maxLength) {
      $charCountEl.addClass('has-error');
      $thisAria.text("Character limit has been reached, you must type fewer than " + $maxLength + " characters");
    } else {
      $charCountEl.removeClass('has-error');
      $thisAria.text("");
    }
  }

  //--------Expanding tables

  $('.tbody-3rows').each(function() {
    var $this       = $(this),
        $rowLength  = $this.find('tr').length,
        $expandRows = $this.next('.tbody-expandrows'),
        $after3Rows = $this.find('tr:nth-of-type(3)').nextAll(),
        $after6Rows = $this.find('tr:nth-of-type(6)').nextAll();

    if($rowLength > 3 && !$this.hasClass('tbody-withReasons')) {
      $expandRows.show();
      $after3Rows.hide().attr('aria-hidden', true);
    } else if($rowLength > 6 && $this.hasClass('tbody-withReasons')) {
      $expandRows.show();
      $after6Rows.hide().attr('aria-hidden', true);
    }

  });

  $('.btnExpandRows').on('click', function() {
    var $this        = $(this),
        $tbodyExpand = $this.closest('.tbody-expandrows');
        $tbody3Rows   = $tbodyExpand.prev('.tbody-3rows').find('tr:nth-of-type(3)').nextAll(),
        $tbodyWithReasons  = $tbodyExpand.prev('.tbody-withReasons').find('tr:nth-of-type(6)').nextAll();


    if(!$tbodyExpand.prev('.tbody-withReasons').length > 0) {
      $tbody3Rows.toggle();
    } else if($tbodyExpand.prev('.tbody-withReasons').length > 0) {
      $tbodyWithReasons.toggle();
    }

    $this.closest('table').toggleClass('opened');

    if($this.text().indexOf('More') > -1) {
      $this.html('<i class="fa fa-angle-up"></i>Less');
      $this.attr('aria-expanded', false);
      if(!$tbodyExpand.prev('.tbody-withReasons').length > 0){
        $tbody3Rows.attr('aria-hidden', false);
      } else if ($tbodyExpand.prev('.tbody-withReasons').length > 0) {
        $tbodyWithReasons.attr('aria-hidden', false);
      }
    } else {
      $this.html('<i class="fa fa-angle-down"></i>More');
      $this.attr('aria-expanded', true);
      if(!$tbodyExpand.prev('.tbody-withReasons').length > 0){
        $tbody3Rows.attr('aria-hidden', true);
      } else if ($tbodyExpand.prev('.tbody-withReasons').length > 0) {
        $tbodyWithReasons.attr('aria-hidden', true);
      }
    }

    return false;

  });

  //----------Details > Summary ARIA

  $('[aria-expanded]').on('click', function() {
    var $this = $(this),
        $controls = $(this).attr('aria-controls');

    if(!$this.parent().hasClass('selected')) {
      if($this.is('[aria-expanded="false"]')) {
        $('#' + $controls).attr('aria-hidden', false);
        $this.attr('aria-expanded', true);
      } else {
        $('#' + $controls).attr('aria-hidden', true);
        $this.attr('aria-expanded', false);
      }
    }

  });

  $('[aria-hidden]').each(function() {
    var $controlID = $(this).attr('id');

    if($(this).is(':visible')) {
      $(this).attr('aria-hidden', false);
      $('[aria-controls="' + $controlID + '"]').attr('aria-expanded', true);
    }
  });

  //----------Radio expanding lists IE8

  if($('html').hasClass('lt-ie9')) {
     $('.list-checkradio input[type=radio]:checked').siblings('details').addClass('ie8-details');

     $('.list-checkradio > li').on('click', function () {
       var $this = $(this),
           $thisDetails = $this.find('details');

       $('.list-checkradio input[type=radio]').not(':checked').siblings('details').removeClass('ie8-details');

       $thisDetails.addClass('ie8-details');

     });
   }

  //----------Tabbed content

  $('.tabbed-tab').attr('href', "#");

  $('.tabbed-tab').on('click', function() {
      var $this = $(this),
          $tabId = $this.attr('tab');

      $this.addClass('active');

      $('.tabbed-tab').not($('[tab="' + $tabId + '"]')).removeClass('active');

      if ($($tabId).length) {
          $($tabId).show();

          $('.tabbed-content').not($tabId).hide();
      } else {
          var $tabClass = '.' + $tabId.substr(1);

          $('.tabbed-element' + $tabClass).show();
          $('.tabbed-element').not($tabClass).hide();
      }

      return false;
  });

  //------- Select to inject content to text input

  $('.select-inject').on('change', function() {
    var $this = $(this),
        $selectedOption = $this.find('option:selected'),
        $thisOptionText = $selectedOption.text();

    $this.next('.select-injected').val($thisOptionText);

    if($selectedOption.val() == "noSelect") {
      $this.next('.select-injected').val("");
    }
  });

  //------- Inline details toggle

  $('.summary-style').on('click', function() {
    $this = $(this);

    $this.toggleClass('open');

    $this.next('.detail-content').toggle();
  });


});