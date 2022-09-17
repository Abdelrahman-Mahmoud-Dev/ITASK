import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/chat/:id",
		name: "chat",
		component: () =>
			import(/* webpackChunkName: "chat_view" */ "../views/ChatView.vue"),
	},
	{
		path: "/chat/share",
		name: "chatting",
		component: () =>
			import(/* webpackChunkName: "chat_view" */ "../views/ChatView.vue"),
	},
	{
		path: "/reels",
		name: "reels",
		component: () =>
			import(/* webpackChunkName: "chat_view" */ "../views/reels/Reels.vue"),
	},

	// groups
	{
		path: "/groups",
		name: "groups",
		component: () =>
			import(/* webpackChunkName: "chat_view" */ "../views/groups/groups.vue"),
	},
	{
		path: "/groups/discover",
		name: "dicoverGroups",
		component: () =>
			import(/* webpackChunkName: "chat_view" */ "../views/groups/discover.vue"),
	},
	{
		path: "/groups/create",
		name: "createGroups",
		component: () =>
			import(/* webpackChunkName: "chat_view" */ "../views/groups/create.vue"),
	},
	{
		path: "/groups/:id",
		name: "group",
		component: () =>
			import(/* webpackChunkName: "chat_view" */ "../views/groups/group.vue"),
	},

	// auth
	{
		path: "/auth",
		component: () =>
			import(/* webpackChunkName: "auth_main" */ "../views/auth/main.vue"),
		children: [
			// main sub route
			{
				path: "",
				component: () =>
					import(/* webpackChunkName: "auth" */ "../views/auth/Login.vue"),
			},
			// other subroutes
			{
				path: "login",
				name: "login",
				component: () =>
					import(/* webpackChunkName: "auth_login" */ "../views/auth/Login.vue"),
			},
			{
				path: "register",
				name: "register",
				component: () =>
					import(/* webpackChunkName: "auth_reg" */ "../views/auth/Register.vue"),
			},
			{
				path: "registeration/complete",
				name: "continueRegisteration",
				component: () =>
					import(
						/* webpackChunkName: "auth_cont" */ "../views/auth/ContinueRegister.vue"
					),
			},
			// {
			//   path: 'forgot-password',
			//   name: 'forgotPassword',
			//   component: () => import(/* webpackChunkName: "auth_forgot" */ '../components/auth/forgotPass.vue')
			// },
			// {
			//   path: 'verify',
			//   name: 'verify',
			//   component: () => import(/* webpackChunkName: "auth_ver" */ '../components/auth/verify.vue')
			// }
		],
	},

	// profile
	{
		path: "/profile",
		component: () =>
			import(/* webpackChunkName: "auth_main" */ "../views/profile/main.vue"),
		children: [
			// main sub route
			{
				path: "",
				component: () =>
					import(/* webpackChunkName: "auth" */ "../views/profile/posts.vue"),
			},
			{
				path: "posts",
				name: "profilePosts",
				component: () =>
					import(
						/* webpackChunkName: "profilePosts" */ "../views/profile/posts.vue"
					),
			},
			{
				path: "supporting-materials/:action",
				name: "supportingMaterials",
				component: () =>
					import(
						/* webpackChunkName: "supportingMaterials" */ "../views/profile/supportingMaterials.vue"
					),
			},
			{
				path: "questions/:action",
				name: "questions",
				component: () =>
					import(
						/* webpackChunkName: "questions" */ "../views/profile/questions.vue"
					),
			},
			{
				path: "exams/:action",
				name: "profileExams",
				component: () =>
					import(/* webpackChunkName: "exams" */ "../views/profile/exams.vue"),
			},
			{
				path: "notes/:action",
				name: "profileNotes",
				component: () =>
					import(/* webpackChunkName: "notes" */ "../views/profile/notes.vue"),
			},
			{
				path: "vclass/:action",
				name: "vclass",
				component: () =>
					import(/* webpackChunkName: "vclass" */ "../views/profile/vClass.vue"),
			},
			{
				path: "roomDiscussions/:action",
				name: "roomDiscussions",
				component: () =>
					import(
						/* webpackChunkName: "roomDiscussions" */ "../views/profile/roomDiscussions.vue"
					),
			},
			{
				path: "preparatoryExams/:action",
				name: "preparatoryExams",
				component: () =>
					import(
						/* webpackChunkName: "preparatoryExams" */ "../views/profile/preparatoryExams.vue"
					),
			},
			{
				path: "calendar/:action",
				name: "calendar",
				component: () =>
					import(/* webpackChunkName: "calendar" */ "../views/profile/calendar.vue"),
			},
			{
				path: "settings",
				name: "settings",
				component: () =>
					import(/* webpackChunkName: "calendar" */ "../views/profile/settings.vue"),
			},
			{
				path: "friends",
				name: "friends",
				component: () =>
					import(/* webpackChunkName: "calendar" */ "../views/profile/friends.vue"),
			},
			{
				path: "aboutMe",
				name: "aboutMe",
				component: () =>
					import(/* webpackChunkName: "calendar" */ "../views/profile/aboutMe.vue"),
			},
			{
				path: "dashboard",
				name: "dashboard",
				component: () =>
					import(
						/* webpackChunkName: "calendar" */ "../views/profile/dashboard.vue"
					),
			},
		],
	},

	// teacher profile
	{
		path: "/teacher",
		component: () =>
			import(/* webpackChunkName: "auth_main" */ "../views/teacher/main.vue"),
		children: [
			// main sub route
			{
				path: "",
				component: () =>
					import(/* webpackChunkName: "auth" */ "../views/teacher/posts.vue"),
			},
			{
				path: "posts",
				name: "teacherPosts",
				component: () =>
					import(
						/* webpackChunkName: "teacherPosts" */ "../views/teacher/posts.vue"
					),
			},
			{
				path: "supporting-materials/:action",
				name: "teacherSupportingMaterials",
				component: () =>
					import(
						/* webpackChunkName: "supportingMaterials" */ "../views/teacher/supportingMaterials.vue"
					),
			},
			{
				path: "questions/:action",
				name: "teacherQuestions",
				component: () =>
					import(
						/* webpackChunkName: "questions" */ "../views/teacher/questions.vue"
					),
			},
			{
				path: "exams/:action",
				name: "teacherExams",
				component: () =>
					import(/* webpackChunkName: "exams" */ "../views/teacher/exams.vue"),
			},
			{
				path: "notes/:action",
				name: "teacherNotes",
				component: () =>
					import(/* webpackChunkName: "notes" */ "../views/teacher/notes.vue"),
			},
			{
				path: "vclass/:action",
				name: "teacherVclass",
				component: () =>
					import(/* webpackChunkName: "vclass" */ "../views/teacher/vClass.vue"),
			},
			{
				path: "roomDiscussions/:action",
				name: "teacherRoomDiscussions",
				component: () =>
					import(
						/* webpackChunkName: "roomDiscussions" */ "../views/teacher/roomDiscussions.vue"
					),
			},
			{
				path: "preparatoryExams/:action",
				name: "teacherPreparatoryExams",
				component: () =>
					import(
						/* webpackChunkName: "preparatoryExams" */ "../views/teacher/preparatoryExams.vue"
					),
			},
			{
				path: "calendar/:action",
				name: "teacherCalendar",
				component: () =>
					import(/* webpackChunkName: "calendar" */ "../views/teacher/calendar.vue"),
			},
			{
				path: "resume",
				name: "teacherResume",
				component: () =>
					import(/* webpackChunkName: "resume" */ "../views/teacher/resume.vue"),
			},
			{
				path: "settings",
				name: "teacherSettings",
				component: () =>
					import(/* webpackChunkName: "calendar" */ "../views/profile/settings.vue"),
			},
		],
	},

	// friends
	{
		path: "/friends-requests",
		name: "friendsRequests",
		component: () =>
			import(
				/* webpackChunkName: "friends_main" */ "../views/friends/friendsRequests.vue"
			),
	},

	// notes
	{
		path: "/notes",
		name: "notes",
		component: () =>
			import(/* webpackChunkName: "friends_main" */ "../views/notes/NewNotes.vue"),
	},
	{
		path: "/new-notes",
		name: "newNotes",
		component: () =>
			import(/* webpackChunkName: "friends_main" */ "../views/notes/NewNotes.vue"),
	},
	{
		path: "/note/:id",
		name: "noteView",
		component: () =>
			import(/* webpackChunkName: "friends_main" */ "../views/notes/NoteView.vue"),
	},

	// exams
	{
		path: "/exams",
		name: "exams",
		component: () =>
			import(/* webpackChunkName: "friends_main" */ "../views/exams/NewExams.vue"),
	},
	{
		path: "/new-exams",
		name: "newExams",
		component: () =>
			import(/* webpackChunkName: "friends_main" */ "../views/exams/NewExams.vue"),
	},
	{
		path: "/exam/:id",
		name: "examView",
		component: () =>
			import(/* webpackChunkName: "friends_main" */ "../views/exams/ExamView.vue"),
	},

	// teachers
	{
		path: "/teachers/:type",
		name: "teachers",
		component: () =>
			import(
				/* webpackChunkName: "friends_main" */ "../views/teachers/teachersList.vue"
			),
	},

	// stories
	{
		path: "/stories/:type",
		name: "stories",
		component: () =>
			import(
				/* webpackChunkName: "friends_main" */ "../views/stories/storyBoard.vue"
			),
	},
	{
		path: "/addStory",
		name: "addStory",
		component: () =>
			import(
				/* webpackChunkName: "friends_main" */ "../views/stories/addStory.vue"
			),
	},
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('authenticated') === 'true') {
    next()
  } else {
    if (to.path.includes('/auth')) {
      next()
    } else {
      next('/auth')
    }
  }
})

export default router
