/* eslint-disable @next/next/no-sync-scripts */

function Page() {
	return (
		<>
			<div className="container">
				<section className="me unset">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						draggable="false"
						src="https://i.pinimg.com/564x/4d/8c/3f/4d8c3f77b7a59488c5be5d9fadc0e2df.jpg"
						className="image-title"
						alt="bot-avatar g"
					/>
					<div className="unset">
						<h1 className="title">Diluc#6637</h1>
					</div>
				</section>

				<div className="box-container secondary-dropshadow no-border-radius">
					<h1 className="no-margin">Discord API Ping</h1>
					<canvas id="ping-chart"></canvas>
				</div>
			</div>

			<script src="/chart.js"></script>
			<script src="/dayjs.js"></script>
			<script src="/main.js"></script>
		</>
	);
}

export default Page;
