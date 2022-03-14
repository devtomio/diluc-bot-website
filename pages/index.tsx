import { useState, useMemo } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { WebSocket } from 'nextjs-websocket';
import { Line } from 'react-chartjs-2';
import dayjs from 'dayjs';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function Page() {
	const initialData = [[90, dayjs().format('MM/DD/YY HH:mm:ss')]];
	const [data, setData] = useState(() => initialData);
	const chartData = useMemo(() => {
		const datasets = data.map((d) => d[0]);
		const labels = data.map((d) => d[1]);

		return {
			datasets: [
				{
					label: 'WS',
					borderColor: 'rgb(46, 204, 113)',
					tension: 0.5,
					data: datasets
				}
			],
			labels
		};
	}, [data]);
	const onMessage = (data: string) => {
		const { ping, timestamp } = JSON.parse(data);
		console.log(data);

		setData((prev) => {
			prev.push([Number(ping), timestamp]);

			return prev;
		});
	};

	return (
		<>
			<div className="container">
				<section className="me unset">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						draggable="false"
						src="https://i.pinimg.com/564x/4d/8c/3f/4d8c3f77b7a59488c5be5d9fadc0e2df.jpg"
						className="image-title"
						alt="bot-avatar"
					/>
					<div className="unset">
						<h1 className="title">Diluc#6637</h1>
					</div>
				</section>

				<div className="box-container secondary-dropshadow no-border-radius">
					<h1 className="no-margin">Discord API Ping</h1>
					<Line
						data={chartData}
						options={{
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
						}}
					/>
				</div>
			</div>

			<WebSocket url={process.env.NEXT_PUBLIC_WS_URL} onMessage={onMessage} />
		</>
	);
}

export default Page;
