$(function(){
  var tudos=[];

  if (localStorage.tudos_data) {
    tudos=JSON.parse(localStorage.tudos_data);
    render();
  }else{
    localStorage.tudos_data=JSON.stringify(tudos);
  }

  function render(){
    $('.contant').empty();
    $.each(tudos,function(i,v) {
      // if (v.status) {
        // $('.item .tick i').addClass('icon-duigou');
      // }
      $("<li class='item'> <div class='time'><span></span></div> <div class='elem'><p>"+v.title+"</p><span></span><div class='del'><i class='icon-font icon-shanchu'></i></div></div> <div class='tick'><i class='icon-font'></i></div></li><i class='i-bottom'></i>")
      .appendTo('.contant');
    });
  }

  function add(){
    tudos.push({
      title:"woshi",
      status:0,
      ondel:0
    },
    {
      title:"shenem",
      status:1,
      ondel:1
    });
    localStorage.tudos_data=JSON.stringify(tudos);
    render();
  }

//打对勾
  $('.contant').on('touchstart', '.tick', false);
  $('.contant').on('touchstart', '.tick', function() {
    $(this).children('i').toggleClass('icon-duigou');
  });

  var left=null;
  $('.contant').on('touchstart', '.item', function(e) {
    $(this).addClass('bg');
    left = e.originalEvent.changedTouches[0].pageX;
  });

  $('.contant').on('touchmove', '.item', function(e) {
    var n = e.originalEvent.changedTouches[0].pageX;
    $(this).css('transform', 'translateX(-'+(left-n)/100+'rem)');
  });

  // $('.contant').on('touchstart', '.item', false);
  // $(document).on('touchstart', function(e) {
  //   $(this).find('li').addClass('move');
  // });

//点击其他归位
  $(document).on('touchstart', function(e) {
    $(this).find('li').css('transform', 'translateX(0)');
  });


  $('.contant').on('touchend', '.item', function(e) {
    var n = e.originalEvent.changedTouches[0].pageX;
    if (left - n > 40) {
      $(this).css('transform', 'translateX(-1.52rem)');
    }
    $(this).removeClass('bg');
  });

  $(".header-add").on('click', function() {
    add();
  });
  $(".contant").on('touchstart', '.del', false);
  $(".contant").on('touchstart', '.del', function() {
    var index = $(this).closest('li').index();
    tudos.splice(index, 1);
    localStorage.tudos_data=JSON.stringify(tudos);

    $(this).closest('li').addClass('dis').delay(800).queue(function(){
      $(this).closest('li').remove()
      .removeClass('dis')
      .dequeue();
    });
  });


  $('.header-add').on('click',function(){
    $('.sub-hearder').addClass('dong');
  });
});
