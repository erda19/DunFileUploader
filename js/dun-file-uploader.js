(function ($) {
	
$.fn.dunFileUploader = function(options)
	{
		
		var settings = $.extend({ fileUrl: ""}, options );
		return this.each(function() {
			//Checkif already define
			if($(this).html() != "")
			{
				return;
			}
			var element = "<div class=\"input-group image-preview\"> " +
							" <input type=\"text\" class=\"form-control image-preview-filename\" disabled=\"disabled\"> " + 
								" <span class=\"input-group-btn\"> " +
									" <button type=\"button\" class=\"btn btn-default image-preview-clear\" style=\"display:none;\"> "+
										" <span class=\"glyphicon glyphicon-remove\"></span> clear" +
									" </button> " +
									" <div class=\"btn btn-default image-preview-input\"> " +
										"<span class=\"glyphicon glyphicon-folder-open\"></span>"+
										"<span class=\"image-preview-input-title\">browse</span>"+
										"<input type=\"file\" accept=\"image/png, image/jpeg, image/gif\" name=\"input-file-preview\" class=\"fInputFile\"/> "+
									"</div>"+
								"</span>"+
							"</div>";
			var self = $(this);
			self.append(element);
			
			var idCloseBtn = "close-btn"+  Math.floor(Math.random() * 9999999);
			
			var closebtn = $('<button/>', {
					type:"button",
					text: 'x',
					id: idCloseBtn,
					style: 'font-size: initial;'
			});
			closebtn.attr("class","close pull-right close-btn");
			
			self.find('.image-preview').popover({
				trigger:'manual',
				html:true,
				title: "<strong>Preview</strong>"+$(closebtn)[0].outerHTML,
				content: "There's no image",
				placement:'bottom'
			});
			
			//close btn
			$(document).on('click', '#'+idCloseBtn, function(){
				//alert('test12');
				self.find('.image-preview').popover('hide');
				// Hover befor close the preview
				self.find('.image-preview').hover(
					function () {
					   self.find('.image-preview').popover('show');
					}, 
					 function () {
					   self.find('.image-preview').popover('hide');
					}
				);    
			});
			
			 // Clear event
			self.find('.image-preview-clear').click(function(){
				self.find('.image-preview').attr("data-content","").popover('hide');
				self.find('.image-preview-filename').val("");
				self.find('.image-preview-clear').hide();
				self.find('.image-preview-input input:file').val("");
				self.find(".image-preview-input-title").text("Browse"); 
			}); 
			
			self.find(".fInputFile").change(function (){
				
				var img = $('<img/>', {
					width:250,
					height:200
				});      
				var file = this.files[0];
				var reader = new FileReader();
				// Set preview image into the popover data-content
				reader.onload = function (e) {
					self.find(".image-preview-input-title").text("Change");
					self.find(".image-preview-clear").show();
					self.find(".image-preview-filename").val(file.name);            
					img.attr('src', e.target.result);
					self.find(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
				}        
				reader.readAsDataURL(file);
			});
		});
	}
}(jQuery));

(function ( $ ) {
    $.fn.GetFileUrl = function() {
		if(this.find(".fInputFile").prop('files').length > 0)
		{
			//alert("tests");
			return "";
		}
		else
		{
			//alert("tests");
			if(this.find(".image-preview-filename") != undefined)
			{
				return this.find(".image-preview-filename").val();
			}
			else
			{
				return "";
			}
		}
    };
}( jQuery ));

(function ( $ ) {
    $.fn.SetImagePreview = function(url) {
		var img = $('<img/>', {
				width:250,
				height:200
			});      
			
		this.find(".image-preview-input-title").text("Change");
		this.find(".image-preview-clear").show();
		this.find(".image-preview-filename").val(url);            
		img.attr('src', url);
		this.find(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");
    };
}( jQuery ));


(function ( $ ) {
    $.fn.GetImageFile = function(url) {
		if(this.find(".fInputFile").prop('files').length > 0)
		{
			return this.find(".fInputFile").prop('files')[0];
		}
		else
		{
			return undefined;
		}
    };
}( jQuery ));
