var toggleBtn = document.getElementById('toggle-theme');
var toggleBtnIcon = document.querySelector('#toggle-theme > span > i');

function toggleMode(mode){
	if (mode == true) {
		document.body.classList.add('is-dark');
		if (toggleBtnIcon) {
			toggleBtnIcon.classList.remove('fa-moon');
			toggleBtnIcon.classList.add('fa-sun');
			toggleBtn.setAttribute('title','Light Mode');
		}
	} else {
		document.body.classList.remove('is-dark');
		if (toggleBtnIcon) {
			toggleBtnIcon.classList.remove('fa-sun');
			toggleBtnIcon.classList.add('fa-moon');
			toggleBtn.setAttribute('title','Dark Mode');
		}
	}
}
window.addEventListener('load', function() {
	if (localStorage.getItem('dark_mode') == 'true') {
		toggleMode(true);
	} else {
		toggleMode(false);	
	}
	if (toggleBtn) {
		toggleBtn.addEventListener('click', function() {
			document.body.classList.toggle('is-dark');
			if (document.body.classList.contains('is-dark')) {
				localStorage.setItem('dark_mode', true);
				toggleMode(true);
			} else {
				localStorage.setItem('dark_mode', false);
				toggleMode(false);
			}
		});
	}
});
