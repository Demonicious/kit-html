/////////////////////////////////////////////////////////////////////////////////////////
// "menu" module scripts

;(function($) {
  'use strict'
  $(function() {
    /////////////////////////////////////////////////////////////////////////////////////////
    // set active menu item on load
    var url = window.location.href
    var page = url.substr(url.lastIndexOf('/') + 1)
    var currentList = $('.kit__header__js ul')
    currentList.each(function() {
      var currentItem = $(this).find('a[href="' + page + '"]')
      if (currentItem.length) {
        $(this)
          .parent()
          .toggleClass('kit__header__tabs--active')
        currentItem.toggleClass('btn-primary btn-light')
        var cloned = $(this).clone()
        $('.kit__header__buttons').html(cloned)
      }
    })

    /////////////////////////////////////////////////////////////////////////////////////////
    // set primary color
    function setPrimaryColor(color) {
      function setColor(_color) {
        window.localStorage.setItem('kit.primary', _color)
        var tag = '<style />'
        var css = `:root { --kit-color-primary: ${_color};}`
        $(tag)
          .attr('id', 'primaryColor')
          .text(css)
          .prependTo('body')
      }
      var style = $('#primaryColor')
      style ? (style.remove(), setColor(color)) : setColor(color)
    }
    var color = window.localStorage.getItem('kit.primary')
    if (color) {
      $('#colorPicker').val(color)
      setPrimaryColor(color)
      $('#resetColor')
        .parent()
        .removeClass('reset')
    }
    $('#colorPicker').on('change', function() {
      var value = $(this).val()
      setPrimaryColor(value)
      $('#resetColor')
        .parent()
        .removeClass('reset')
    })
    $('#resetColor').on('click', function() {
      window.localStorage.removeItem('kit.primary')
      $('#primaryColor').remove()
      $('#resetColor')
        .parent()
        .addClass('reset')
    })
  })
})(jQuery)
