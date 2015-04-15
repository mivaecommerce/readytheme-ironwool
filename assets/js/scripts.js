var cornerstoneUX = {
	init: function () {
		String.prototype.toCamelCase = function(cap1st) {
			return ((cap1st ? '-' : '') + this).replace(/-+([^-])/g, function(a, b) {
				return b.toUpperCase();
			});
		};
        var pageID = document.body.id.toCamelCase();
		
		if (cornerstoneUX[pageID]) {
			// ---- If the function exists, run it, otherwise, don't do anything. ---- //
			(function ($) {
				cornerstoneUX[pageID]();
			}(jQuery));
		};
		
		(function ($) {
			// ---- Create the "main" element for older versions of IE ---- //
			document.createElement('main');
			
			// ---- Allow Named Anchors With A Class Of "smoothscroll" To Work Without Full URL ---- //
			$('a[href^="\#"].smoothscroll').on('click', function (e) {
				e.preventDefault();
				var target = this.href.substr(this.href.indexOf('#')),
					target = $(target);
					
				if (target.offset().top > windowHeight / 2) {
					var offset = $('#js-header').outerHeight();
				}
				else {
					var offset = 10;
				};
					
				scrollToDiv(target, offset);
			});
			
			// ---- Back to Top Controls ---- //
			function backToTop () {
				var chaser = $('#js-chaser')
					windowHeight = $(window).height();
				
				if (chaser) {
					$(window).scroll(function() {
						if ($(window).scrollTop() >= windowHeight / 2) {
							chaser.fadeIn();
						}
						else {
							chaser.hide();
						};
					});
					
					chaser.on('click', function () {
						$('html, body').animate({scrollTop: '0px'}, 800);
					});
				};
			};
			if ($(window).innerWidth() >= 768) {
				var backToTop = new backToTop;
			};
			
			// ---- On scroll, fix the header to the top ---- //
			if (document.location.protocol !== 'https:' && $(window).innerWidth() > 768) {
				$('#js-header').stuck();
			};
			
			// ---- Toggle global search display ---- //
			$('#js-open-global-search, #js-open-global-search--tablet').on('click', function (e) {
				e.preventDefault();
				$(this).toggleClass('bg-gray');
				$('#js-global-search').fadeToggle();
			});
		
			// ---- Mobile Footer Links Control ---- //
			function footerNavControl () {
				if ($(window).innerWidth() < 704) {
					if ($('#js-mobile-footer-links ul').length == 0) {
						$('#js-mobile-footer-links').append($('#js-footer-links').find('ul'));
					};
				}
				else {
					if ($('#js-footer-links ul').length == 0) {
						$('#js-footer-links').append($('#js-mobile-footer-links').find('ul'));
					};
				};
				/* Corrects positioning of virtual keyboard */
				$(document).on('focus', 'input, select, textarea', function () {
					$('#mobile-footer').css('position', 'static');
				});
				$(document).on('blur', 'input, select, textarea', function () {
					$('#mobile-footer').css('position', 'fixed');
				});
			};
			$(window).on('debouncedresize load', footerNavControl ());
			
		}(jQuery));
	},
	
	sharedFunctions: {
		// ---- Product Carousels ---- //
		productsCarousels: function (carousel, append) {
			var carousel = $(carousel);
			if (append === true) {
				var appendArrowsTo = $(carousel.selector).parent();
			}
			else if (append === 'undefined') {
				var appendArrowsTo = $(carousel.selector);
			};
			
			$.ajax({
				cache: true,
				crossDomain: true,
				dataType: 'script',
				url: '../js/jquery.slick.min.js'
			}).done(function () {
				function equalImageWraps() {
					var currentHeight = 0,
						rowDivs = new Array();
					
					carousel.find('.flag').each(function() {
						$(this).height('auto');
						rowDivs.push($(this));
						currentHeight = (currentHeight < $(this).height()) ? ($(this).height()) : (currentHeight);
						for (currentDiv = 0 ; currentDiv < rowDivs.length ; currentDiv++) {
							rowDivs[currentDiv].height(currentHeight);
						};
					});
				};
				equalImageWraps();
				carousel.slick({
					appendArrows: appendArrowsTo,
					draggable: false,
					slidesToScroll: 4,
					slidesToShow: 4,
					responsive: [
						{
							breakpoint: 1040,
							settings: {
								slidesToScroll: 3,
								slidesToShow: 3
							}
						},
						{
							breakpoint: 800,
							settings: {
								slidesToScroll: 2,
								slidesToShow: 2
							}
						},
						{
							breakpoint: 512,
							settings: {
								slidesToScroll: 1,
								slidesToShow: 1
							}
						}
					]
				});
			});
		},
		
		// ---- Toggle Details ---- //
		toggleCustomerFields: function () {
			var ToggleDetails={primary_fields:null,secondary_fields:null,primary_tag:"",secondary_tag:"",trigger:null,controls:null,primary_inputs:[],primary_selects:[],secondary_inputs:[],secondary_selects:[],init:function(){var a=this;this.primary_fields=document.getElementById("js-shipping-fields");this.secondary_fields=document.getElementById("js-billing-fields");this.trigger=document.getElementById("js-billing-to-show");this.controls=document.getElementById("js-billing-controls");this.primary_tag="Ship"; this.secondary_tag="Bill";this.primary_inputs=this.primary_fields.getElementsByTagName("input");this.primary_selects=this.primary_fields.getElementsByTagName("select");this.secondary_inputs=this.secondary_fields.getElementsByTagName("input");this.secondary_selects=this.secondary_fields.getElementsByTagName("select");this.addEvent(this.trigger,"click",function(){a.go()});this.controls.style.visibility="visible";this.trigger.checked&&(this.addEvent(this.trigger.form,"submit",ToggleDetails.copyFields), this.secondary_fields.style.visibility="hidden",this.secondary_fields.style.display="none")},go:function(){this.trigger.checked?(this.addEvent(this.trigger.form,"submit",ToggleDetails.copyFields),this.secondary_fields.style.visibility="hidden",this.secondary_fields.style.display="none"):(this.removeEvent(this.trigger.form,"submit",ToggleDetails.copyFields),this.secondary_fields.style.visibility="visible",this.secondary_fields.style.display="block")},copyFields:function(){var a={},c={},b;for(i=0;i< ToggleDetails.primary_inputs.length;i+=1)b=ToggleDetails.primary_inputs[i].name.replace(ToggleDetails.primary_tag,ToggleDetails.secondary_tag),a[b]={},a[b].value=ToggleDetails.primary_inputs[i].value,ToggleDetails.primary_inputs[i].checked&&(a[b].checked=!0);for(i=0;i<ToggleDetails.primary_selects.length;i+=1)b=ToggleDetails.primary_selects[i].name.replace(ToggleDetails.primary_tag,ToggleDetails.secondary_tag),c[b]={},c[b].selectedIndex=ToggleDetails.primary_selects[i].selectedIndex;for(member in a)ToggleDetails.trigger.form[member]&& (ToggleDetails.trigger.form[member].value=a[member].value,ToggleDetails.trigger.form[member].checked=a[member].checked);for(member in c)ToggleDetails.trigger.form[member].selectedIndex=c[member].selectedIndex},addEvent:function(a,c,b){return a.addEventListener?(a.addEventListener(c,b,!1),!0):a.attachEvent?a.attachEvent("on"+c,b):!1},removeEvent:function(a,c,b){a.removeEventListener?a.removeEventListener(c,b,!1):a.detachEvent&&a.detachEvent("on"+c,b)}};ToggleDetails.init();	
		},
		
		// ---- Cart Summary Controls ---- //
		cartSummary: function () {
			var marker = $('#js-toggle-cart-summary-contents').find('span'),
				clickCount = 0;

			$('#js-toggle-cart-summary-contents').on('click', function (e) {
				e.preventDefault();
				if (clickCount) {
					marker.html('&#9660;');
					clickCount = 0;
					$('#js-cart-summary-contents').slideDown();
				}
				else {
					clickCount = 1;
					marker.html('&#9658;');
					$('#js-cart-summary-contents').slideUp();
				};
			});
			if ($(window).innerWidth() < 768) {
				$('#js-toggle-cart-summary-contents').click();
			};		
		},
		
		// ---- Open Forgot Password ---- //
		openForgotPassword: function (pageID) {
			$('#js-open-forgot-password').magnificPopup({
				callbacks: {
					open: function () {
						if (pageID == 'jsOCST') {
							magnificPopup.close();
						};
					}
				},
				focus: '#l-Customer_LoginEmail',
				items: {
					src: $('#js-forgot-password'),
					type: 'inline'
				}
			});
		},
		
		// ---- Conform all subcategory and/or product DIVs to same height ---- // 
		conformDisplay: function (targetElement) {
			var targetElement = targetElement || '.category-product';
			
			$(window).on('load', function () {
				$(targetElement).conformity({mode: 'height'});
			});
			$(window).on('resize', function () {
				$(targetElement).conformity({mode: 'height'});
			});
		},

		// ---- Open Product Image Gallery ---- //
		productGallery: function (trigger) {
			trigger.on('click', function (e) {
				var startAt = Number($(this).attr('data-index'));
				
				e.preventDefault();
				if (gallery.length > 0) {
					$.magnificPopup.open({
						callbacks: {
							open: function () {
								$.magnificPopup.instance.goTo(startAt);
							}
						},
						gallery: {
							enabled: true
						},
						items: gallery,
						type: 'image'
					});
				}
				else {
					$.magnificPopup.open({
						items: {
							src: $('#js-main-image').attr('data-image')
						},
						type: 'image'
					});
				};
			});
		},
		
		// ---- Quick View Function ---- //
		openQuickView: function () {
			$('.quick-view').on('click', function (e){
				var productLink = $(this).data('product-link');
				
				e.preventDefault();
				$.magnificPopup.open({
					items: {
						src: productLink
					},
					type: 'iframe'
				});
			});
		}
		
	},
	
	jsSFNT: function () {
		// ---- Product Carousel ---- //
		cornerstoneUX.sharedFunctions.productsCarousels('#js-whats-popular-carousel');
	},
	
	jsCTGY: function () {
		// ---- Conform all subcategory and/or product DIVs to same height ---- //
		cornerstoneUX.sharedFunctions.conformDisplay();
		cornerstoneUX.sharedFunctions.conformDisplay('.sub-category');
		
		// ---- Open Quick View ---- //
		cornerstoneUX.sharedFunctions.openQuickView();
	},
	
	jsPROD: function () {
		// ---- Open Product Image Gallery ---- //
		cornerstoneUX.sharedFunctions.productGallery($('#js-main-image-zoom'));
		
		var mainImageZoom = $('#js-main-image-zoom'),
			thumbnails = $('#js-thumbnails');
			
		//console.log(window['image_data' + productID][0]['image_data'][2]);
		thumbnails.on('click', 'div', function () {
			var thumbnailIndex = $(this).attr('data-index');
			mainImageZoom.attr('data-index', thumbnailIndex);
		});

		$.ajax({
			cache: true,
			crossDomain: true,
			dataType: 'script',
			url: '../js/jquery.slick.min.js'
		}).done(function () {
			$('#js-thumbnails').slick({
				draggable: false,
				slide: 'img',
				slidesToScroll: 4,
				slidesToShow: 4,
				responsive: [
					{
						breakpoint: 1040,
						settings: {
							slidesToScroll: 3,
							slidesToShow: 3
						}
					},
					{
						breakpoint: 608,
						settings: {
							slidesToScroll: 2,
							slidesToShow: 2
						}
					}
				]
			});
		});

		// ---- Update Button For "Out Of Stock" ---- //
		function outOfStock () {
			var button = $('#js-add-to-cart');
				
			if (button.is(':disabled') == true) {
				button.addClass('bg-gray').val('Sold Out');
			}
			else {
				button.removeClass('bg-gray').val('Add to Cart');
			};
		};
		outOfStock ();
		
		// ---- Set Initial Swatch Name ---- //
		$('#js-swatch-name').text($('#js-swatch-select').find('option:first-child').text());

		// ---- Add Border to Active Swatch ---- //
		function selectedSwatch () {
			$('#js-swatches').find('li').each(function () {
				var swatchElement = $(this),
					swatchColor = swatchElement.attr('data-code');
					
				swatchElement.removeClass('selected-swatch');
				if (swatchColor === $('#js-swatch-select').find('option:selected').val() ) {
					swatchColor = swatchColor.replace(/ /g,'');
					swatchColor = swatchColor.toLowerCase();

					var namedColors = {
						aliceblue: 'f0f8ff',
						antiquewhite: 'faebd7',
						aqua: '00ffff',
						aquamarine: '7fffd4',
						azure: 'f0ffff',
						beige: 'f5f5dc',
						bisque: 'ffe4c4',
						black: '000000',
						blanchedalmond: 'ffebcd',
						blue: '0000ff',
						blueviolet: '8a2be2',
						brown: 'a52a2a',
						burlywood: 'deb887',
						cadetblue: '5f9ea0',
						chartreuse: '7fff00',
						chocolate: 'd2691e',
						coral: 'ff7f50',
						cornflowerblue: '6495ed',
						cornsilk: 'fff8dc',
						crimson: 'dc143c',
						cyan: '00ffff',
						darkblue: '00008b',
						darkcyan: '008b8b',
						darkgoldenrod: 'b8860b',
						darkgray: 'a9a9a9',
						darkgreen: '006400',
						darkkhaki: 'bdb76b',
						darkmagenta: '8b008b',
						darkolivegreen: '556b2f',
						darkorange: 'ff8c00',
						darkorchid: '9932cc',
						darkred: '8b0000',
						darksalmon: 'e9967a',
						darkseagreen: '8fbc8f',
						darkslateblue: '483d8b',
						darkslategray: '2f4f4f',
						darkturquoise: '00ced1',
						darkviolet: '9400d3',
						deeppink: 'ff1493',
						deepskyblue: '00bfff',
						dimgray: '696969',
						dodgerblue: '1e90ff',
						feldspar: 'd19275',
						firebrick: 'b22222',
						floralwhite: 'fffaf0',
						forestgreen: '228b22',
						fuchsia: 'ff00ff',
						gainsboro: 'dcdcdc',
						ghostwhite: 'f8f8ff',
						gold: 'ffd700',
						goldenrod: 'daa520',
						gray: '808080',
						green: '008000',
						greenyellow: 'adff2f',
						honeydew: 'f0fff0',
						hotpink: 'ff69b4',
						indianred : 'cd5c5c',
						indigo : '4b0082',
						ivory: 'fffff0',
						khaki: 'f0e68c',
						lavender: 'e6e6fa',
						lavenderblush: 'fff0f5',
						lawngreen: '7cfc00',
						lemonchiffon: 'fffacd',
						lightblue: 'add8e6',
						lightcoral: 'f08080',
						lightcyan: 'e0ffff',
						lightgoldenrodyellow: 'fafad2',
						lightgrey: 'd3d3d3',
						lightgreen: '90ee90',
						lightpink: 'ffb6c1',
						lightsalmon: 'ffa07a',
						lightseagreen: '20b2aa',
						lightskyblue: '87cefa',
						lightslateblue: '8470ff',
						lightslategray: '778899',
						lightsteelblue: 'b0c4de',
						lightyellow: 'ffffe0',
						lime: '00ff00',
						limegreen: '32cd32',
						linen: 'faf0e6',
						magenta: 'ff00ff',
						maroon: '800000',
						mediumaquamarine: '66cdaa',
						mediumblue: '0000cd',
						mediumorchid: 'ba55d3',
						mediumpurple: '9370d8',
						mediumseagreen: '3cb371',
						mediumslateblue: '7b68ee',
						mediumspringgreen: '00fa9a',
						mediumturquoise: '48d1cc',
						mediumvioletred: 'c71585',
						midnightblue: '191970',
						mintcream: 'f5fffa',
						mistyrose: 'ffe4e1',
						moccasin: 'ffe4b5',
						navajowhite: 'ffdead',
						navy: '000080',
						oldlace: 'fdf5e6',
						olive: '808000',
						olivedrab: '6b8e23',
						orange: 'ffa500',
						orangered: 'ff4500',
						orchid: 'da70d6',
						palegoldenrod: 'eee8aa',
						palegreen: '98fb98',
						paleturquoise: 'afeeee',
						palevioletred: 'd87093',
						papayawhip: 'ffefd5',
						peachpuff: 'ffdab9',
						peru: 'cd853f',
						pink: 'ffc0cb',
						plum: 'dda0dd',
						powderblue: 'b0e0e6',
						purple: '800080',
						red: 'ff0000',
						rosybrown: 'bc8f8f',
						royalblue: '4169e1',
						saddlebrown: '8b4513',
						salmon: 'fa8072',
						sandybrown: 'f4a460',
						seagreen: '2e8b57',
						seashell: 'fff5ee',
						sienna: 'a0522d',
						silver: 'c0c0c0',
						skyblue: '87ceeb',
						slateblue: '6a5acd',
						slategray: '708090',
						snow: 'fffafa',
						springgreen: '00ff7f',
						steelblue: '4682b4',
						tan: 'd2b48c',
						teal: '008080',
						thistle: 'd8bfd8',
						tomato: 'ff6347',
						turquoise: '40e0d0',
						violet: 'ee82ee',
						violetred: 'd02090',
						wheat: 'f5deb3',
						white: 'ffffff',
						whitesmoke: 'f5f5f5',
						yellow: 'ffff00',
						yellowgreen: '9acd32'
					};
					for (var key in namedColors) {
						if (swatchColor == key) {
							swatchElement.css('border-color', '#' + namedColors[key]);
						}
						else {
							swatchElement.addClass('selected-swatch');
						};
					};
				};
			});
		};
		selectedSwatch ();

		// ---- Update Display When Attribute Machine Fires ---- //
		MivaEvents.SubscribeToEvent('variant_changed', function () {
			gallery.length = 0;
			mainImageZoom.attr('data-index', 0);
			//$('#js-main-image').attr('data-image', window['image_data' + productID][0]['image_data'][2]);
			thumbnailIndex = 0;
			outOfStock ();
			selectedSwatch ();
		});

		// ---- Update Display Price Based on Attribute Selections (If Attribute Machine Is Not Being Used) ---- //
		if (typeof attrMachCall === 'undefined' && document.getElementById('js-product-attribute-count').value > 0) {
			for(var baseProductPrice=Number(document.getElementById("js-price-value").getAttribute("data-base-price")),regularProductPrice=Number(),productAttributeCount=Number(document.getElementById("js-product-attribute-count").value+1),productAttributes=document.getElementById("js-purchase-product").elements,attributeType=[""],i=0;i<productAttributes.length;i++){var tagName=productAttributes[i].tagName.toLowerCase(),elementType=productAttributes[i].type,type=productAttributes[i].getAttribute("data-attribute-type"), name=productAttributes[i].name;"hidden"==elementType&&null!=type&&attributeType.push(type);productAttributes[i].onchange=function(){updateProductDisplayPrice()}} function updateProductDisplayPrice(){for(var b,a,c=baseProductPrice,f=regularProductPrice,d=1;d<productAttributeCount;d++)if(b=document.getElementsByName("Product_Attributes["+d+"]:value"),"select"==attributeType[d])for(var e=0;e<b.length;e++)a=b.item(e),a=a.options.item(a.selectedIndex),c+=Number(a.getAttribute("data-option-price")),f+=Number(a.getAttribute("data-regular-price"));else if("radio"==attributeType[d]||"checkbox"==attributeType[d])for(e=0;e<b.length;e++)a=b.item(e),a.checked&&(c+=Number(a.getAttribute("data-option-price")), f+=Number(a.getAttribute("data-regular-price")));else if("text"==attributeType[d]||"memo"==attributeType[d])a=b.item(0),a.value&&(c+=Number(a.getAttribute("data-option-price")),f+=Number(a.getAttribute("data-regular-price")));b=document.getElementsByName("Quantity");c*=Number(b.item(0).value);b.item(0);document.getElementById("js-price-value").innerHTML=formatCurrency(c);document.getElementById("js-mobile-price-value")&&(document.getElementById("js-mobile-price-value").innerHTML=formatCurrency(c))} function formatCurrency(b){var a=!1;0>b&&(a=!0,b=Math.abs(b));return(a?"-$":"$")+parseFloat(b,10).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,"$1,").toString()}updateProductDisplayPrice();
		};

		// ---- Quantity Incrementer ---- //
		$('#js-increase-quantity').on('click', function () {
			var $qty = $(this).siblings('input'),
				currentVal = parseInt($qty.val());
				
			if (!isNaN(currentVal)) {
				$qty.val(currentVal + 1).change();
			};
		});
		$('#js-decrease-quantity').on('click', function () {
			var $qty = $(this).siblings('input'),
				currentVal = parseInt($qty.val());
				
			if (!isNaN(currentVal) && currentVal > 1) {
				$qty.val(currentVal - 1).change();
			};
		});

		// ---- AJAX Add To Cart ---- //
		function addToCart () {
			$('#js-add-to-cart').on('click', function (e) {
				var purchaseForm = $('#js-purchase-product');
				// Check the form is not currently submitting
				if (purchaseForm.data('formstatus') !== 'submitting') {
					// Set up variables
					var form = purchaseForm,
						formData = form.serialize(),
						randomNo = Math.ceil(Math.random() * 1000000), // IE Hack: Creating random number to refresh ajax call
						formUrl = form.attr('action') + '&v=' + randomNo,
						formMethod = form.attr('method'),
						responseMessage = $('#js-purchase-message'),
						miniBasket = $('#js-mini-basket-container'),
						processingImage = $('#js-processing-purchase'),
						purchaseButton = $(this);
					
					// Add status data to form
					form.data('formstatus', 'submitting');
					
					// Show processing message
					processingImage.show();
					purchaseButton.toggleDisabled().val('Processing...');
					responseMessage.html('').hide();
					
					// Send data to server for validation
					$.ajax({
						url: formUrl,
						type: formMethod,
						data: formData,
						success: function(data, textStatus, jqXHR) {
							if (data.search(/id="js-BASK"/i) != -1) {
								$('html, body').animate({scrollTop: '0px'}, 250);
								var responseMiniBasket = $(data).find('#js-mini-basket-container'),
									miniBasketCount = responseMiniBasket.contents()[1].getAttribute('data-itemcount'),
									miniBasketSubtotal = ' ' + responseMiniBasket.contents()[1].getAttribute('data-subtotal'),
									miniBasketLinkCount = $('#js-mini-basket-count, #js-mobile-basket-button .notification'),
									miniBasketLinkSubtotal = $('#js-mini-basket-subtotal');
								
								miniBasketLinkCount.text(miniBasketCount); // Update basket quantity (display only)
								miniBasketLinkSubtotal.text(miniBasketSubtotal); // Update basket subtotal (display only)
								
								miniBasket.html(responseMiniBasket.contents()).addClass('open');
								setTimeout(function () {
									miniBasket.removeClass('open');
								}, 5000);

								// Re-Initialize Attribute Machine (if it is active)
								if (typeof attrMachCall !== 'undefined') {
									attrMachCall.Initialize();
								};
							}
							else if(data.search(/id="js-PATR"/i) != -1) {
								var missingAttrs = [];
								form.find('.required').each(function () {
									missingAttrs.push(' ' + $(this).attr('title'));
								});
								responseMessage.html('All <em class="red">Required</em> options have not been selected.<br />Please review the following options: <span class="red">' + missingAttrs + '</span>.').fadeIn().delay(5000).fadeOut();
							}
							else if(data.search(/id="js-PLMT"/i) != -1) {
								responseMessage.html('We do not have enough of the Size/Color you have selected.<br />Please adjust your quantity.').fadeIn().delay(3000).fadeOut();
							}
							else if(data.search(/id="js-POUT"/i) != -1) {
								responseMessage.html('The Size/Color you have selected is out of stock.<br />Please review your options or check back later.').fadeIn().delay(3000).fadeOut(); 
							}
							else {
								responseMessage.html('Please review options.').fadeIn().delay(3000).fadeOut();
							};
							
							// Hide processing message and reset formstatus
							processingImage.hide();
							purchaseButton.toggleDisabled().val('Add to Cart');
							form.data('formstatus', 'idle');
						},
						error: function (jqXHR, textStatus, errorThrown) {
						}
					});
				};
				// Prevent form from submitting
				e.preventDefault();
			});
		};
		var addToCart = new addToCart;

		// ---- Related Products Carousel ---- //
		$.ajax({
			cache: true,
			crossDomain: true,
			dataType: 'script',
			url: '../js/jquery.slick.min.js'
		}).done(function () {
			$('#js-related-products-carousel').slick({
				appendArrows: $('#js-related-products-carousel').prev('.h3'),
				draggable: false,
				slidesToScroll: 2,
				slidesToShow: 2,
					responsive: [
						{
							breakpoint: 608,
							settings: {
								appendArrows: $('#js-related-products-carousel'),
								slidesToScroll: 1,
								slidesToShow: 1
							}
						}
					]
			});
		});
		
	},
	
	jsPLST: function () {
		// ---- Conform all subcategory and/or product DIVs to same height ---- //
		cornerstoneUX.sharedFunctions.conformDisplay();
		
		// ---- Open Quick View ---- //
		cornerstoneUX.sharedFunctions.openQuickView();
	},
	
	jsSRCH: function () {
		// ---- Conform all subcategory and/or product DIVs to same height ---- //
		cornerstoneUX.sharedFunctions.conformDisplay();
		
		// ---- Open Quick View ---- //
		cornerstoneUX.sharedFunctions.openQuickView();
	},
	
	jsBASK: function () {
		// ---- Remove Item From Basket (Compatible down to IE6) ---- //
		$('.remove-item').on('click', function () {
			$(this).children('input').prop('checked', 'checked');
			if ($(this).children('input').is(':checked')) {
				$('#js-bask-form').submit();
			}
		});
		
		// ---- Estimate Shipping Function ---- //
		function estimateShipping () {
			function resetFields () {
				$('#js-shipping-estimate-state-select').prop('selectedIndex', 0);
				$('#js-shipping-estimate-country').val('US');
				$('#js-shipping-estimate-state, #js-shipping-estimate-zip').val('');
			};
			
			$('#js-show-shipping-estimate').on('click', function (e) {
				e.preventDefault();
				$('#js-shipping-estimate-dialog').fadeToggle();
				resetFields ();
			});

			$('#js-shipping-estimate-recalculate').on('click', function (e) {
				e.preventDefault()
				$(this).hide();
				$('#js-shipping-estimate-results').fadeOut(function () {
					$('#js-shipping-estimate-fields').fadeIn();
				}).empty();
			});

			$('#js-shipping-estimate-form').on('submit', function (e) {
				e.preventDefault()
				if ($(this).data('formstatus') !== 'submitting') {

					var form = $(this),
						formData = form.serialize(),
						formUrl = form.attr('action'),
						formMethod = form.attr('method')
					
					form.data('formstatus', 'submitting');
					$('#js-processing-request').show();
					$.ajax({
						url: formUrl,
						type: formMethod,
						data: formData,
						success: function(data, textStatus, jqXHR) {
							$('#js-shipping-estimate-fields').fadeOut(function () {
								$('#js-shipping-estimate-results').html(data).fadeIn();
								$('#js-shipping-estimate-recalculate').fadeIn();
							});
							resetFields ();
							form.data('formstatus', 'idle');
							$('#js-processing-request').hide();
						},
						error: function (jqXHR, textStatus, errorThrown) {
							console.log(errorThrown);
							form.data('formstatus', 'idle');
						}
					});
				};
			});
		};
		var estimateShipping = new estimateShipping;
	
	},
	
	jsACAD: function () {
		// ---- Copy Email Address to Shipping or Billing Email ---- //
		$('#js-Customer_LoginEmail').on('blur', function () {
			var primaryAddress = $(this).attr('data-primary'),
				shippingEmail = $('#js-Customer_ShipEmail'),
				billingEmail = $('#js-Customer_BillEmail');
			
			if (primaryAddress == 'shipping') {
				if (shippingEmail && (shippingEmail.val() == '')) {
					shippingEmail.val($(this).val());
				};
			}
			else if (primaryAddress == 'billing') {
				if (billingEmail && (billingEmail.val() == '')) {
					billingEmail.val($(this).val());
				};
			};
		});
		
		// ---- Toggle Customer Fields Controls ---- //
		cornerstoneUX.sharedFunctions.toggleCustomerFields();
	},
	
	jsACED: function () {
		// ---- Toggle Customer Fields Controls ---- //
		cornerstoneUX.sharedFunctions.toggleCustomerFields();
	},
	
	jsCTUS: function () {
		// ---- Additional Server Security To Help Against Spambots ---- //
		$.ajax({
			cache: true,
			crossDomain: true,
			dataType: 'script',
			url: '//ajax.aspnetcdn.com/ajax/jquery.validate/1.13.0/jquery.validate.min.js'
		}).done(function () {
			var contactForm = $('#js-contact-form');
			$('#js-noscript-warning').remove();
			contactForm.show();
			$.get('../forms/token.php', function (tkn) {
				contactForm.append('<input type="hidden" name="mms" value="' + tkn + '" />');
			});
			
			// ---- Form Validation ---- //
			contactForm.validate({
				errorContainer: '#js-contact-form div.message',
				errorLabelContainer: '#js-contact-form div.message small',
				errorElement: 'p',
				rules: {
					contactName: {required: true, minlength: 2},
					contactEmail: {required: true, email: true},
					contactComment: {required: true, minlength: 2}
				},
				messages: {
					contactName: {required: 'Your Name Is Required', minlength: jQuery.validator.format('Your Name must be a minimum of {0} characters!')},
					contactEmail: {required: 'Your Email Address Is Required', email: 'Your Email Address must be formatted like name@domain.com'},
					contactComment: {required: 'Comments or Questions Are Required', minlength: jQuery.validator.format('Your Message must be a minimum of {0} characters!')}
				},
				highlight: function (element, errorClass) {
					$(element.form).find('label[for=' + element.id + ']').addClass(errorClass);
				},
				unhighlight: function (element, errorClass) {
					$(element.form).find('label[for=' + element.id + ']').removeClass(errorClass);
				},
				submitHandler: function (form) {
					if ($(this).data('formstatus') !== 'submitting') {
						var form = contactForm,
							formData = form.serialize(),
							formUrl = form.attr('action'),
							formMethod = form.attr('method')
						
						form.data('formstatus', 'submitting');
						$.ajax({
							url: formUrl,
							type: formMethod,
							data: formData,
							success: function(data, textStatus, jqXHR) {
								// Show reponse message
								if (data.search(/error/i) != -1) {
									$('#js-contact-form div.message').fadeOut(200, function () {
										$(this).removeClass('message-info').addClass('message-error').text(data).fadeIn(200);
									});
								}
								else {
									$('#js-contact-form div.message').removeClass('message-error').addClass('message-success').text(data).fadeIn(200);
								};
								form.data('formstatus', 'idle');
							},
							error: function (jqXHR, textStatus, errorThrown) {
								console.log(errorThrown);
								form.data('formstatus', 'idle');
							}
						});
					};
				}
			});
		});
	},
	
	jsAFCL: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	},
	
	jsLOGN: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	},
	
	jsORDL: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	},
	
	jsORHL: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	},
	
	jsOCST: function () {
		// ---- Open Log-In Form ---- //
		$('#js-open-ocst-login').magnificPopup({
			focus: '#l-Customer_LoginEmail',
			items: {
				src: $('#js-ocst-login'),
				type: 'inline'
			}
		});

		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword('jsOCST');

		// ---- Cart Summary Controls ---- //
		cornerstoneUX.sharedFunctions.cartSummary();

		// ---- Toggle Customer Fields Controls ---- //
		cornerstoneUX.sharedFunctions.toggleCustomerFields();
		if ($(window).innerWidth() < 768) {
			$('#js-billing-to-show').click();
		};		

	},
	
	jsOSEL: function () {
		// ---- Cart Summary Controls ---- //
		cornerstoneUX.sharedFunctions.cartSummary();
	},
	
	jsOPAY: function () {
		// ---- Cart Summary Controls ---- //
		cornerstoneUX.sharedFunctions.cartSummary();
		
		// ---- Make Credit Card Expiration Fields More User-Friendly ---- //
		$('#js-cc_exp select').first().find('option:first').text('Month');
		$('#js-cc_exp select').last().find('option:first').text('Year');

		// ---- CVV Information Function ---- //
		$('#js-open-cvv-information').magnificPopup({
			items: {
				src: $('#js-cvv-information'),
				type: 'inline'
			}
		});

		// ---- Secondary Form Submit Button ---- //
		$('#js-opay-form-submit').on('click', function () {
			$('#js-opay-form').submit();
		});
	},
	
	jsINVC: function () {
	},
	
	jsORDP: function () {
		// ---- Launch Printer Dialog ---- //
		window.print();
	},
	
	jsSMAP: function () {
		// ---- Conform all site map DIVs to same height ---- //
		cornerstoneUX.sharedFunctions.conformDisplay('.site-map');
	},
	
	jsGFTL: function () {
		// ---- Open Forgot Password ---- //
		cornerstoneUX.sharedFunctions.openForgotPassword();
	}
};
cornerstoneUX.init();