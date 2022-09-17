<template>
	<v-container fluid>
		<v-row>
			<v-col cols="12" md="4">
				<v-card class="pa-3">
					<v-avatar size="30">
						<img :src="user.avatar" />
					</v-avatar>
					<span class="mx-2">{{ user.name }}</span> <br />
					<span class="mx-10">{{ $t("admin") }}</span>
					<v-select
						dense
						color="primary"
						class="mt-5"
						hide-details
						outlined
						item-text="text"
						item-value="value"
						v-model="group.type"
						:label="$t('type')"
						:items="types"
					></v-select>
					<v-text-field
						dense
						class="mt-5"
						hide-details
						color="primary"
						:label="$t('name')"
						v-model="group.name"
						outlined
					></v-text-field>
					<v-select
						dense
						color="primary"
						class="mt-5"
						hide-details
						outlined
						item-text="text"
						item-value="value"
						v-model="group.privacy"
						:label="$t('privacy')"
						:items="privacies"
					></v-select>
					<v-textarea
						outlined
						hide-details
						:label="$t('description')"
						class="mt-5"
						v-model="group.description"
						color="primary"
					></v-textarea>
					<v-file-input
						accept="image/png, image/jpeg, image/bmp"
						:label="$t('coverImage')"
						prepend-inner-icon="mdi-camera"
						color="primary"
						outlined
						hide-details
						class="mt-5"
						v-model="image"
					></v-file-input>
					<v-select
						solo
						:label="$t('inviteFriends')"
						color="primary"
						:items="[
							{ value: 'public', text: $t('public') },
							{ value: 'friends', text: $t('friends') },
						]"
						v-model="invitation"
						item-text="text"
						item-value="value"
						@change="
							invitation === 'friends'
								? (invitationDialog = true)
								: (showFriends = false)
						"
						:hint="$t('selectedFriends') + ': ' + selectedFriends.length"
						persistent-hint
					></v-select>
					<v-card-actions class="px-0 mt-2">
						<v-btn
							color="primary"
							elevation="0"
							block
							@click="
								group.id = groups.length + 1;
								group.admins = [user];
								$store.dispatch('addGroup', group);
								$router.push('/groups/' + group.id);
							"
							>{{ $t("create") }}</v-btn
						>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col cols="12" md="8">
				<v-card
					:width="viewport === 'desktop' ? '' : 600"
					class="pa-5 mb-10 mx-auto"
				>
					<v-card-title class="d-flex flex-wrap justify-space-between">
						{{ $t("viewport") }}
						<div>
							<v-btn
								@click="viewport = 'desktop'"
								icon
								:color="viewport === 'desktop' ? 'primary' : 'grey'"
								><v-icon>mdi-monitor</v-icon></v-btn
							>
							<v-btn
								@click="viewport = 'mobile'"
								icon
								:color="viewport === 'desktop' ? 'grey' : 'primary'"
								><v-icon>mdi-cellphone</v-icon></v-btn
							>
						</div>
						<v-card-text>
							<v-img
								class="rounded"
								:height="viewport === 'desktop' ? 500 : 300"
								:src="group.cover || images[0].url"
							></v-img>
							<h3 class="my-5">{{ group.name || $t("name") }}</h3>
							<h4 class="my-5">
								{{ group.privacy === "public" ? $t("public") : $t("private") }},
								{{ $t("members") }} 1
							</h4>
							<v-divider></v-divider>
							<div class="d-flex my-5">
								<h3 class="font-weight-bold mx-5">{{ $t("about") }}</h3>
								<h3 class="font-weight-bold mx-5">{{ $t("posts") }}</h3>
								<h3 class="font-weight-bold mx-5">{{ $t("members") }}</h3>
								<h3 class="font-weight-bold mx-5">{{ $t("events") }}</h3>
							</div>
							<v-card color="grey lighten-2 pa-3">
								<v-row>
									<v-col :cols="viewport === 'desktop' ? 9 : 12">
										<v-card class="pa-3" elevation="0">
											<post-form></post-form>
										</v-card>
									</v-col>
									<v-col
										:cols="viewport === 'desktop' ? 3 : 12"
										:class="viewport === 'mobile' ? 'order-first' : ''"
									>
										<v-card elevation="0" class="pa-3">
											<v-card-title class="body-2 font-weight-bold">{{
												$t("about")
											}}</v-card-title>
											<v-card-text>
												{{ group.description || $t("description") }}
											</v-card-text>
										</v-card>
									</v-col>
								</v-row>
							</v-card>
						</v-card-text>
					</v-card-title>
				</v-card>
			</v-col>
		</v-row>

		<!-- invite Friend Dialog -->
		<v-dialog max-width="900" v-model="invitationDialog">
			<v-card class="">
				<v-card-title>
					<span class="text-h5 primary--text"> {{ $t("inviteFriends") }} </span>
				</v-card-title>
				<v-divider></v-divider>
				<v-card-text>
					<v-row no-gutters>
						<v-col cols="12" sm="8">
							<v-text-field
								prepend-inner-icon="mdi-magnify"
								rounded
								outlined
								dense
								hide-details
								class="mt-5 mx-5"
								v-model="searchTerm"
							></v-text-field>
							<v-checkbox
								:label="$t('allFriends')"
								@click="
									selectedFriends.length === users.length
										? (selectedFriends = [])
										: (selectedFriends = users)
								"
							></v-checkbox>
							<v-divider></v-divider>
							<v-list>
								<v-list-item v-for="friend in friends" :key="friend.id">
									<v-list-item-avatar>
										<img
											width="20"
											class="rounded-circle mx-1"
											:src="friend.avatar"
											alt=""
										/>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-checkbox v-model="selectedFriends" :value="friend"></v-checkbox>
										{{ friend.name }}
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-col>
						<v-col class="grey lighten-2 pa-2" cols="12" sm="4">
							<h4>{{ $t("selectedFriends") }}</h4>
							<v-list class="grey lighten-2">
								<v-list-item v-for="friend in selectedFriends" :key="friend.id">
									<v-list-item-avatar>
										<img
											width="20"
											class="rounded-circle mx-1"
											:src="friend.avatar"
											alt=""
										/>
									</v-list-item-avatar>
									<v-list-item-content>
										<v-list-item-title>{{ friend.name }}</v-list-item-title>
									</v-list-item-content>
								</v-list-item>
							</v-list>
							<div v-if="selectedFriends.length">
								<v-btn @click="selectedFriends = []" text color="primary">empty</v-btn>
								<v-btn
									small
									elevation="0"
									@click="invitationDialog = false"
									color="primary"
									>{{ $t("submit") }}</v-btn
								>
							</div>
						</v-col>
					</v-row>
				</v-card-text>
			</v-card>
		</v-dialog>
		<!--  -->
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import PostForm from "../../components/posts/PostForm";

