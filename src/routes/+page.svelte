<script lang="ts">
	import "../app.css";
	import theme from "$lib/theme";
	import data from "$lib/data.json";
	import { browser } from "$app/environment";

	const { preference } = theme;
	const { name, profession, email, location, socials, summary, experience, skills } = data;
</script>
<svelte:head>
	<title>{profession ? `${name} | ${profession}` : name}</title>
</svelte:head>
{#if browser}
	<div class="actions btn-group">
		<button class="btn btn-sm btn-secondary bi-circle-half" class:active={$preference === 'auto'} title="Auto" onclick={() => $preference = 'auto'}></button>
		<button class="btn btn-sm btn-secondary bi-sun-fill" class:active={$preference === 'light'} title="Light" onclick={() => $preference = 'light'}></button>
		<button class="btn btn-sm btn-secondary bi-moon-fill" class:active={$preference === 'dark'} title="Dark" onclick={() => $preference = 'dark'}></button>
		<button class="btn btn-sm btn-secondary bi-printer-fill" title="Print" onclick={() => print()}></button>
	</div>
{/if}
<main class="container bg-body my-5 p-4">
	<div class="cv-root">
		<div class="cv-group">
			<div class="cv-box flex-col justify-content-center">
				<h1 class="m-0">{name}</h1>
				{#if profession}
					<span>{profession}</span>
				{/if}
			</div>
			<div class="cv-box">
				{#if email}
					<span>
						<i class="bi-envelope-fill"></i>
						<a href="mailto:{email}">
							{email}
						</a>
					</span>
				{/if}
				{#each socials ?? [] as { icon, title, href }}
					<span>
						{#if icon}
							<i class="bi-{icon}"></i>
						{/if}
						<a {href} target="_blank">{title ?? href}</a>
					</span>
				{/each}
				{#if location}
					<span>
						<i class="bi-globe"></i>
						{location}
					</span>
				{/if}
			</div>
		</div>
		<div class="cv-box">{summary}</div>
		<div class="cv-group">
			<div class="cv-box">
				<h4>Experience</h4>
				{#each experience as exp}
					<div>
						<div class="flex-row">
							<strong class="flex-fill">{exp.role} - {exp.company}</strong>
							<span class="text-secondary">{exp.date}</span>
						</div>
						<ul class="bullet-list">
							{#each exp.skills as skill}
								<li>{skill}</li>
							{/each}
						</ul>
					</div>
				{/each}
			</div>
			<div class="cv-box">
				{#each Object.entries(skills) as [group, skillList]}
					<h4>{group}</h4>
					<ul class="bullet-list">
						{#each skillList as skill}
							<li>{skill}</li>
						{/each}
					</ul>
				{/each}
			</div>
		</div>
	</div>
</main>
<style>
	.cv-root {
		--cv-padding-x: 1em;
		--cv-padding-y: 1em;
		display: flex;
		flex-direction: column;

		> .cv-box:not(:first-child) {
			border-top-style: solid;
		}
	}

	.cv-box {
		display: flex;
		flex-direction: column;
	}

	.cv-box,
	.cv-group {
		border: none var(--bs-border-color) var(--bs-border-width);
	}

	.cv-group {
		display: flex;
		align-items: stretch;
	}

	.cv-root {
		> .cv-box,
		.cv-group {
			&:not(:last-child) {
				padding-bottom: var(--cv-padding-y);
			}

			&:not(:first-child) {
				padding-top: var(--cv-padding-y);
				border-top-style: solid;
			}
		}
	}

	.actions {
		position: absolute;
		top: 0;
		left: 0;
		margin: 1em;
		transition: opacity ease-in-out .15s;

		&:not(:hover) {
			opacity: 0.5;
		}
	}

	@media print {
		.actions {
			display: none !important;
		}

		.cv-root {
			font-size: 0.8em;
		}

		.container {
			max-width: unset !important;
			margin: 0 !important;
		}
	}

	@media (min-width: 576px) {
		.cv-group {
			--content-flex: 16em;
			align-items: stretch;

			> .cv-box {
				&:first-child {
					flex: 1;
				}

				&:not(:last-child) {
					padding-right: var(--cv-padding-x);
				}

				&:not(:first-child) {
					flex: 0 0 var(--content-flex);
					padding-left: var(--cv-padding-x);
					border-left-style: solid;
				}
			}
		}
	}

	@media (min-width: 1200px) {
		.cv-group {
			--content-flex: 25%;
		}
	}

	@media (max-width: 576px) {
		.cv-group {
			flex-direction: column;

			> .cv-box {
				&:first-child {
					padding-bottom: var(--cv-padding-y);
				}

				&:not(:first-child) {
					padding-top: var(--cv-padding-y);
					border-top-style: solid;
				}
			}
		}
	}
</style>
