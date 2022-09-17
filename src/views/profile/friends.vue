<template>
	<div>
		<v-row align="center">
			<v-col cols="2">
				<h3 class="primary--text text-capitalize font-weight-bold">
					{{ $t("friends") }} ((220))
				</h3>
			</v-col>
			<v-col cols="8">
				<v-text-field
					hide-details
					color="primary"
					solo
					v-model="lesson"
					:label="'Search'"
				></v-text-field>
			</v-col>
		</v-row>

		<v-row align="center">
			<v-col cols="3" v-for="i in 20" :key="i">
				<v-card class="mx-auto" max-width="300" >
					<v-list-item three-line>
						<v-list-item-avatar color="grey darken-3">
							<v-img 
                               outline
								class="elevation-6"
								alt=""
								src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
							></v-img>
						</v-list-item-avatar>
						<v-list-item-content>
							<div class="">User Name</div>
							<v-list-item-title class="mb-1" style="color: gray"
								>13 Mutual Friends</v-list-item-title
							>
						</v-list-item-content>
					</v-list-item>
                    <div class="text-center pb-2">

						<v-btn
							color="primary"
							class="white--text"
							depressed
							style="text-transform: none"
						>
							Add Friend
						</v-btn>
                    </div>
				</v-card>
			</v-col>
		</v-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			searchTerm: "",
		};
	},
};
</script>

<style></style>