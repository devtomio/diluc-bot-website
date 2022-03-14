(() => {
	const ws = new WebSocket('wss://horrible-zephyr-production.up.railway.app');
	const labels = ['Current'];
	const data = [90];
	const canvas = document.getElementById('ping-chart').getContext('2d');
	const chart = new Chart(canvas, {
		type: 'line',
		data: {
			labels,
			datasets: [
				{
					label: 'WS',
					borderColor: 'rgb(46, 204, 113)',
					tension: 0.5,
					data
				}
			]
		},
		options: {
			responsive: true,
			maintainAspectRatio: true,
			animation: {
				duration: 500
			},
			scales: {
				y: {
					ticks: {
						color: '#ccc'
					},
					beginAtZero: true,
					min: 70,
					max: 100
				}
			}
		}
	});

	ws.addEventListener('message', (ev) => {
		const { ping, timestamp } = JSON.parse(ev.data);

		labels.push(timestamp);
		data.push(ping);

		if (labels.length > 10 && data.length > 10) {
			labels.shift();
			data.shift();
		}

		chart.update();
	});
})();
