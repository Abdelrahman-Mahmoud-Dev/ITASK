<template>
	<div>
		<h3 class="primary--text text-capitalize font-weight-bold">
			{{ $t($route.params.action) }}
		</h3>
		<div v-if="$route.params.action === 'createNote'">
			<v-row>
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
					<v-select
						prepend-inner-icon="mdi-book"
						:label="$t('subject')"
						solo
						color="primary"
						:items="displaySubjects"
						item-text="subj"
						item-value="subj"
						v-model="subject"
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
				<v-col cols="12" sm="4">
					<v-text-field
						hide-details
						color="primary"
						prepend-inner-icon="mdi-book-open-blank-variant"
						solo
						v-model="lesson"
						:label="$t('lesson') + '/' + $t('chapter') + '/' + $t('unit')"
					></v-text-field>
				</v-col>
				<v-col cols="12" sm="6" md="5">
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
				<v-col cols="12">
					<v-textarea
						color="primary"
						solo
						:placeholder="$t('teacherMessage')"
						v-model="essay"
						hide-details
					></v-textarea>
				</v-col>

				<v-col v-show="!displayImage" cols="12">
					<v-file-input
						solo
						:label="$t('uploadFile')"
						v-model="image"
					></v-file-input>
				</v-col>
			</v-row>

			<v-img v-if="displayImage" max-height="300" class="mt-5" :src="displayImage">
				<v-btn
					class="ma-2 d-block"
					color="red"
					absolute
					right
					icon
					@click="image = null"
					><v-icon color="red">mdi-close-circle</v-icon></v-btn
				>
			</v-img>

			<v-dialog v-model="submitDialog" width="500">
				<template v-slot:activator="{ on, attrs }">
					<v-btn
						color="primary"
						class="px-15 mt-3 d-block mx-auto"
						large
						elevation="0"
						v-bind="attrs"
						v-on="on"
						>{{ $t("submit") }}</v-btn
					>
				</template>

				<v-card class="pt-5 text-center">
					<!-- <v-icon color="success" size="150" class="mx-auto">mdi-checkbox-marked-circle-outline</v-icon>
                  <h2 class="extra-font text-center mt-5">{{$t('questionPublished')}}</h2> -->
					<v-img
						v-if="$i18n.locale === 'en'"
						class="mx-auto"
						max-width="500"
						src="../../assets/img/msg.jpeg"
					></v-img>
					<v-img
						v-else
						class="mx-auto"
						max-width="500"
						src="../../assets/img/msg(ar).jpeg"
					></v-img>
				</v-card>
			</v-dialog>
		</div>

		<div v-else>
			<v-row >
				<v-col cols="12" sm="12" md="4">
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

			<v-card v-show="!showNote && !showNoteView" class="my-5 pa-5">
				<v-row>
					<v-col cols="12" sm="6" md="6" v-for="item in materials" :key="item.id">
						<v-menu bottom v-if="$route.params.action === 'myNotes'">
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
										<v-dialog v-model="groupsDialog" width="700">
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
							text
							@click="
								$route.params.action === 'myNotes'
									? (showNoteView = true)
									: (showNote = true)
							"
							>{{ item.curriculum }} ,
							{{ $t("grade") + Math.round(Math.random() * 13) }}, {{ item.subj }},
							{{ item.lesson }},</v-btn
						>
						<v-btn text @click="$router.push('/teacher')" class="px-0">{{
							item.teacher
						}}</v-btn>
					</v-col>
				</v-row>
			</v-card>
			<div v-if="showNote" class="mt-5">
				<v-btn @click="showNote = false" text color="primary"
					><v-icon>mdi-keyboard-return</v-icon>{{ $t("return") }}</v-btn
				>
				<note @close="showNote = false" />
			</div>
			<div v-if="showNoteView" class="mt-5">
				<v-btn @click="showNoteView = false" text color="primary"
					><v-icon>mdi-keyboard-return</v-icon>{{ $t("return") }}</v-btn
				>
				<note-view @close="showNoteView = false" />
			</div>
		</div>
	</div>
</template>

<script>
import Note from "../../components/notes/NewNote";
import NoteView from "../../components/notes/AnswerView";
import gradesList from "../../components/static components/gradesList";
import groupsList from "../../components/static components/groupsList";

export default {
	components: {
		Note,
		gradesList,
		groupsList,
		NoteView,
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
						curriculum: "kwait",
					},
					{
						id: 2,
						subj: "Physics",
						lesson: "Atom",
						teacher: "Jane Doe",
						image: "physics.svg",
						curriculum: "Qatar",
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
						curriculum: "Egypt",
					},
					{
						id: 5,
						subj: "Arabic",
						lesson: "Grammar",
						teacher: "John Jacks",
						image: "ar.svg",
						curriculum: "UAE",
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
			essay: "",
			showNote: false,
			showNoteView: false,
			question: "",
			image: null,
			submitDialog: false,
			gradesDialog: false,
			groupsDialog: false,
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
		grades() {
			return [
				this.$t("grade") + " 10",
				this.$t("grade") + " 11",
				this.$t("grade") + " 13",
				this.$t("grade") + " 4",
				this.$t("grade") + " 15",
			];
		},
	},
	created() {
		this.materials = this.displaySubjects;
	},
};
</script>