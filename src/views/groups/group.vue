<template>
	<v-container fluid>
		<v-row v-if="group && users.length">
			<v-col cols="12" sm="4" md="3">
				<v-card elevation="0" class="pa-3">
					<div class="d-flex align-center">
						<v-avatar size="65" tile>
							<img class="rounded" :src="group.cover" />
						</v-avatar>
						<div>
							<span class="mx-2">{{ group.name }}</span>
							<br />
							<span class="mx-2"
								><v-icon color="primary" small>{{
									group.privacy === "public" ? "mdi-earth" : "mdi-lock"
								}}</v-icon
								>{{ privacies.find((item) => item.value === group.privacy).text }}</span
							>
						</div>
					</div>
					<v-divider class="my-5"></v-divider>
					<v-list>
						<v-list-item class="grey lighten-3">
							<v-list-item-icon
								><v-icon color="primary">mdi-home</v-icon></v-list-item-icon
							>
							<v-list-item-title>{{ $t("home") }}</v-list-item-title>
						</v-list-item>

						<v-list-item>
							<v-list-item-icon
								><v-icon color="primary">mdi-layers</v-icon></v-list-item-icon
							>
							<v-list-item-title>{{ $t("about") }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-card>
			</v-col>
			<v-col cols="12" sm="8" md="9">
				<v-card elevation="0" class="pa-3 mb-10">
					<v-img
						class="rounded"
						:height="$vuetify.breakpoint.mdAndUp ? 500 : 300"
						:src="group.cover || images[0].url"
					>
						<v-btn
							v-if="group.admin === user"
							@click="openImgUploader"
							elevation="0"
							absolute
							bottom
							right
							large
							color="primary"
							><v-icon>mdi-image</v-icon> {{ $t("edit") }}</v-btn
						>
						<input
							ref="uploader"
							class="d-none"
							type="file"
							accept="image/*"
							@change="onFileChanged"
						/>
					</v-img>
					<h3
						class="my-5"
						style="display: flex; align-items: center"
						v-if="!showEditName"
					>
						<span>
							{{ group.name || groupName || $t("name") }}
						</span>
						<span class="ml-3 pb-3">
							<v-icon color="primary" class="pointer" @click="showEditName = true"
								>mdi-pencil</v-icon
							>
						</span>
					</h3>
					<v-text-field
						v-else
						dense
						class="mt-5"
						hide-details
						color="primary"
						prepend-inner-icon="mdi-pencil"
						:placeholder="$t('groupName')"
						solo
						v-model="groupName"
						@keydown.native.enter="SumbitGroupName"
					></v-text-field>

					<!-- Avatar Group -->
					<section class="avatars-group pa-3 stacked">
						<div
							v-for="avatar in avatarsSorted"
							:key="`avatar-id-${avatar.id}`"
							class="avatars-group__item"
						>
							<v-tooltip bottom>
								<profile-avatar :avatar="avatar" slot="activator"> </profile-avatar>
							</v-tooltip>
						</div>
					</section>
					<!--  -->

					<h4 class="my-5">
						<v-icon color="primary">{{
							group.privacy === "public" ? "mdi-earth" : "mdi-lock"
						}}</v-icon>
						{{ group.privacy === "public" ? $t("public") : $t("private") }},
						{{ $t("members") + " " + group.members.length }}
					</h4>
					<div class="d-flex justify-space-between">
						<div>
							<v-avatar
								style="border-radius: 50%; border: 2px solid #f9ba16"
								v-for="item in group.members"
								:key="item.id"
								size="45"
							>
								<img class="rounded" :src="item.avatar" />
							</v-avatar>
						</div>
						<div>
							<v-btn
								outlined
								color="primary"
								class="mx-2 px-15"
								large
								@click="tab = 3"
								>{{ $t("joined") }}</v-btn
							>
							<v-btn
								color="primary"
								elevation="0"
								large
								class="px-10"
								@click="invitationDialog = true"
								><v-icon>mdi-plus</v-icon>{{ $t("inviteFriends") }}</v-btn
							>
						</div>
					</div>
					<v-divider class="my-5"></v-divider>
					<v-tabs v-model="tab" align-with-title>
						<v-tabs-slider color="primary"></v-tabs-slider>

						<v-tab>
							{{ $t("about") }}
						</v-tab>
						<v-tab>
							{{ $t("discussions") }}
						</v-tab>
						<v-tab>
							{{ $t("topics") }}
						</v-tab>
						<v-tab>
							{{ $t("members") }}
						</v-tab>
						<v-tab disabled>
							{{ $t("events") }}
						</v-tab>
						<v-tab>
							{{ $t("media") }}
						</v-tab>
					</v-tabs>

					<v-tabs-items v-model="tab">
						<v-tab-item>
							<v-card
								width="70%"
								class="pa-5 ma-5 mx-auto"
								elevation="0"
								color="grey lighten-3"
							>
								<v-card-title>{{ $t("about") }}</v-card-title>
								<v-card-text>
									<h4 class="my-5">
										<v-icon color="primary">{{
											group.privacy === "public" ? "mdi-earth" : "mdi-lock"
										}}</v-icon>
										{{ group.privacy === "public" ? $t("public") : $t("private") }}
									</h4>
									<p>
										{{
											group.privacy === "public"
												? $t("groupNotePublic")
												: $t("groupNotePrivate")
										}}
									</p>
									<p>{{ group.description }}</p>
									<v-icon color="primary">mdi-eye</v-icon>
									<span>{{ $t("visible") }}</span>
									<p>{{ $t("visibleNote") }}</p>
									<v-icon color="primary">mdi-timer</v-icon>
									<span>{{ $t("history") }}</span>
									<p>{{ $t("historyNote") }}</p>
								</v-card-text>
							</v-card>

							<v-card
								width="70%"
								class="pa-5 ma-5 mx-auto"
								elevation="0"
								color="grey lighten-3"
							>
								<v-card-title
									>{{ $t("members") }} . {{ group.members.length }}</v-card-title
								>
								<v-card-text>
									<v-avatar v-if="group.members.length" size="50">
										<img :src="group.members[2].avatar" />
									</v-avatar>
									<h4 class="my-3" v-if="group.members.length">
										{{ group.members[2].name }} - {{ $t("members") }}
									</h4>

									<v-avatar v-if="group.admins.length" size="50">
										<img :src="group.admins[0].avatar" />
									</v-avatar>
									<h4 v-if="group.admins.length" class="my-3">
										{{ group.admins[0].name }} - {{ $t("admin") }}
									</h4>
								</v-card-text>
								<v-card-actions>
									<v-btn color="primary" block elevation="0" @click="tab = 3">{{
										$t("seeAll")
									}}</v-btn>
								</v-card-actions>
							</v-card>

							<v-card
								width="70%"
								class="pa-5 ma-5 mx-auto"
								elevation="0"
								color="grey lighten-3"
							>
								<v-card-title>{{ $t("activity") }}</v-card-title>
								<v-card-text>
									<v-icon color="primary">mdi-note-text</v-icon>
									<span>{{ $t("noActivity") }}</span>
									<p>{{ $t("noActivityNote") }}</p>
									<v-icon color="primary">mdi-account-multiple</v-icon>
									<span>{{ group.members.length }} {{ $t("members") }}</span>
									<p>{{ $t("membersNote") }}</p>
									<v-icon color="primary">mdi-timer</v-icon>
									<span>{{ $t("historyNote") }}</span>
								</v-card-text>
							</v-card>
						</v-tab-item>
						<v-tab-item>
							<v-divider></v-divider>
							<v-row>
								<v-col cols="12" md="8">
									<v-sheet
										v-show="!showPostForm"
										@click="showPostForm = true"
										rounded="lg"
										class="mt-3"
									>
										<post-form />
									</v-sheet>
									<v-divider class="mt-5"></v-divider>

									<v-sheet
										style="position: relative"
										v-show="showPostForm"
										rounded="lg"
										class="my-5 pa-5"
									>
										<post-form-card @closeForm="showPostForm = false" />
									</v-sheet>

									<!-- posts -->
									<v-sheet
										v-show="!showPostForm && posts.length"
										class="mt-3 scrollable-sheet"
										height="65vh"
									>
										<post v-for="item in posts" :key="item.id" :post="item" />
									</v-sheet>
								</v-col>
								<v-col cols="12" md="4">
									<v-card
										elevation="0"
										v-if="showCard && group.admin === user"
										color="grey lighten-3 pa-3"
									>
										<v-card-title class="d-flex justify-space-between">
											{{ $t("continueGroup") }}
											<v-btn icon color="primary" @click="showCard = false">
												<v-icon>mdi-close</v-icon>
											</v-btn>
										</v-card-title>
										<h4>{{ $t("continueGroupNote") }}</h4>
										<p>{{ $t("customizeGroupNote") }}</p>
										<v-divider></v-divider>
										<v-card-text>
											<v-list class="grey lighten-3">
												<v-list-item class="grey lighten-3">
													<v-list-item-icon
														><v-icon color="primary"
															>mdi-account-multiple</v-icon
														></v-list-item-icon
													>
													<v-list-item-title>{{ $t("inviteFriends") }}</v-list-item-title>
												</v-list-item>

												<v-list-item class="grey lighten-3">
													<v-list-item-icon
														><v-icon color="primary">mdi-note</v-icon></v-list-item-icon
													>
													<v-list-item-title>{{ $t("createPost") }}</v-list-item-title>
												</v-list-item>
											</v-list>
										</v-card-text>
									</v-card>

									<v-card class="pa-5 ma-5 mx-auto" elevation="0" color="grey lighten-3">
										<v-card-title>{{ $t("about") }}</v-card-title>
										<v-card-text>
											<h4 class="my-5">
												<v-icon color="primary">{{
													group.privacy === "public" ? "mdi-earth" : "mdi-lock"
												}}</v-icon>
												{{ group.privacy === "public" ? $t("public") : $t("private") }}
											</h4>
											<p>
												{{
													group.privacy === "public"
														? $t("groupNotePublic")
														: $t("groupNotePrivate")
												}}
											</p>
											<p>{{ group.description }}</p>
											<v-icon color="primary">mdi-eye</v-icon>
											<span>{{ $t("visible") }}</span>
											<p>{{ $t("visibleNote") }}</p>
											<v-icon color="primary">mdi-timer</v-icon>
											<span>{{ $t("history") }}</span>
											<p>{{ $t("historyNote") }}</p>
										</v-card-text>
									</v-card>
								</v-col>
							</v-row>
							<!-- post form container -->
						</v-tab-item>
						<v-tab-item>
							<h3 class="text-center mt-10 mb-5">
								{{ $t("noTopics") }} <v-icon color="primary">mdi-alert</v-icon>
							</h3>
							<p class="text-center">{{ $t("noTopicsNote") }}</p>
						</v-tab-item>
						<v-tab-item>
							<v-row>
								<v-col cols="12" md="9">
									<v-card class="pa-5" elevation="0" color="grey lighten-3">
										<v-card-title
											>{{ $t("members") }} . {{ group.members.length }}</v-card-title
										>
										<v-card-text>
											<v-text-field
												dense
												class="mt-5"
												hide-details
												color="primary"
												prepend-inner-icon="mdi-magnify"
												:placeholder="$t('search')"
												solo
											></v-text-field>
											<v-divider class="my-5"></v-divider>
											<h3 v-if="group.admins.length" class="my-3">
												{{ $t("adminTitle") }}
											</h3>
											<div v-for="item in group.admins" :key="item.id">
												<v-avatar @click="$router.push('/teacher')" size="50">
													<img :src="item.avatar" />
												</v-avatar>
												<span class="mx-3"
													><strong>{{ item.name }}</strong></span
												><br />
												<span class="mx-15">Lorem ipsum dolor sit amet, consectetur</span>
											</div>
											<p class="text-center">{{ $t("adminNote") }}</p>
											<v-btn
												v-if="group.admin === user"
												class="d-block mx-auto"
												color="primary"
												@click="
													invitationAdminDialog = true;
													invitationDialog = true;
												"
												>{{ $t("inviteAdmins") }}</v-btn
											>
											<v-divider class="my-5"></v-divider>
											<h3 v-if="group.admins.length" class="my-3">
												{{ $t("friends") }} . 2
											</h3>
											<div v-for="(item, i) in group.members" :key="item.id">
												<div v-if="i < 2" class="d-flex justify-space-between">
													<div class="d-flex">
														<v-avatar @click="$router.push('/profile')" size="50">
															<img :src="item.avatar" />
														</v-avatar>
														<div class="mx-5 my-5">
															<h4 class="my-3" v-if="i < 2">
																{{ item.name }} - {{ $t("members") }}
															</h4>
															<span>Lorem ipsum dolor sit amet, consectetur</span><br />
															<span>{{ $t("joinNote") }}</span>
														</div>
													</div>
													<v-btn
														elevation="0"
														color="primary"
														@click="$router.push('/chat/1')"
														>{{ $t("chat") }}</v-btn
													>
												</div>
											</div>
											<v-divider class="my-5"></v-divider>
											<h3 class="my-3">{{ $t("newToGroup") }} . 5</h3>
											<p>{{ $t("newToGroupNote") }}</p>
											<div v-for="(item, i) in group.members" :key="item.id">
												<div v-if="i < 5" class="d-flex justify-space-between">
													<div class="d-flex">
														<v-avatar @click="$router.push('/profile')" size="50">
															<img :src="item.avatar" />
														</v-avatar>
														<div class="mx-5 my-5">
															<h4 class="my-3">{{ item.name }} - {{ $t("members") }}</h4>
															<span>Lorem ipsum dolor sit amet, consectetur</span><br />
															<span>{{ $t("joinNote") }}</span>
														</div>
													</div>
													<v-btn
														elevation="0"
														color="primary"
														@click="$router.push('/chat/1')"
														>{{ $t("chat") }}</v-btn
													>
												</div>
											</div>
											<!-- <div v-for="(item) in addedMembers" :key="item.id">
                                                <div v-if="i < 5" class="d-flex justify-space-between">
                                                    <div class="d-flex">
                                                        <v-avatar @click="$router.push('/profile')" size="50">
                                                            <img
                                                            :src="item.avatar"
                                                            >
                                                        </v-avatar>
                                                        <div class="mx-5 my-5">
                                                            <h4 class="my-3">{{item.name}} - {{$t('members')}}</h4>
                                                            <span>Lorem ipsum dolor sit amet, consectetur</span><br>
                                                            <span>{{$t('joinNote')}}</span>
                                                        </div>
                                                    </div>
                                                    <v-btn elevation="0" color="primary" @click="$router.push('/chat/1')">{{$t('chat')}}</v-btn>
                                                </div>
                                            </div> -->

											<v-divider class="my-5"></v-divider>
											<h3 class="my-3">{{ $t("memberRequest") }} . 2</h3>
											<div v-for="(item, j) in requests" :key="item.id">
												<div v-if="j < 2" class="d-flex justify-space-between">
													<div class="d-flex">
														<v-avatar @click="$router.push('/profile')" size="50">
															<img :src="item.avatar" />
														</v-avatar>
														<div class="mx-5 my-5">
															<h4 class="my-3">{{ item.name }}</h4>
															<span>{{ $t("requestNote") }}</span>
														</div>
													</div>
													<div>
														<v-btn
															v-if="group.admin === user"
															elevation="0"
															color="primary"
															class="mx-1"
															@click="requests.splice(j, 1)"
															>{{ $t("accept") }}</v-btn
														>
														<v-btn
															v-if="group.admin === user"
															elevation="0"
															outlined
															color="primary"
															@click="requests.splice(j, 1)"
															>{{ $t("reject") }}</v-btn
														>
													</div>
												</div>
											</div>
										</v-card-text>
									</v-card>
								</v-col>
								<v-col cols="12" md="3">
									<v-card class="pa-5" elevation="0" color="grey lighten-3">
										<v-card-title>{{ $t("newThisWeek") }}</v-card-title>
										<v-avatar @click="$router.push('/teacher')" size="50">
											<img :src="users[2].avatar" />
										</v-avatar>
										<span class="mx-3"
											><strong>{{ users[2].name }}</strong></span
										><br />
										<p>{{ $t("newThisWeekNote") }}</p>
										<v-btn
											elevation="0"
											color="primary"
											class="mx-1"
											block
											@click="
												tab = 1;
												showPostForm = true;
											"
											>{{ $t("post") }}</v-btn
										>
									</v-card>
								</v-col>
							</v-row>
						</v-tab-item>
						<v-tab-item class="text-center">
							<v-icon class="mt-10" size="150" color="primary">mdi-calendar</v-icon>
							<p class="text-center mt-10 mb-5">{{ $t("noEvents") }}</p>
						</v-tab-item>
						<v-tab-item>
							<v-card color="grey lighten-3" class="pa-5">
								<v-card-title class="d-flex justify-space-between align-center">
									{{ $t("media") }}
									<div>
										<v-btn
											color="primary"
											class="px-10 mx-1"
											outlined
											@click="
												showPostForm = true;
												tab = 1;
											"
											><v-icon>mdi-plus</v-icon> {{ $t("createAlbum") }}</v-btn
										>
										<v-btn
											elevation="0"
											color="primary"
											class="px-10"
											@click="
												showPostForm = true;
												tab = 1;
											"
											><v-icon>mdi-plus</v-icon> {{ $t("addPhoto") }}</v-btn
										>
									</div>
								</v-card-title>
								<v-card-text>
									<v-tabs
										v-model="mediaTab"
										align-with-title
										background-color="transparent"
									>
										<v-tabs-slider color="primary"></v-tabs-slider>

										<v-tab>
											{{ $t("photos") }}
										</v-tab>
										<v-tab>
											{{ $t("videos") }}
										</v-tab>
										<v-tab>
											{{ $t("albums") }}
										</v-tab>
									</v-tabs>
									<v-tabs-items v-model="mediaTab">
										<v-tab-item class="pa-5">
											<v-img
												width="150"
												height="150"
												class="ma-1 d-inline-flex"
												v-for="(item, k) in group.media"
												:key="k"
												:src="item.url"
											></v-img>
										</v-tab-item>
										<v-tab-item>
											<h3 class="text-center my-5">{{ $t("noResults") }}</h3>
										</v-tab-item>
										<v-tab-item>
											<h3 class="text-center my-5">{{ $t("noResults") }}</h3>
										</v-tab-item>
									</v-tabs-items>
								</v-card-text>
							</v-card>
						</v-tab-item>
					</v-tabs-items>
				</v-card>
			</v-col>
		</v-row>

		<!-- invite Friend Dialog -->
		<v-dialog max-width="900" v-model="invitationDialog">
			<v-card class="">
				<v-card-title>
					<span class="text-h5 primary--text">
						{{ invitationAdminDialog ? $t("inviteAdmins") : $t("inviteFriends") }}
					</span>
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
									@click="
										invitationDialog = false;
										selectedFriends = [];
                                        invitationAdminDialog = false;
									"
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
import PostForm from "@/components/posts/PostForm";
import PostFormCard from "@/components/posts/PostFormCard";
import post from "@/components/posts/post";
import ProfileAvatar from "./ProfileAvatar";
export default {
	components: {
		PostForm,
		PostFormCard,
		post,
		ProfileAvatar,
	},
	data() {
		return {
			avatars: [
				{
					alt: "John Smitt",
					id: 1,
					presence: "Online",
					role: "Frontend Engineer",
					src: null,
				},
				{
					alt: "Joanne Swizzlette",
					id: 2,
					presence: "Away",
					role: "Automation Engineer",
					src: "https://randomuser.me/api/portraits/med/women/3.jpg",
				},
				{
					alt: "Frankie Dowle",
					id: 4,
					presence: "Online",
					role: "Platform Architect",
					src: "https://randomuser.me/api/portraits/med/men/8.jpg",
				},
				{
					alt: "Annette Walker",
					id: 5,
					presence: "Online",
					role: "Head of UX",
					src: "https://randomuser.me/api/portraits/med/women/5.jpg",
				},
				{
					alt: "Danny Quaide",
					id: 6,
					presence: "Offline",
					role: "UI Designer",
					src: "https://randomuser.me/api/portraits/med/men/10.jpg",
				},
				{
					alt: "Paisley Arch",
					id: 7,
					presence: "Holiday",
					role: "Automation Engineer",
					src: "https://randomuser.me/api/portraits/med/women/7.jpg",
				},
				{
					alt: "Kenneth Boomstang",
					id: 8,
					presence: "Online",
					role: "Frontend Engineer",
					src: "https://randomuser.me/api/portraits/med/men/1.jpg",
				},
				{
					alt: "Donna Avery",
					id: 9,
					presence: "Online",
					role: "UX Researcher",
					src: "https://randomuser.me/api/portraits/med/women/2.jpg",
				},
				{
					alt: "Phillip Hargreaves",
					id: 10,
					presence: "Online",
					role: "Head of Quality",
					src: "https://randomuser.me/api/portraits/med/men/11.jpg",
				},
				{
					alt: "Melissa Tushoos",
					id: 11,
					presence: "Online",
					role: "Head of Platform Engineering",
					src: "https://randomuser.me/api/portraits/med/women/4.jpg",
				},
				{
					alt: "Justin Backbeard",
					id: 12,
					presence: "Busy",
					role: "Frontend Engineer",
					src: "https://randomuser.me/api/portraits/med/men/13.jpg",
				},
				{
					alt: "Amy Fullerton",
					id: 13,
					presence: "Busy",
					role: "UI Designer",
					src: "https://randomuser.me/api/portraits/med/women/6.jpg",
				},
				{
					alt: "Angus Dougherty",
					id: 14,
					presence: "Online",
					role: "Backend Engineer",
					src: null,
				},
				{
					alt: "Jess Cransley",
					id: 15,
					presence: "Online",
					role: "UX Advocate",
					src: "https://randomuser.me/api/portraits/med/women/8.jpg",
				},
				{
					alt: "Barry Morgan",
					id: 16,
					presence: "Away",
					role: "Frontend Architect",
					src: "https://randomuser.me/api/portraits/med/men/17.jpg",
				},
				{
					alt: "Warren Deekead",
					id: 17,
					presence: "Online",
					role: "Backend Engineer",
					src: "https://randomuser.me/api/portraits/med/men/19.jpg",
				},
				{
					alt: "Melissa Warmslent",
					id: 18,
					presence: "Holiday",
					role: "DevOps Engineer",
					src: "https://randomuser.me/api/portraits/med/women/12.jpg",
				},
			],
			presence: "Online",
			groupName: "",
			showEditName: false,
			searchTerm: "",
			invitationDialog: false,
			selectedFriends: [],
			group: {},
			tab: 1,
			mediaTab: 0,
			showPostForm: false,
			addedMembers: [],
			requests: [],
			showCard: true,
			presence: false,
			invitationAdminDialog: false,
		};
	},
	computed: {
		avatarsSorted() {
			return this.avatars && this.avatars.length > 0
				? this.avatars.sort((a, b) => a.alt.localeCompare(b.alt))
				: null;
		},
		...mapState(["user", "users", "images", "groups", "posts"]),
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
	methods: {
		SumbitGroupName() {
			this.group = {
				...this.group,
				name: this.groupName,
			};
			this.showEditName = false;
		},
		openImgUploader() {
			this.$refs.uploader.click();
		},
		onFileChanged(e) {
			const image = Array.from(e.target.files)[0];
			this.group = {
				...this.group,
				cover: URL.createObjectURL(image),
			};
		},
	},
	created() {
		this.friends = this.users;
		this.group = this.groups.find(
			(group) => parseInt(group.id) === parseInt(this.$route.params.id)
		);
		this.requests = [this.users[2], this.users[3]];
	},
	watch: {
		searchTerm(val) {
			this.friends = this.users.filter((item) =>
				item.name.toLowerCase().includes(val.toLowerCase())
			);
		},
	},
};
</script>
<style>

.avatars-group.grid {
	display: grid;
	grid-gap: 8px;
	grid-template-columns: repeat(auto-fit, minmax(48px, 1fr));
}
.avatars-group.stacked {
	display: flex;
	flex-direction: row;
	direction: ltr;
	max-width: 100%;
	overflow: hidden;
	overflow-x: auto;
	white-space: nowrap;
}
.avatars-group.stacked > * {
	margin-right: -8px;
}
.avatars-group.stacked > *:last-of-type {
	padding-right: 16px;
}
.avatars-group__item {
	cursor: default;
	transition: all 0.1s ease-out;
}
.avatars-group__item.more {
	align-items: center;
	display: flex;
}
.avatars-group__item.more:hover {
	transform: none;
}
.avatars-group__item:hover {
	transform: translateY(-4px);
	z-index: 1;
}
.avatars-group .v-avatar {
	box-shadow: 0px 0px 0px 2px #fff inset;
}
.avatars-group .v-avatar img {
	padding: 2px;
}
.avatars-group .v-avatar span {
	align-items: center;
	display: flex;
	font-size: 110%;
	font-weight: 700;
	height: 100%;
	justify-content: center;
	letter-spacing: 0.1rem;
	text-shadow: 0px 0px 2px rgba(0, 0, 0, 0.56);
	width: inherit;
}
.v-avatar.bordered {
	box-shadow: 0px 0px 0px 2px #fff inset;
}
.v-avatar.bordered img {
	padding: 2px;
}
.v-avatar.bordered.small {
	box-shadow: 0px 0px 0px 1px #fff inset;
}
.v-avatar.bordered.small img {
	padding: 1px;
}
.presence {
	box-shadow: 0px 0px 0px 2px #fff inset;
	border-radius: 50%;
	bottom: 0px;
	display: block;
	height: 14px;
	position: absolute;
	width: 14px;
}
.v-avatar.bordered.small .presence {
	box-shadow: 0px 0px 0px 1px #fff inset;
	display: block;
	height: 8px;
	position: absolute;
	width: 8px;
}
</style>