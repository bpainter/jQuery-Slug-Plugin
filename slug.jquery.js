//
//	jQuery Slug Plugin was heavily inspired by Perry Trinier (perrytrinier@gmail.com)
//  He licensed under the GPL: http://www.gnu.org/copyleft/gpl.html which is a crappy
//  license since it only allows distribution and no modification. He's more than
//  welcome to update his with my changes. I'm easy.
//
//  Bermon Painter - http://bermonpainter.com
//  I've made a number of changes to fix some bugs and added a few features so
//  it's a useful plugin.
//  
//  Step 1 - Link jQuery and the plugin
//  <script type="text/javascript" src="jquery.js"></script> 
//  <script type="text/javascript" src="jquery.slug.js"></script>
//  
//  Step 2 - Initialize the plugin
//  <script type="text/javascript"> 
//    $(document).ready(function(){ 
//      $("#title").slug(); 
//    }); 
//  </script>
//  
//  Step 3 - The HTML
//  You just have to add a class on the input so the script knows where it is. Default class is 'slug'.
//  The HTML should look like this:
//  <label for="title">Title:</label> 
//  <input name="title" id="title" /> 
//  <label for="slug">Slug:</label> 
//  <input name="slug" id="slug" class="slug" />
// 
//  The options
//  You can set 3 options, slug name, if the slug input is hidden and if it's not hidden is can you customize it
//  $("#title").slug({ 
//      slug:'permalink',   // class of input / span that contains the generated slug 
//      hide: false,        // hide the text input, true by default
//      customizable: false // creates a link that shows the hidden input so you can customize the slug to something other than the title
//  });

jQuery(function($) {
  jQuery.fn.slug = function(options) {
  	var settings = {
  		slug: 'slug',
  		hide: true,
  		customizable: true
  	};
	
  	if(options) {
  		jQuery.extend(settings, options);
  	}
	
  	$this = jQuery(this);

  	jQuery(document).ready( function() {
  		if (settings.hide) {
  			jQuery('input.' + settings.slug).after("<span id=\"custom-slug\">\/ <span class="+settings.slug+"></span><a href=\"#edit-slug\" id=\"edit-slug\">Customize</a></span>");
  			jQuery('input.' + settings.slug).hide();
  		}
  	});
	
  	makeSlug = function() {
			var slugcontent = $this.val().trim();
			var slugcontent_hyphens = slugcontent.replace(/\s/g,'-');
			var finishedslug = slugcontent_hyphens.replace(/[^a-zA-Z0-9\-]/g,'').trim();
			finishedslug = finishedslug.replace(/[-]{2,}/g,'-');
      finishedslug = finishedslug.replace(/(^[-])|([-]$)/g,'');
			jQuery('input.' + settings.slug).val(finishedslug.toLowerCase());
			jQuery('span.' + settings.slug).text(finishedslug.toLowerCase());
  	}
		
	  jQuery(this).keyup(makeSlug);
		
		if(settings.customizable) {
    	jQuery('#custom-slug').click(function(){
    	  jQuery(this).hide();
    	  jQuery('input.' + settings.slug).fadeIn('fast');
    	  return false;
    	});
		} else {
		  jQuery('#edit-slug').remove();
		}

  	if(jQuery('input' + settings.slug).val() != ''){
  	  var slugValue = jQuery('input.' + settings.slug).val();
  	  jQuery('span.' + settings.slug).text(slugValue);
  	}
  	
  	return $this;  	
  };
})
