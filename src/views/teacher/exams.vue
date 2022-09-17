<template>
	<div>
		<h3 class="primary--text text-capitalize font-weight-bold">
			{{ $t($route.params.action) }}
		</h3>

		<div
			v-if="
				$route.params.action === 'createExam' ||
				($route.params.action === 'examRequest' && showExamForm)
			"
		>
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
					<v-text-field
						hide-details
						color="primary"
						prepend-inner-icon="mdi-book-open-blank-variant"
						solo
						v-model="lesson"
						:label="$t('lesson') + '/' + $t('chapter') + '/' + $t('unit')"
					></v-text-field>
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

				<v-col cols="12" sm="6" md="4">
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
				<v-col cols="12" sm="6" md="4">
					<v-text-field
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
					</v-text-field>
				</v-col>
			</v-row>
			<exam-form class="mb-15"></exam-form>
		</div>

		<div v-else>
			<v-row  >
				<v-col cols="12" sm="6" md="4">
					<v-select
						prepend-inner-icon="mdi-google-classroom"
						:label="$t('grade')"
						solo
						color="primary"
						:items="grades"
						v-model="grade"
					>
					</v-select>
					<!-- <v-select
              v-if="!showNote"
              prepend-inner-icon="mdi-book"
              :label="$t('subject')"
              solo
              color="primary"
              :items="displaySubjects"
              item-text="subj"
              item-value="subj"
              v-model="subject"
              hide-details
              >
                  <template v-slot:prepend-item>
                      <v-list-item
                      @click="subject = 'all'"
                      >
                          <v-list-item-content>
                              <v-list-item-title>
                              {{$t('selectAll')}}
                              </v-list-item-title>
                      </v-list-item-content>
                      </v-list-item>
                      <v-divider class="mt-2"></v-divider>
                  </template>
              </v-select> -->
				</v-col>
				<v-col cols="12" sm="6" md="4">
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
				<v-col cols="12" sm="6" md="4">
					<v-select
						prepend-inner-icon="mdi-book"
						:label="$t('select') + ' ' + $t('grade')"
						solo
						color="primary"
						:items="displaySubjects"
						item-text="subj"
						item-value="subj"
						v-model="grade"
						hide-details
					>
					</v-select>
				</v-col>
			</v-row>
			<v-card class="pa-5 my-5" v-if="$route.params.action === 'examRequest'">
				<div
					v-for="(item, i) in displaySubjects"
					:key="item.id"
					class="my-5 d-flex justify-space-between"
				>
					<div>
						<!-- @click="orderDialog = false; showNote = true; currentExam = `${$t('grade') + '10'}, ${item.subj}, ${item.lesson}, ${item.level}, ${item.teacher}`;" -->
						<v-btn large small text elevation="0"
							>{{ item.curriculum }} , {{ $t("grade") + "10" }}, {{ item.subj }},
							{{ item.lesson }}, {{ item.level }},</v-btn
						>
						<v-btn large text class="px-0" @click="$router.push('/teacher')">{{
							item.teacher
						}}</v-btn>
					</div>
					<div class="px-15">
						<v-btn
							elevation="0"
							large
							color="primary"
							class="mx-5 px-15"
							@click="showExamForm = true"
							>{{ $t("accept") }}</v-btn
						>
						<v-btn
							large
							outlined
							color="primary"
							class="px-15"
							@click="displaySubjects.splice(i, 1)"
							>{{ $t("reject") }}</v-btn
						>
					</div>
				</div>
			</v-card>

			<v-card v-if="$route.params.action === 'myExams'">
				<v-row v-show="!showNote" class="my-5">
					<v-col cols="12" sm="6" v-for="item in displaySubjects" :key="item.id">
						<v-menu bottom v-if="$route.params.action === 'myExams'">
							<template v-slot:activator="{ on, attrs }">
								<v-btn color="primary" icon v-bind="attrs" v-on="on">
									<v-icon>mdi-dots-horizontal</v-icon>
								</v-btn>
							</template>

							<v-list>
								<v-list-item>
									<v-list-item-icon
										><v-icon small color="primary"
											>mdi-share-variant</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-dialog v-model="gradesDialog" width="700">
											<template v-slot:activator="{ on, attrs }">
												<v-btn text v-bind="attrs" v-on="on">{{
													$t("shareWithGrade")
												}}</v-btn>
											</template>
											<grades-list />
										</v-dialog>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-icon
										><v-icon small color="primary"
											>mdi-share-variant</v-icon
										></v-list-item-icon
									>
									<v-list-item-content>
										<v-dialog v-model="friendsDialog" width="700">
											<template v-slot:activator="{ on, attrs }">
												<v-btn text v-bind="attrs" v-on="on">{{
													$t("shareInGroups")
												}}</v-btn>
											</template>
											<groups-list type="share" />
										</v-dialog>
									</v-list-item-content>
								</v-list-item>
							</v-list>
						</v-menu>
						<v-btn
							@click="
								orderDialog = false;
								showNote = true;
								currentExam = `${item.subj}, ${item.lesson}, ${item.level}, ${item.teacher}`;
							"
							small
							text
							elevation="0"
						>
							{{ item.curriculum }}, {{ item.subj }}, {{ item.lesson }},
							{{ item.level }},
						</v-btn>
						<v-btn small text class="px-0" @click="$router.push('/teacher')">{{
							item.teacher
						}}</v-btn>
					</v-col>
				</v-row>
			</v-card>
			<div v-if="showNote" class="mt-5">
				<v-btn @click="showNote = false" text color="primary"
					><v-icon>mdi-keyboard-return</v-icon>{{ $t("return") }}</v-btn
				>
				<div class="my-5">
					<p class="secondary--text">
						<v-icon color="secondary">mdi-book-edit-outline</v-icon>
						{{ " " + currentExam }}
					</p>
					<exam @end="endExam"></exam>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState } from "vuex";
import Exam from "../../components/exams/Exam";
import ExamForm from "../../components/exams/ExamForm";
import gradesList from "../../components/static components/gradesList";
import groupsList from "../../components/static components/groupsList";

export default {
	components: {
		Exam,
		ExamForm,
		gradesList,
		groupsList,
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
						curriculum: "Qatar",
					},
					{
						id: 4,
						subj: "Biology",
						lesson: "Cell",
						level: "Easy",
						image: "bio.svg",
						teacher: "Ali Hamza",
						curriculum: "kwait",
					},
					{
						id: 5,
						subj: "Arabic",
						lesson: "Grammar",
						level: "Easy",
						image: "ar.svg",
						teacher: "Sara Zaki",
						curriculum: "UAE",
					},
					{
						id: 1,
						subj: "Math",
						lesson: "Algebra",
						level: "Easy",
						image: "math.svg",
						teacher: "Hossam el-sayed",
						curriculum: "Egypt",
					},
					{
						id: 2,
						subj: "Physics",
						lesson: "Atom",
						level: "Medium",
						image: "physics.svg",
						teacher: "Yara el-sayed",
						curriculum: "kwait",
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
			gradesDialog: false,
			friendsDialog: false,
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