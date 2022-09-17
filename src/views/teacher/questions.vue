<template>
	<div>
		<h3 class="primary--text text-capitalize font-weight-bold">
			{{ $t($route.params.action) }}
		</h3>
		<!-- <v-dialog
            v-model="submitDialog"
            width="500"
            >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn :disabled="!(subject && lesson && teacher && question)" color="primary" class="px-15 d-block mx-auto" large elevation="0" v-bind="attrs" v-on="on">{{$t('submit')}}</v-btn>
                </template>

                <v-card class="pt-5 text-center">
                    <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                    <h2 class="extra-font text-center mt-5">{{$t('questionPublished')}}</h2>
                </v-card>
            </v-dialog> -->

		<div>
			<v-row>
				<v-col cols="12" sm="6" md="4">
					<v-select
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
							<v-list-item @click="subject = 'all'">
								<v-list-item-content>
									<v-list-item-title> Select All </v-list-item-title>
								</v-list-item-content>
							</v-list-item>
							<v-divider class="mt-2"></v-divider>
						</template>
					</v-select>
				</v-col>
				<!-- TODO : LANG -->
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
				<v-col cols="12" sm="6" md="4">
					<v-text-field
						prepend-inner-icon="mdi-book"
						:label="$t('select') + ' ' + $t('Grade')"
						solo
						color="primary"
						:items="displaySubjects"
						item-text="subj"
						item-value="subj"
						v-model="Grade"
						hide-details
					>
			
					</v-text-field>
				</v-col>
			</v-row>
			<v-card v-show="!showNote" class="my-5 pa-5">
				<v-row>
					<v-col cols="12" sm="6" md="6" v-for="item in materials" :key="item.id">
						<v-menu bottom v-if="$route.params.action === 'myQuestions'">
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
							</v-list>
						</v-menu>
						<v-btn text @click="showNote = true"
							>{{ item.curriculum }},
							{{ $t("grade") + Math.round(Math.random() * 13) }}, {{ item.subj }},
							{{ item.lesson }},</v-btn
						>
						<v-btn class="px-0" text @click="$router.push('/teacher')">{{
							item.teacher
						}}</v-btn>
					</v-col>
				</v-row>
			</v-card>
			<div v-if="showNote" class="mt-5">
				<v-btn @click="showNote = false" text color="primary">
					<v-icon>mdi-keyboard-return</v-icon>{{ $t("return") }}</v-btn
				>
				<note @close="showNote = false" />
			</div>
		</div>
	</div>
</template>

<script>
import Note from "../../components/notes/AnswerView";
import groupsList from "../../components/static components/groupsList";
import gradesList from "../../components/static components/gradesList";

export default {
	components: {
		Note,
		groupsList,
		gradesList,
	},
	data() {
		return {
			notes: {
				en: [
					{
						id: 1,
						subj: "Math",
						lesson: "Algebra",
						teacher: "John Doe",
						image: "math.svg",
						curriculum: "UAE",
					},
					{
						id: 2,
						subj: "Physics",
						lesson: "Atom",
						teacher: "Jane Doe",
						image: "physics.svg",
						curriculum: "Egypt",
					},
					{
						id: 3,
						subj: "Chemistery",
						lesson: "Neutron",
						teacher: "Aly Anniston",
						image: "chem.svg",
						curriculum: "kwait",
					},
					{
						id: 4,
						subj: "Biology",
						lesson: "Cell",
						teacher: "Jaimy Doe",
						image: "bio.svg",
						curriculum: "Qatar",
					},
					{
						id: 5,
						subj: "Arabic",
						lesson: "Grammar",
						teacher: "John Jacks",
						image: "ar.svg",
						curriculum: "kwait",
					},
				],
				ar: [
					{
						id: 1,
						subj: "رياضيات",
						lesson: "الجبر",
						teacher: "محمد علي",
						image: "math.svg",
					},
					{
						id: 2,
						subj: "فيزياء",
						lesson: "الذرة",
						teacher: "إيناس أحمد",
						image: "physics.svg",
					},
					{
						id: 3,
						subj: "كيمياء",
						lesson: "النيوترون",
						teacher: "ماكس ملنر",
						image: "chem.svg",
					},
					{
						id: 4,
						subj: "أحياء",
						lesson: "الخلية",
						teacher: "محمد علي",
						image: "bio.svg",
					},
					{
						id: 5,
						subj: "لغة عربية",
						lesson: "نحو",
						teacher: "إيناس أحمد",
						image: "ar.svg",
					},
				],
			},
			subject: "",
			materials: [],
			teacher: "",
			lesson: "",
			showNote: false,
			question: "",
			image: null,
			submitDialog: false,
			gradesDialog: false,
			Curriculum: "",
			Grade : ''
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
	},
	computed: {
		displayImage() {
			return this.image ? URL.createObjectURL(this.image) : null;
		},
		displaySubjects() {
			if (this.$i18n.locale === "en") return this.notes.en;
			else return this.notes.ar;
		},
	},
	created() {
		this.materials = this.displaySubjects;
	},
};
</script>