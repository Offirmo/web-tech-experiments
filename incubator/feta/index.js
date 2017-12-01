fetso = (url) => fetch(url, {credentials: 'same-origin'}).then(response => {
	if (response.status !== 200) {
		console.error(`failed response:`, response)
		throw new Error(`Failed: ${response.status}`);
	}
	return response.text().then(txt => {
		try {
			return JSON.parse(txt)
		} catch (e) {
			return txt
		}
	})
}).then(r => {
	console.log('success', r);
	return r
}).catch(err => {
	console.error('failure', err);
	return err
})

fetso('/rest/api/2/myself?expand=groups')
fetso('/wiki/rest/api/user/current')
fetso('/wiki/rest/api/user/memberof?accountId=655363:28bcb9aa-ab16-43e3-87a1-e2736b84992c')


fet = (url) => fetch(url).then(response => {
	if (response.status !== 200) {
		console.error(`failed response:`, response)
		throw new Error(`Failed: ${response.status}`);
	}
	return response.text().then(txt => {
		try {
			return JSON.parse(txt)
		} catch (e) {
			return txt
		}
	})
}).then(r => {
	console.log('success', r);
	return r
}).catch(err => {
	console.error('failure', err);
	return err
})

fet('/rest/product-fabric/1.0/cloud/id')


9258d77b-e84f-4315-af58-698f27e03e03



fet('https://id.staging.atl-paas.net/v1/site/9258d77b-e84f-4315-af58-698f27e03e03/userpermissions')


