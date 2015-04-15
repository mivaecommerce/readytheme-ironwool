// Licensed under the MIT license.
// Copyright 2014 Luís Almeida
// https://github.com/luis-almeida/unveil

;(function($) {

	$.fn.unveil = function(opts) {

		opts = opts || {};

		var $w = $(window),
			$c = opts.container || $w,
			th = opts.threshold || 0,
			attribute = opts.attribute || 'src',
			wh = $w.height(),
			retina = isRetina(),
			attrib = retina ? 'data-' + attribute + '-retina' : 'data-' + attribute,
			images = this,
			loaded;

		this.one('unveil', function() {
			if (opts.custom) {
				return;
			};
			
			var $img = $(this),
				src = $img.attr(attrib),
				original = $img.attr('src');
				
			src = src || $img.attr('data-' + attribute);
			this.onerror = function (e) {
				this.src = original;
			};
			if (src) {
				$img.attr('src', src).trigger('unveiled');
			};
		});

		function isRetina() {
			var query = '(-webkit-min-device-pixel-ratio: 1.5), (min--moz-device-pixel-ratio: 1.5), (-o-min-device-pixel-ratio: 3/2), (min-device-pixel-ratio: 1.5), (min-resolution: 144dpi), (min-resolution: 1.5dppx)';
			
			if (window.devicePixelRatio > 1.25 || (window.matchMedia && window.matchMedia(query).matches)) {
				return true;
			};
			return false;
		};

		function unveil() {
			var inview = images.filter(function() {
				var $e = $(this);
				
				if ($e.is(':hidden')) {
					return;
				};
				
				var wt = $w.scrollTop(),
					wb = wt + wh,
					ct = $c !== $w ? wt - $c.offset().top : 0,
					et = $e.offset().top + ct,
					eb = et + $e.height();
				
				return eb >= wt - th && et <= wb + th;
			});
			
			loaded = inview.trigger('unveil');
			images = images.not(loaded);
		};

		function resize() {
			wh = $w.height();
			unveil();
		};

		function debounce(fn) {
			var timer;
			
			return function() {
				if (timer) {
					clearTimeout(timer);
				};
				timer = setTimeout(fn, opts.debounce || 0);
			};
		};

		$c.on({
			'resize.unveil': debounce(resize),
			'scroll.unveil': debounce(unveil),
			'lookup.unveil': unveil,
			'touchend.unveil': unveil
		});

		unveil();

		return this;

  };

})(window.jQuery);

