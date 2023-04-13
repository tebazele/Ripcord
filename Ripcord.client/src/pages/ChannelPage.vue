<template>
  <section class="container-fluid bigHeight">
    <div class="row">
      <!-- SECTION CHANNEL LIST -->
      <div class="col-md-1 bgDark bigHeight">
        <div class="row">
          <div class="col-12 text-center">
            <img @click="pushToHome()" class="my-1 channelImage selectable" src="src\assets\img\Group 1.png"
              title="Ripcord" alt="Channel Image" srcset="">
          </div>
        </div>
        <div class="row" v-for="c in channels" :key="c.id">
          <ServerList :server="c" />
        </div>
      </div>
      <!-- SECTION CHANNEL INFORMATION/CHAT ROOMS -->
      <div v-if="!channel" class="col-md-2 bgPrimary">
        <div class="row topChat border-bottom align-items-center">
          <div class=" col-12">
            <h5 class="m-0">Friends</h5>
          </div>
        </div>
        <div class="row middleChat verticalScroll">
          <div v-for="f in friends" :key="f.id" class="col-12 mt-2">
            <h6 class="selectable" @click="setActiveFriend(f.id)">
              <img class="onlinePicture" :src="f.Friend.picture" alt=""> {{ f.Friend.name }}
            </h6>
          </div>
        </div>
        <div class="row bottomChat align-items-center">
          <div class="col-2 text-start px-1">
            <router-link :to="{ name: 'Account' }">
              <img class="onlinePicture p-0 m-0" :src="account.picture" :title="account.name" alt="">
            </router-link>
          </div>
          <div class="col-8">
            <h5>{{ account.name }}</h5>
          </div>
          <div class="col-1">
            <i class="selectable mdi mdi-cog"></i>
          </div>
        </div>
      </div>
      <div v-else class="col-md-2 bgPrimary">
        <div class="row topChat">
          <div class="col-12 my-3 border-bottom border-dark">
            <h5>{{ channel.name }}</h5>
          </div>
        </div>
        <div class="row middleChat verticalScroll">
          <div v-for="r in rooms" :key="r.id" class="col-12 middleChatDiv">
            <h6 class="selectable py-2 rounded" @click="setActiveRoom(r.id)">{{ r.title }}</h6>
          </div>
        </div>
        <div class="row bottomChat align-items-center">
          <div class="col-2 text-start px-1">
            <router-link :to="{ name: 'Account' }">
              <img class="onlinePicture p-0 m-0" :src="account.picture" :title="account.name" alt="">
            </router-link>
          </div>
          <div class="col-8">
            <h5>{{ account.name }}</h5>
          </div>
          <div class="col-1">
            <i class="selectable mdi mdi-cog"></i>
          </div>
        </div>
      </div>
      <div v-if="!room" class="col-md-6 bgLight verticalScroll"># No Room</div>
      <div v-else class="col-md-6 bgLight verticalScroll">
        <div class="row">
          <div class="col-12">
            <h1># {{ room.title }}</h1>
          </div>
        </div>
        <div class="row bg-light m-2 rounded d-flex align-items-center" v-for="m in messages" :key="m.id">
          <div class="col-1">
            <img class="profilePicture" :src=m.Creator.picture alt="">
          </div>
          <div class="col-6">
            <div class="row">
              <div class="col-12 mt-2">
                <h6>{{ m.Creator.name }}</h6>
              </div>
              <div class="col-12">
                <p>{{ m.body }}</p>
              </div>
            </div>
          </div>
        </div>
        <div id="messageForm" class="row justify-content-center m-2">
          <textarea @keydown.enter.prevent="createMessage(room.id)"
            class="col-12 rounded align-items-center py-2 form-control" name="description" v-model="editable.body" id=""
            cols="" rows="1" placeholder="Write your message..."></textarea>
        </div>
      </div>
      <div class="col-md-3 bgLight">
        <div class="row">
          <div class="col-12 border-bottom border-dark my-3">
            <h2>Who's Online</h2>
          </div>
          <div class="col-10" v-for="u in users" :key="u.id">
            <div class="row">
              <div class="col-2">
                <img class="onlinePicture" :src=u.Profile.picture alt="">
              </div>
              <div class="col-10">
                {{ u.Profile.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, onUnmounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { channelsService } from "../services/ChannelsService"
import { messagesService } from "../services/MessagesService"
import { roomsService } from "../services/RoomsService"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import ServerList from "../components/HomePage/ServerList.vue";
import { accountService } from "../services/AccountService";
import { router } from "../router";

export default {
  setup() {
    onMounted(() => {
      getChannels();
      // getFriends()
      // getUsers();
      // getMessages();
    });
    const editable = ref({})


    async function getChannels() {
      try {
        await channelsService.getAll();
      }
      catch (error) {
        logger.error("[ERROR]", error);
        Pop.error(("[ERROR]"), error.message);
      }
    }

    async function getFriends() {
      try {
        await accountService.getFriends();
      }
      catch (error) {
        logger.error("[ERROR]", error);
        Pop.error(("[ERROR]"), error.message);
      }
    }

    onUnmounted(() => {
      AppState.users = []
      AppState.room = null
      AppState.channel = null
    });
    return {
      account: computed(() => AppState.account),
      channels: computed(() => AppState.channels),
      channel: computed(() => AppState.channel),
      rooms: computed(() => AppState.rooms),
      room: computed(() => AppState.room),
      messages: computed(() => AppState.messages),
      users: computed(() => AppState.users),
      friends: computed(() => AppState.friends),
      editable,

      pushToHome() {
        try {
          router.push({ name: 'Home' })
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async setActiveRoom(roomId) {
        try {
          await roomsService.setActiveRoom(roomId)
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      },

      async getUsers() {
        try {
          await channelsService.getUsers();
        }
        catch (error) {
          logger.error("[ERROR]", error);
          Pop.error(("[ERROR]"), error.message);
        }
      },

      async createMessage(roomId) {
        try {
          let messageData = editable.value
          messageData.roomId = roomId
          await messagesService.createMessage(messageData)
          editable.value = {}
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      },

    };
  },
  components: { ServerList }
}
</script>

<style scoped lang="scss">
.profilePicture {
  height: 50px;
  width: 50px;
  border-radius: 50%;
}

.onlinePicture {
  height: 35px;
  width: 35px;
  border-radius: 50%;
}

.bigHeight {
  height: 100dvh;
}

.bgDark {
  background-color: #13251f;
  color: whitesmoke;
}

.bgPrimary {
  background-color: #1c3a2e;
  color: whitesmoke;
}

.bgLight {
  background-color: #265e49;
  color: whitesmoke;
}

.verticalScroll {
  overflow-x: hidden;
  height: 100dvh;
  overflow-y: scroll;
  border-right: #053f05 2px solid;
}

.verticalScroll::-webkit-scrollbar {
  width: 2px;
  height: 5dvh;
  background-color: #053f05;
}

.verticalScroll::-webkit-scrollbar-thumb {
  background: #053f05;
}

.channelImage {
  height: 75px;
  width: 75px;
  border-radius: 50%;
  cursor: pointer;
}

// SECTION CHAT BOX

.topChat {
  height: 5dvh;
}

.middleChat {
  height: 89dvh;
}

.middleChatDiv {
  max-height: 10px !important;
  height: 10px !important;
}

.bottomChat {
  height: 6dvh;
  background-color: #13251f;
}
</style>
