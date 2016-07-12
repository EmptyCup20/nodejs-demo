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
		$('#captcha').append('<img src="/getCaptcha?_'+ (new Date()).getTime() +'" />')
		// $.ajax({
		// 	url:'/getCaptcha',
		// 	type:'post',
		// 	success:function(data){
		// 		console.log(data);
		// 	}
		// })
	});
});
