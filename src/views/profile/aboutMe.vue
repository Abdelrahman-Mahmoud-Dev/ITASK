<template>
	<div>
		<v-row align="center">
			<v-col cols="2">
				<h3 class="primary--text text-capitalize font-weight-bold">about me</h3>
			</v-col>
		</v-row>
		<div class="mb-30">
			<h3 class="mb-2">Hobbies</h3>
			<v-row align="center" :wrap="true">
				<v-btn-toggle v-model="formatting" group multiple active-class="active-btn">
					<v-btn rounded v-for="i in 30" :key="i">Test</v-btn>
				</v-btn-toggle>
			</v-row>
		</div>
		<div class="mb-30">
			<h3 class="mb-2">sports</h3>
			<v-row align="center" :wrap="true">
				<v-btn-toggle v-model="formatting" group multiple active-class="active-btn">
					<v-btn rounded v-for="i in 30" :key="i + 'random'" :value="i + 'random'"
						>Test</v-btn
					>
				</v-btn-toggle>
			</v-row>
		</div>
		<div class="mb-30">
			<h3 class="mb-2">Skills</h3>
			<v-row align="center" :wrap="true">
				<v-btn-toggle v-model="formatting" group multiple active-class="active-btn">
					<v-btn rounded v-for="i in 30" :key="i + 'random2'" :value="i + 'random2'"
						>Test</v-btn
					>
				</v-btn-toggle>
			</v-row>
		</div>
		<div class="mb-30">
			<h3 class="mb-2">Education</h3>
			<v-text-field
				hide-details
				color="primary"
				solo
				v-model="lesson"
				:label="'Search'"
				class="mb-1"
			></v-text-field>
			<span> Mohamed Ali Preparatory School. </span>
			<v-row justify="end">
				<v-btn rounded color="primary" class="mb-30">Save Changes</v-btn>
			</v-row>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formatting: [],
		};
	},
};
</script>

<style>
.v-btn-toggle--group {
	flex-wrap: wrap;
}
.v-btn-toggle--group > .v-btn.v-btn {
	padding: 6px 35px !important;
	border: 1px solid #f9ba16 !important;
	border-radius: 12px !important;
	margin: 8px !important;
}
.v-btn-toggle--group > .v-btn.v-btn.active-btn {
	background: #f9ba16 !important;
	color: white !important;
}
.mb-30 {
	margin-bottom: 30px;
}
</style>