export default {
	components: {
		PostForm,
	},
	data() {
		return {
			group: {
				id: 0,
				name: "",
				type: "subject",
				privacy: "public",
				description: "",
				covere: "",
				admins: [],
				members: [],
				media: [],
			},
			image: null,
			viewport: "desktop",
			searchTerm: "",
			invitationDialog: false,
			selectedFriends: [],
		};
	},
	watch: {
		image(val) {
			if (val) {
				this.group.cover = URL.createObjectURL(val);
			}
		},
		searchTerm(val) {
			this.friends = this.users.filter((item) =>
				item.name.toLowerCase().includes(val.toLowerCase())
			);
		},
	},
	computed: {
		...mapState(["users"]),
		...mapState(["user", "groups", "images"]),
		types() {
			const types = [
				{ text: this.$t("subject"), value: "subject" },
				{ text: this.$t("grade"), value: "grade" },
			];
			if (this.user.role === "teacher") {
				types.push({ text: this.$t("teacher"), value: "teacher" });
			}
			return types;
		},
		privacies() {
			return [
				{ text: this.$t("public"), value: "public" },
				{ text: this.$t("private"), value: "private" },
			];
		},
	},
	created() {
		this.suggests = [...this.groups];
		this.group.admin = this.user;
		this.friends = this.users;
	},
};
</script>
