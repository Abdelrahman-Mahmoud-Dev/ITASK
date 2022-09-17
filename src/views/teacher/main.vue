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
						@click="$router.push('/teacher/settings')"
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
						>
							{{ item.text }}
						</router-link>
						<div
							v-else
							:class="$route.path.includes(item.route) ? 'active-route' : ''"
						>
							<v-menu offset-y>
								<template v-slot:activator="{ on, attrs }">
									<v-btn
										small
										color="white"
										class="font-weight-bold"
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
										:to="'/teacher' + item.route + '/' + link.link"
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
					<v-list class="sticky-side secondary--text">
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-account-school</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ $t("teacher") }}</v-list-item-title>
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
											{{ $t("grande") }} <v-icon>mdi-menu-down</v-icon>
										</p>
									</template>
									<v-list>
										<v-list-item color="primary" link v-for="i in grades" :key="i">
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
								<v-list-item-title
									>{{ $t("grade") }} 2nd {{ $t("secondary") }}</v-list-item-title
								>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-information</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ $t("cerificate") }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-clipboard-text-clock</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ $t("yearsOfExperience") }} 3</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item @click="$router.push('/teacher/resume')">
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-file-account</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ $t("myResume") }}</v-list-item-title>
							</v-list-item-content>
						</v-list-item>
						<v-list-item>
							<v-list-item-icon>
								<v-icon color="primary" class="">mdi-account-multiple</v-icon>
							</v-list-item-icon>
							<v-list-item-content>
								<v-list-item-title>{{ $t("friends") }} (110)</v-list-item-title>
							</v-list-item-content>
						</v-list-item>

						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>{{ $t("examsRating") }}</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-rating
									background-color="grey lighten-2"
									color="warning"
									empty-icon="mdi-star-outline"
									full-icon="mdi-star"
									hover
									length="5"
									readonly
									size="15"
									:value="4"
									dense
								></v-rating>
							</v-list-item-action>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>{{ $t("notesRating") }}</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-rating
									background-color="grey lighten-2"
									color="warning"
									empty-icon="mdi-star-outline"
									full-icon="mdi-star"
									hover
									length="5"
									readonly
									size="15"
									:value="4"
									dense
								></v-rating>
							</v-list-item-action>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>{{ $t("questionsRating") }}</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-rating
									background-color="grey lighten-2"
									color="warning"
									empty-icon="mdi-star-outline"
									full-icon="mdi-star"
									hover
									length="5"
									readonly
									size="15"
									:value="4"
									dense
								></v-rating>
							</v-list-item-action>
						</v-list-item>
						<v-list-item>
							<v-list-item-content>
								<v-list-item-title>{{ $t("totalRating") }}</v-list-item-title>
							</v-list-item-content>
							<v-list-item-action>
								<v-rating
									background-color="grey lighten-2"
									color="warning"
									empty-icon="mdi-star-outline"
									full-icon="mdi-star"
									hover
									length="5"
									readonly
									size="15"
									:value="4"
									dense
								></v-rating>
							</v-list-item-action>
						</v-list-item>

						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									>{{ $t("grade") }} 10, 1500 {{ $t("students") }}</v-list-item-title
								>
							</v-list-item-content>
						</v-list-item>

						<v-list-item>
							<v-list-item-content>
								<v-list-item-title
									>{{ $t("grade") }} 11, 1750 {{ $t("students") }}</v-list-item-title
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

export default {
    data() {
        return {
            grades: [
                "6",
                "5",
                "11"
            ],
            subject: [
                'Math',
                'English'
            ]
        }
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
						{ link: "newRequests", text: this.$t("newRequests") },
						{ link: "myQuestions", text: this.$t("myQuestions") },
					],
				},
				{
					text: this.$t("exams"),
					type: "list",
					route: "/exams",
					links: [
						{ link: "examRequest", text: this.$t("examRequest") },
						{ link: "createExam", text: this.$t("createExam") },
						{ link: "myExams", text: this.$t("myExams") },
					],
				},
				{
					text: this.$t("notes"),
					type: "list",
					route: "/notes",
					links: [
						{ link: "newRequests", text: this.$t("newRequests") },
						{ link: "myNotes", text: this.$t("myNotes") },
						{ link: "createNote", text: this.$t("createNote") },
					],
				},
				{
					text: this.$t("vClass"),
					type: "list",
					route: "/vclass",
					links: [
						{ link: "newRequests", text: this.$t("newRequests") },
						{ link: "createClass", text: this.$t("createClass") },
						// { link: 'invitations', text: this.$t('invitations') },
						{ link: "participants", text: this.$t("participants") },
						// { link: 'bookingTeacher', text: this.$t('bookingTeacher') },
						// { link: 'bookingConfirmation', text: this.$t('bookingConfirmation') },
						{ link: "bookingClass", text: this.$t("bookingClass") },
						{ link: "myClasses", text: this.$t("myClasses") },
					],
				},
				// {
				//   text: this.$t('roomDiscussions'),
				//   type: 'list',
				//   route: '/roomDiscussions',
				//   links: [
				//     { link: 'requestRoom', text: this.$t('requestRoom') },
				//     { link: 'invitations', text: this.$t('invitations') },
				//     { link: 'participants', text: this.$t('participants') },
				//     { link: 'roomCreation', text: this.$t('roomCreation') }
				//   ]
				// },
				{
					text: this.$t("calendar"),
					type: "list",
					route: "/calendar",

					links: [{ link: "myEvents", text: this.$t("myEvents") }],
				},
				{
					text: this.$t("preparatoryExams"),
					type: "list",
					route: "/preparatoryExams",
					links: [{ link: "createExam", text: this.$t("createExam") }],
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