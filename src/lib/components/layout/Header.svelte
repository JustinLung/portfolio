<script lang="ts">
	import { onMount } from 'svelte';
	import gsap from 'gsap';
	import { links, socials } from '$lib/utils/links';

	let isOpen = $state(false);

	onMount(() => {
		const navWrap = document.querySelector('.nav');
		const overlay = document.querySelector('.overlay');
		const menu = document.querySelector('.menu');
		const bgPanels = document.querySelectorAll('.bg-panel');
		const menuToggles = document.querySelectorAll('.menu-toggle');
		const menuLinks = document.querySelectorAll('.menu-link');
		const fadeTargets = document.querySelectorAll('[data-menu-fade]');
		const menuButtonTexts = document.querySelectorAll('.menu-button-text');
		const menuButtonIcon = document.querySelector('.menu-button-icon');

		gsap.defaults({
			ease: 'main',
			duration: 0.7
		});

		const openNav = () => {
			isOpen = true;

			const tl = gsap.timeline();
			tl.clear()
				.set(navWrap, { display: 'block' })
				.set(menu, { xPercent: 0 }, '<')
				.fromTo(menuButtonTexts, { yPercent: 0 }, { yPercent: -100, stagger: 0.2 })
				.fromTo(menuButtonIcon, { rotate: 0 }, { rotate: 315 }, '<')
				.fromTo(overlay, { autoAlpha: 0 }, { autoAlpha: 1 }, '<')
				.fromTo(bgPanels, { xPercent: 101 }, { xPercent: 0, stagger: 0.12, duration: 0.575 }, '<')
				.fromTo(
					menuLinks,
					{ yPercent: 140, rotate: 10 },
					{ yPercent: 0, rotate: 0, stagger: 0.05 },
					'<+=0.35'
				)
				.fromTo(
					fadeTargets,
					{ autoAlpha: 0, yPercent: 50 },
					{ autoAlpha: 1, yPercent: 0, stagger: 0.04 },
					'<+=0.2'
				);
		};

		const closeNav = () => {
			isOpen = false;

			const tl = gsap.timeline();
			tl.clear()
				.to(overlay, { autoAlpha: 0 })
				.to(menu, { xPercent: 120 }, '<')
				.to(menuButtonTexts, { yPercent: 0 }, '<')
				.to(menuButtonIcon, { rotate: 0 }, '<')
				.set(navWrap, { display: 'none' });
		};

		const handleEscapeKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && isOpen === true) {
				closeNav();
			}
		};

		if (isOpen) {
			openNav();
		} else {
			closeNav();
		}

		menuToggles.forEach((toggle) => {
			toggle.addEventListener('click', toggleMenu);
		});

		document.addEventListener('keydown', handleEscapeKey);

		return () => {
			menuToggles.forEach((toggle) => {
				toggle.removeEventListener('click', toggleMenu);
			});

			document.removeEventListener('keydown', handleEscapeKey);
		};
	});

	const toggleMenu = () => {
		isOpen = !isOpen;
	};
</script>

<header class="container">
	<a href="/">Portfolio</a>
	<button onclick={toggleMenu}>Menu</button>
</header>

{#if isOpen}
	<div class="nav">
		<nav class="menu">
			<div class="menu-bg">
				<div class="bg-panel first"></div>
				<div class="bg-panel second"></div>
				<div class="bg-panel"></div>
			</div>

			<div class="menu-inner">
				<ul class="menu-list">
					{#each links as link, i}
						<li class="menu-list-item">
							<a href={link.url} class="menu-link w-inline-block">
								<p class="menu-link-heading">{link.name}</p>
								<p class="eyebrow">0{i + 1}</p>
								<div class="menu-link-bg"></div>
							</a>
						</li>
					{/each}
				</ul>
				<div class="menu-details">
					<p data-menu-fade="" class="p-small">Socials</p>
					<div class="socials-row">
						{#each socials as social}
							<a data-menu-fade="" href={social.url} class="p-large text-link">{social.name}</a>
						{/each}
					</div>
				</div>
			</div>
		</nav>
	</div>
{/if}

<style lang="postcss">
	header {
		display: flex;
		justify-content: space-between;
		position: relative;
		z-index: 10;

		a {
			font-size: 1.5rem;
			font-weight: semibold;
		}

		button {
			background: none;
			border: none;
			cursor: pointer;
			font-size: 1rem;
			font-weight: semibold;
			color: var(--white);
			pointer-events: all;

			background-color: red;
		}
	}

	.nav {
		z-index: 9;
		width: 100%;
		height: 100vh;
		margin-left: auto;
		margin-right: auto;
		display: block;
		position: fixed;
		inset: 0%;
	}

	.menu {
		padding-bottom: var(--menu-padding);
		grid-column-gap: 5em;
		grid-row-gap: 5em;
		padding-top: calc(3 * var(--menu-padding));
		flex-flow: column;
		justify-content: space-between;
		align-items: flex-start;
		width: 35em;
		height: 100%;
		margin-left: auto;
		position: relative;
		overflow: auto;

		.menu-bg {
			z-index: 0;
			position: absolute;
			inset: 0%;
		}

		.menu-inner {
			z-index: 1;
			grid-column-gap: 5em;
			grid-row-gap: 5em;
			flex-flow: column;
			justify-content: space-between;
			align-items: flex-start;
			height: 100%;
			display: flex;
			justify-content: center;
			position: relative;
			overflow: auto;

			.bg-panel {
				z-index: 0;
				background-color: var(--white);
				border-top-left-radius: 1.25em;
				border-bottom-left-radius: 1.25em;
				position: absolute;
				inset: 0%;

				&.first {
					background-color: red;
				}

				&.second {
					background-color: blue;
				}
			}

			.menu-list {
				flex-flow: column;
				width: 100%;
				margin-bottom: 0;
				padding-left: 0;
				list-style: none;
				display: flex;

				&-item {
					position: relative;
					overflow: hidden;
				}

				.menu-link {
					padding-top: 0.75em;
					padding-bottom: 0.75em;
					padding-left: var(--menu-padding);
					grid-column-gap: 0.75em;
					grid-row-gap: 0.75em;
					width: 100%;
					text-decoration: none;
					display: flex;
				}
			}

			.menu-details {
				padding-left: var(--menu-padding);
				grid-column-gap: 1.25em;
				grid-row-gap: 1.25em;
				flex-flow: column;
				justify-content: flex-start;
				align-items: flex-start;
				display: flex;

				.socials-row {
					grid-column-gap: 1.5em;
					grid-row-gap: 1.5em;
					flex-flow: row;
					display: flex;
				}
			}
		}
	}
</style>
