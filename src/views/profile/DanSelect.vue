<template>
	<v-menu
		:close-on-content-click="false"
		:offset-x="isOffsetX"
		:offset-y="isOffsetY"
		:open-on-hover="isOpenOnHover"
		:transition="transition"
		:value="openMenu"
	>
		<template v-slot:activator="{ on }">
			<v-list-item v-if="isSubMenu" class="d-flex justify-space-between" v-on="on">
				
					{{ name }}
				<div class="flex-grow-1"></div>
				<v-icon>mdi-chevron-right</v-icon>
			</v-list-item>
			<v-btn
				class="font-weight-bold"
				small
				color="white"
				text
				v-bind="attrs"
				v-else
				v-on="on"
				@click="openMenu = true"
			>
				{{ name }}
			</v-btn>
		</template>
		<v-list>
			<template v-for="(item, index) in menuItems">
				<v-divider v-if="item.isDivider" :key="index" />
				<dan-select
					v-else-if="item.menu"
					:key="index + Math.random()"
					:name="item.name"
					:menu-items="item.menu"
					@dan-menu-click="emitClickEvent"
					:is-open-on-hover="false"
					:is-offset-x="true"
					:is-offset-y="false"
					:is-sub-menu="true"
					:route="item.link"
				/>
				<v-list-item
					v-else
					:key="index + Math.random()"
					@click="emitClickEvent(item)"
				>
						<router-link
							exact-active-class
							:to="'/profile/vclass/' + item.link + '?type=' + name"
							class="mx-2 pa-2 text-decoration-none black--text "
							style="width : 100%"
						>
							{{ item.text }}
						</router-link>
				</v-list-item>
			</template>
		</v-list>
	</v-menu>
</template>

<script>
export default {
	props: {
		name: String,
		icon: String,
		menuItems: Array,
		color: { type: String, default: "secondary" },
		isOffsetX: { type: Boolean, default: false },
		isOffsetY: { type: Boolean, default: true },
		isOpenOnHover: { type: Boolean, default: false },
		isSubMenu: { type: Boolean, default: false },
		transition: { type: String, default: "scale-transition" },
		route: { type: String, default: "" },
	},
	methods: {
		emitClickEvent(item) {
			this.$emit("dan-menu-click", item);
			this.openMenu = false;
		},
	},
	data: () => ({
		openMenu: false,
	}),
};
</script>

<style></style>