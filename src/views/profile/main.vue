<template>
	<div>
		<div class="profile-banner">
			<v-img
				height="400"
				:src="userExtras.cover ? userExtras.cover : require('../../assets/bg.jpg')"
				width="98%"
				class="mx-auto rounded-b-lg"
			>
			</v-img>
			<div class="user-info">
				<v-avatar size="300">
					<img class="user-avatar" :src="user.avatar" alt="" />
				</v-avatar>
				<h2 class="white--text">{{ user.name }}</h2>
				<p class="white--text">
					Lorem ipsum dolor sit amet consectetur adipisicing.
				</p>
				<div>
					<v-btn class="mb-2 mx-1" color="primary" @click="$router.push('/addStory')"
						><v-icon left>mdi-plus-circle</v-icon>{{ $t("addStory") }}</v-btn
					>
					<v-btn
						class="mb-2"
						color="white"
						@click="$router.push('/profile/settings')"
						>{{ $t("editProfile") }}</v-btn
					>
				</div>
			</div>
			<div class="profile-nav d-flex flex-wrap justify-space-between">
				<div class="d-flex flex-wrap">
					<div v-for="item in items" :key="item.text">
						<router-link
							v-if="item.type === 'link'"
							exact-active-class
							active-class="active-route"
							:to="'/profile' + item.route"
							class="mx-2 pa-2 font-weight-bold text-decoration-none white--text"
							:class="item.disabled ? 'disable-link' : ''"
						>
							{{ item.text }}
						</router-link>
						<div
							v-else
							:class="$route.path.includes(item.route) ? 'active-route' : ''"
						>
							<dan-select
								v-if="item.nestRoute"
								:name="item.text"
								:menu-items="item.fileMenuItems"
								@dan-menu-click="onMenuItemClick"
								:route="item.route"
							/>
							<v-menu offset-y v-else>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										class="font-weight-bold"
										small
										color="white"
										text
										v-bind="attrs"
										v-on="on"
										>{{ item.text }} <v-icon>mdi-menu-down</v-icon></v-btn
									>
								</template>
								<v-list>
									<v-list-item
										color="primary"
										link
										:to="'/profile' + item.route + '/' + link.link"
										v-for="(link, j) in item.links"
										:key="j"
									>
										<v-list-item-title>{{ link.text }}</v-list-item-title>
									</v-list-item>
								</v-list>
							</v-menu>
						</div>
					</div>
				</div>
			</div>
		</div>
		<v-container fluid>
			<v-row>
				<v-col cols="12" sm="4" md="2">
					<v-list class="sticky-side">
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-account-school</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ $t("student") }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-earth </v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<!-- TODO LANG -->
								<v-list-item-title>curriculum: Egypt</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-book</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-menu
									offset-y
									content-class="menu-offset-class"
									@input="margin = !margin"
								>
									<template v-slot:activator="{ on, attrs }">
										<p
											v-bind="attrs"
											v-on="on"
											:style="margin ? 'padding-bottom : 130px' : ''"
										>
											{{ $t("subject") }} <v-icon>mdi-menu-down</v-icon>
										</p>
									</template>
									<v-list>
										<v-list-item color="primary" link v-for="i in 3" :key="i">
											<v-list-item-title>{{ i }}</v-list-item-title>
										</v-list-item>
									</v-list>
								</v-menu>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-google-classroom</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ $t("grade") }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-account-multiple</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title
									class="pointer"
									@click="$router.push('/profile/friends')"
									>{{ $t("friends") }}</v-list-item-title
								>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-information</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title
									class="pointer"
									@click="$router.push('/profile/aboutMe')"
									>{{ $t("about") }}</v-list-item-title
								>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-monitor-dashboard</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title
									class="pointer"
									@click="$router.push('/profile/dashboard')"
									>{{ $t("Dashboard") }}</v-list-item-title
								>
							</v-list-item-content>
						</v-list-item>
					</v-list>
				</v-col>
				<v-col cols="12" sm="8" md="10">
					<router-view :key="$route.path"></router-view>
				</v-col>
			</v-row>
		</v-container>
	</div>
</template>

