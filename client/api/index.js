import 'es6-promise';

function getGraphData() {

	return new Promise(resolve => {

		setTimeout(() => {

            const xhr = new XMLHttpRequest();
            xhr.open("GET", '/mydata');
            xhr.onload = () => resolve(JSON.parse(xhr.responseText));
            xhr.onerror = () => reject('Error, please check back later');
            xhr.send();		
			
		}, 1000);
	});
}

export default {
	getGraphData,
};