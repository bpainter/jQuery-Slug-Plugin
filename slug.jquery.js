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
