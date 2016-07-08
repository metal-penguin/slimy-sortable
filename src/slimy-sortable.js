(function( $ ){
  "use strict";

  $.fn.slimySortable = function( options ) {

    var self = $(this);
    var self_li = self.children("li");

    var settings = $.extend({
      axis: null,
      containment: null,
      opacity: 0.6,
      zIndex: 99999,
      revert: true,
      placeholder: "placeholder",
    }, options);

    self.disableSelection();

    var pos_list = [];
    self_li.each(function(i, ele) {
      pos_list[i] = $(ele).offset();
      $(ele).attr("data-slimy-id", i);
    });

    var getUniqid = function (myStrong){
      var strong = 1000;
      if (myStrong) strong = myStrong;
      return new Date().getTime().toString(16)  + Math.floor(strong*Math.random()).toString(16)
    }

    var uniq_class_name = "slimy-visible-ul-" + getUniqid();
    self.after("<ul class='"+uniq_class_name+" slimy-visible'></ul>");

    var visible_ul = $("ul."+uniq_class_name);
    visible_ul.offset(self.offset());
    self_li.clone(true).appendTo(visible_ul);
    self_li.addClass("slimy-background");
    self_li.children().addClass("slimy-background");
    visible_ul.children("li").each(function(i, ele){
        var pos = pos_list[parseInt($(ele).attr('data-slimy-id'))];
        $(this).offset(pos);
    });

    var refresh = function (ui, animation){
      var helper_id = (ui != null) ? $(ui.helper).attr("data-slimy-id") : -99999;
      var pos = [];
      self_li.each(function(i, ele){
        var id = parseInt($(this).attr("data-slimy-id"));
        pos[id] = $(this).offset();
      });

      visible_ul.children("li").each(function(i, ele){
        var item = $(ele);
        var id = item.attr("data-slimy-id");
        if(id == helper_id) return;

        var new_offset = pos[id];
        if(animation) {
          item.animate({
            top  : "+="+(new_offset.top  - item.offset().top),
            left : "+="+(new_offset.left - item.offset().left)
          },{
            duration:"fast",
            queue:false
          });
        } else {
          item.offset(new_offset);
        }
      });
    }

    var sortable_event = $.extend(settings, {
      activate: function(event, ui) {

        $(ui.item).find("*").removeClass("slimy-background");
        var data_slimy_id = $(ui.item).attr("data-slimy-id");
        var target_li = visible_ul.children("li[data-slimy-id="+data_slimy_id+"]");
        target_li.addClass("slimy-background");
      },
      stop: function(event, ui) {

        $(ui.item).find("*").addClass("slimy-background");
        var data_slimy_id = $(ui.item).attr("data-slimy-id");
        var target_li = visible_ul.children("li[data-slimy-id="+data_slimy_id+"]");
        target_li.removeClass("slimy-background");
        refresh(null, false);
      },
      change: function(event, ui){

        refresh(ui, true);
      },
    });
    self.sortable(sortable_event);

    return this;
  };

})( jQuery );
