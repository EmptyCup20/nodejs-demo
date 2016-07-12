jQuery(document).ready(function($) {
	$('#login').click(function(event) {
		/* Act on the event */
		$.ajax({
				url: '/verfiy',
				type: 'GET',
				data: {
					"captcha": $('.captcha').val()
				},
			})
			.done(function(data) {
				if (data) {
					alert('captcha right!');
				} else {
					alert('captcha wrong!');
				}
			})
	});
	$('#captcha').on('click','img',function(event) {
		$('#captcha img').remove();
		//直接返回的是二进制的图片流
		$('#captcha').append('<img src="/getCaptcha?_'+ (new Date()).getTime() +'" />')
	});
});