<script>
import { mapState } from "vuex";
import DanSelect from "./DanSelect";
export default {
	components: {
		DanSelect,
	},
	computed: {
		...mapState(["user", "userExtras"]),
		items() {
			return [
				{ text: this.$t("posts"), type: "link", route: "/posts" },
				{
					text: this.$t("supportingMaterials"),
					type: "list",
					route: "/supporting-materials",
					links: [
						{ link: "video", text: this.$t("video") },
						{ link: "article", text: this.$t("article") },
					],
				},
				{
					text: this.$t("questions"),
					type: "list",
					route: "/questions",
					links: [
						{ link: "askQuestion", text: this.$t("askQuestion") },
						{ link: "answers", text: this.$t("answers") },
						{ link: "myQuestions", text: this.$t("myQuestions") },
						{ link: "gift", text: this.$t("gift") },
					],
				},
				{
					text: this.$t("exams"),
					type: "list",
					route: "/exams",
					links: [
						{ link: "examRequest", text: this.$t("examRequest") },
						{ link: "exams", text: this.$t("exams") },
						{ link: "myExams", text: this.$t("myExams") },
						{ link: "gift", text: this.$t("gift") },
					],
				},
				{
					text: this.$t("notes"),
					type: "list",
					route: "/notes",
					links: [
						{ link: "noteRequest", text: this.$t("noteRequest") },
						{ link: "notes", text: this.$t("notes") },
						{ link: "myNotes", text: this.$t("myNotes") },
						{ link: "gift", text: this.$t("gift") },
					],
				},
				{
					text: this.$t("vClass"),
					type: "list",
					route: "/vclass",
					nestRoute: true,
					fileMenuItems: [
						{
							name: "single",
							menu: [
								{ link: "createClass", text: this.$t("createClass") },
								{ link: "bookingTeacher", text: this.$t("bookingTeacher") },
								{ link: "bookingConfirmation", text: this.$t("bookingConfirmation") },
								{ link: "bookingClass", text: this.$t("bookingClass") },
								{ link: "myClasses", text: this.$t("myClasses") },
							],
						},
						{ isDivider: true },

						{
							name: "group",
							menu: [
								{ link: "createClass", text: this.$t("createClass") },
								{ link: "invitations", text: this.$t("invitations") },
								{ link: "participants", text: this.$t("participants") },
								{ link: "bookingTeacher", text: this.$t("bookingTeacher") },
								{ link: "bookingConfirmation", text: this.$t("bookingConfirmation") },
								{ link: "bookingClass", text: this.$t("bookingClass") },
								{ link: "myClasses", text: this.$t("myClasses") },
							],
						},
					],
					links: [
						{ link: "createClass", text: this.$t("createClass") },
						{ link: "invitations", text: this.$t("invitations") },
						{ link: "participants", text: this.$t("participants") },
						{ link: "bookingTeacher", text: this.$t("bookingTeacher") },
						{ link: "bookingConfirmation", text: this.$t("bookingConfirmation") },
						{ link: "bookingClass", text: this.$t("bookingClass") },
						{ link: "myClasses", text: this.$t("myClasses") },
					],
				},
				{
					text: this.$t("roomDiscussions"),
					type: "list",
					route: "/roomDiscussions",
					links: [
						{ link: "requestRoom", text: this.$t("requestRoom") },
						{ link: "invitations", text: this.$t("invitations") },
						{ link: "participants", text: this.$t("participants") },
						{ link: "roomCreation", text: this.$t("roomCreation") },
					],
				},
				{
					text: this.$t("calendar"),
					type: "list",
					route: "/calendar",
					links: [
						{ link: "vClass", text: this.$t("vClass") },
						{ link: "roomDiscussions", text: this.$t("roomDiscussions") },
					],
				},
				{
					text: this.$t("preparatoryExams"),
					type: "list",
					route: "/preparatoryExams",
					links: [
						{ link: "term", text: this.$t("term") + "- 1" },
						{ link: "term", text: this.$t("term") + "- 2" },
						{ link: "finalTerm", text: this.$t("finalTerm") },
					],
				},
			];
		},
	},
};
</script>

<style>
.profile-banner {
	position: relative;
	height: 85vh;
	background: #0f2027; /* fallback for old browsers */
	background: -webkit-linear-gradient(
		to top,
		#2c5364,
		#203a43,
		#0f2027
	); /* Chrome 10-25, Safari 5.1-6 */
	background: linear-gradient(
		to top,
		#2c5364,
		#203a43,
		#0f2027
	); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
.user-info {
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -35%);
	text-align: center;
}
.user-info .user-avatar {
	border-radius: 50%;
	width: 199px;
	height: 199px;
	border: 5px solid #f9ba16;
}
.profile-nav {
	width: 99%;
	height: 35px;
	position: absolute;
	top: 100%;
	margin: 0 auto;
	left: 50%;
	transform: translate(-50%, -100%);
	color: white;
	overflow-x: auto;
	overflow-y: hidden;
}
.active-route {
	border-bottom: 5px solid #f9ba16;
}
.sticky-side {
	position: sticky;
	top: 85px;
}
</style>