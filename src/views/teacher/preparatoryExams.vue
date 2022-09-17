<template>
	<v-container>
		<h3 class="primary--text text-capitalize font-weight-bold">
			{{ $t($route.params.action) }}
		</h3>

		<v-row v-if="$route.params.action === 'createExam'">
			<v-col cols="12" sm="6">
				<v-text-field
					solo
					readonly
					prepend-inner-icon="mdi-book"
					:value="displaySubjects[0].subj"
				></v-text-field>
			</v-col>

			<v-col cols="12" sm="6">
				<v-select
					:items="[$t('term1'), $t('term2'), $t('term3')]"
					solo
					:label="$t('term')"
				></v-select>
			</v-col>

			<v-col cols="12" sm="6">
				<v-text-field
					hide-details
					:prefix="$t('questions') + ':'"
					class="mt-1"
					solo
					:label="$t('questions')"
					type="number"
					min="1"
					v-model="questionsNumber"
				></v-text-field>
			</v-col>

			<v-col cols="12" sm="6">
				<v-select
					v-model="level"
					prepend-inner-icon="mdi-ab-testing"
					solo
					:label="$t('difficulty')"
					hide-details
					:items="displayExams"
					item-text="level"
					item-value="level"
				></v-select>
			</v-col>

			<v-col cols="12" sm="6">
				<v-menu
					v-model="timeMenu"
					:close-on-content-click="false"
					:nudge-right="40"
					transition="scale-transition"
					offset-y
					min-width="auto"
					ref="timeMenu"
				>
					<template v-slot:activator="{ on, attrs }">
						<v-text-field
							v-model="time"
							solo
							color="primary"
							:label="$t('examTime')"
							prep-inner-icon="mdi-clock"
							readonly
							v-bind="attrs"
							v-on="on"
							hide-details
						></v-text-field>
					</template>
					<v-time-picker
						v-if="timeMenu"
						v-model="time"
						@click:minute="$refs.timeMenu.save(time)"
						scrollable
						ampm-in-title
						format="ampm"
					></v-time-picker>
				</v-menu>
			</v-col>

			<v-col cols="12" sm="6">
				<v-select
					prepend-inner-icon="mdi-google-classroom"
					:label="$t('grade')"
					solo
					color="primary"
					:items="grades"
					v-model="grade"
				>
				</v-select>
			</v-col>
			<v-col cols="12" sm="6">
				<v-select
					prepend-inner-icon="mdi-book"
					:label="$t('select') + ' ' + 'Curriculum '"
					solo
					color="primary"
					:items="displaySubjects"
					item-text="subj"
					item-value="subj"
					v-model="Curriculum"
					hide-details
				>
				</v-select>
			</v-col>
		</v-row>
		<exam-form class="mb-15"></exam-form>
	</v-container>
</template>

<script>
import { mapState } from "vuex";
import ExamForm from "../../components/exams/ExamForm";

export default {
	components: {
		ExamForm,
	},
	data() {
		return {
			exams: {
				en: [
					{
						id: 3,
						subj: "Chemistery",
						lesson: "Neutron",
						level: "Difficult",
						image: "chem.svg",
						teacher: "Aly Smith",
					},
					{
						id: 4,
						subj: "Biology",
						lesson: "Cell",
						level: "Easy",
						image: "bio.svg",
						teacher: "Ali Hamza",
					},
					{
						id: 5,
						subj: "Arabic",
						lesson: "Grammar",
						level: "Easy",
						image: "ar.svg",
						teacher: "Sara Zaki",
					},
					{
						id: 1,
						subj: "Math",
						lesson: "Algebra",
						level: "Easy",
						image: "math.svg",
						teacher: "Hossam el-sayed",
					},
					{
						id: 2,
						subj: "Physics",
						lesson: "Atom",
						level: "Medium",
						image: "physics.svg",
						teacher: "Yara el-sayed",
					},
				],
				ar: [
					{
						id: 3,
						subj: "كيمياء",
						lesson: "النيوترون",
						level: "متوسط",
						image: "chem.svg",
						teacher: "آلي سميث",
					},
					{
						id: 4,
						subj: "أحياء",
						lesson: "الخلايا",
						level: "صعب",
						image: "bio.svg",
						teacher: "علي حمزة",
					},
					{
						id: 5,
						subj: "العربية",
						lesson: "النحو",
						level: "سهل",
						image: "ar.svg",
						teacher: "سارا زاكي",
					},
					{
						id: 1,
						subj: "رياضيات",
						lesson: "الجبر",
						level: "سهل",
						image: "math.svg",
						teacher: "حسام السيد",
					},
					{
						id: 2,
						subj: "فيزياء",
						lesson: "الذرة",
						level: "صعب",
						image: "physics.svg",
						teacher: "يارا السيد",
					},
				],
			},
			currentExam: "",
			subject: "",
			materials: [],
			teacher: "",
			lesson: "",
			showNote: false,
			submitDialog: false,
			orderDialog: "",
			dateMenu: false,
			date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
				.toISOString()
				.substr(0, 10),
			level: "",
			questionsNumber: 1,
			timeMenu: false,
			time: "",
			grade: "",
			showExamForm: false,
		};
	},
	watch: {
		subject(val) {
			if (val) {
				if (val === "all") {
					this.materials = this.displaySubjects;
				} else {
					this.materials = this.displaySubjects.filter((item) => item.subj === val);
				}
				this.showNote = false;
			}
		},
		invitation(val) {
			if (val === "friends") this.invitationDialog = true;
			else this.invitationDialog = false;
		},
		searchTerm(val) {
			this.friends = this.users.filter((item) =>
				item.name.toLowerCase().includes(val.toLowerCase())
			);
		},
	},
	computed: {
		...mapState(["users"]),
		grades() {
			return [
				this.$t("grade") + " 10",
				this.$t("grade") + " 11",
				this.$t("grade") + " 13",
				this.$t("grade") + " 4",
				this.$t("grade") + " 15",
			];
		},
		// friends () {
		//   if (this.searchTerm) {
		//     return this.users.filter(item => item.name.toLowerCase().includes(this.searchTerm.toLowerCase()))
		//   } else {
		//     return this.users
		//   }
		// },
		displayImage() {
			return this.image ? URL.createObjectURL(this.image) : null;
		},
		displaySubjects() {
			if (this.$i18n.locale === "en") return this.exams.en;
			else return this.exams.ar;
		},
		displayExams() {
			if (this.$i18n.locale === "en") return this.exams.en;
			else return this.exams.ar;
		},
		start() {
			const today = new Date();
			return new Date(today.setDate(today.getDay() - 1));
		},
		randomTime() {
			return new Date(
				this.start.getTime() +
					Math.random() * (new Date().getTime() - this.start.getTime())
			);
		},
	},
	methods: {
		endExam() {
			this.showNote = false;
		},
	},
	created() {
		this.materials = this.displaySubjects;
		this.friends = this.users;
	},
};
</script>