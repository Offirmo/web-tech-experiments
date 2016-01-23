import _ from 'lodash';

const URL = 'http://jsonplaceholder.typicode.com/posts';

fetch(URL).then(response => {
	console.log('response', response);
	return response.json();
})
.then(posts => {
	console.log('data', posts);
	let tbody = document.querySelector('tbody');

	_.forEach(posts, function (post) {
		var el = document.createElement('tr');
		el.innerHTML = `
		<td>${post.id}</td>
		<td>${post.userId}</td>
		<td>${post.title}</td>
		<td>...</td>`;
		tbody.appendChild(el);
	});
})
.catch(error => {
	console.log(console);
	console.error(error);
	var el = document.createElement('div');
	el.innerHTML = `<div class="alert alert-danger" role="alert">${error.message}</div>`;

	document.querySelector('div.container').appendChild(el);
});
