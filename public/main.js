(() => {
	const ws = new WebSocket('wss://horrible-zephyr-production.up.railway.app');
	const labels = [dayjs().format('MM/DD/YY HH:mm:ss')];
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
					beginAtZero: true
				}
			}
		}
	});

	ws.addEventListener('message', (ev) => {
		const { ping, timestamp } = JSON.parse(ev.data);

		labels.push(timestamp);
		data.push(ping);
		chart.update();
	});
})();
