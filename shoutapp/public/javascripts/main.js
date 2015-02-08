$(document).ready(function(){
	$('.deleteuser').on('click', deleteUser);
});

function deleteUser(){
	event.preventDefault();

	var confirmation = confirm('Are you sure that you want to delete this user?');

	if(confirmation){
		$.ajax({
			type: 'DELETE',
			url: '/user/'+ $('.deleteuser').data('user')
		}).done(function(response){
			window.location.replace('/users');
		});
	} else {
		return false;
	}
}