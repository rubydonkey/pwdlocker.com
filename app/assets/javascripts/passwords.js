$(document).on('click', '.js-password-block-show-hidden', function(e){
  pwd = $(e.target)
  $('.password-block-password-data', pwd).toggle()
})
