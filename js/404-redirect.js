/**!
 * @package    Blue Ocean
 * @filename  404-redirect.js
 * @version   1.0
 * @author    Díaz Urbaneja Víctor Eduardo Diex <victor.vector008@gmail.com>
 * @date      01.02.2021 00:46:18 -04
 */

var url = sessionStorage.getItem('lastPage');

document.getElementById('redirectBtn').addEventListener('click', function() {
	if (sessionStorage.getItem('lastPage')) {
		this.setAttribute('href', url);
	}
});