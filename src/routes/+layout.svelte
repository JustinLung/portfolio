<script lang="ts">
	import '$lib/styles/all.css';
	import Header from '$lib/components/layout/Header.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';
	import Lenis from '$lib/components/shared/Lenis.svelte';

	import { gsap } from 'gsap';
	import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
	import { Flip } from 'gsap/dist/Flip';

	gsap.registerPlugin(ScrollTrigger, Flip);
</script>

<Lenis />
<Header />
<main class="container">
	<slot />
</main>
<Footer />
