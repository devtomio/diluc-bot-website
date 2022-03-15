/* eslint-disable @next/next/no-sync-scripts */

import { NextSeo } from 'next-seo';
import type { GetServerSideProps } from 'next';

type MAXIMUM_ALLOWED_BOUNDARY = 200;
type Mapped<N extends number, Result extends Array<unknown> = []> = Result['length'] extends N ? Result : Mapped<N, [...Result, Result['length']]>;
type NumberRange = Mapped<MAXIMUM_ALLOWED_BOUNDARY>[number];
type Texts<T extends PropertyKey> = T extends number ? `text${T}` : never;
type T = null | 'auto' | Texts<NumberRange>;

type Dictionary = {
	[Prop in NumberRange as `${Prop}`]: Prop;
};

interface Stats {
	ping: Extract<T, `text${number}`> extends `text${infer R}` ? (R extends keyof Dictionary ? Dictionary[R] : never) : never;
	users: number;
	servers: number;
	ram: `${number}.${number} MB`;
	redisVersion: `${number}.${number}.${number}`;
	dbEntries: number;
}

export const getServerSideProps: GetServerSideProps = async () => {
	const res = await fetch('https://diluc-api.tomio.codes/stats');
	const data: Stats = await res.json();

	return {
		props: {
			Ping: data.ping,
			Users: data.users,
			Servers: data.servers,
			RAM: data.ram,
			Redis: data.redisVersion,
			'Database Entries': data.dbEntries
		}
	};
};

const Page = (data: Stats) => {
	return (
		<>
			<NextSeo
				title="Diluc Bot"
				description="A Genshin Impact bot."
				canonical="https://diluc.tomio.codes/"
				openGraph={{
					url: 'https://diluc.tomio.codes',
					title: 'Diluc Bot',
					description: 'A Genshin Impact bot.'
				}}
				twitter={{
					handle: '@handle',
					site: '@site',
					cardType: 'summary_large_image'
				}}
				additionalMetaTags={[
					{
						name: 'theme-color',
						content: '#993529'
					}
				]}
				additionalLinkTags={[
					{
						rel: 'icon',
						type: 'image/x-icon',
						href: '/favicon.ico'
					}
				]}
			/>
			<div className="container">
				<section className="me unset">
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img draggable="false" src="/diluc.jpg" className="image-title" alt="bot-avatar" />
					<div className="unset">
						<h1 className="title">Diluc#6637</h1>
						<p className="undertitle italic">A Genshin Impact bot.</p>
						<p className="undertitle italic">Last updated: 03/15/2022</p>
					</div>
				</section>

				<div className="box-container markdown-jekyll">
					<h1></h1>
					<h1 className="text-center">About the Bot</h1>

					<h2>Benefits</h2>
					<ul>
						<li>Fast</li>
						<li>Uses new Discord features</li>
						<li>Up-to-date with the Discord API</li>
						<li>User-friendly</li>
					</ul>

					<h2>Features</h2>
					<ul>
						<li>Genshin Characters</li>
						<li>Tag System</li>
					</ul>

					<h1></h1>
				</div>
				<br />

				<div className="box-container blurple-dropshadow no-border-radius">
					<h1 className="no-margin">Statistics</h1>
					<hr />
					<section className="flex-grid">
						{Object.entries(data).map(([k, v], i) => (
							<div key={i} className="col-xs-4">
								<p className="stats-key">{k}</p>
								<p className="stats-value">{v}</p>
							</div>
						))}
					</section>
				</div>

				<div className="box-container secondary-dropshadow no-border-radius">
					<h1 className="no-margin">Discord API Ping</h1>
					<hr />
					<canvas id="ping-chart"></canvas>
				</div>

				<p className="footer-note">
					<span className="bold reddit-text">NOTE: </span>
					You may use this website to test that the bot is operating correctly and to see if your internet connection is down or if Discord
					is just unavailable.
				</p>

				<p className="final-footer">
					Website Source:{' '}
					<b>
						<a href="https://github.com/devtomio/diluc-bot-website" target="_blank" rel="noreferrer" className="npm-text">
							devtomio/diluc-bot-website
						</a>
					</b>
					<br />
					Bot Source:{' '}
					<b>
						<a href="https://github.com/devtomio/diluc-bot" target="_blank" rel="noreferrer" className="npm-text">
							devtomio/diluc-bot
						</a>
					</b>
					<br />
					Inspired by:{' '}
					<b>
						<a href="https://status.xela.dev" target="_blank" rel="noreferrer" className="npm-text">
							Xela&apos;s status website
						</a>
					</b>
				</p>
			</div>

			<script src="/chart.js"></script>
			<script src="/dayjs.js"></script>
			<script src="/main.js"></script>
		</>
	);
};

export default Page;
