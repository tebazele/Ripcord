<template>
  <section class="container-fluid bigHeight">
    <div class="row">
      <!-- SECTION CHANNEL LIST -->
      <div class="col-md-1 bg-primary bigHeight">
        <div class="row" v-for="c in channels" :key="c.id">
          <ServerList :server="c" />
        </div>
      </div>
      <!-- SECTION CHANNEL INFORMATION/CHAT ROOMS -->
      <div v-if="channel" class="col-md-2 bg-secondary">
        <div class="row">
          <div class="col-12 my-3 border-bottom border-dark">
            <h5>{{ channel.name }}</h5>
          </div>
          <div v-for="r in rooms" :key="r.id" class="col-12">
            <h6 class="selectable" @click="setActiveRoom(r.id)">{{ r.title }}</h6>
          </div>
        </div>
      </div>
      <div v-if="!room" class="col-md-7 bg-dark">center</div>
      <div v-else class="col-md-7 bg-dark">
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
      </div>
      <div class="col-md-2 bg-success">
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
import { onMounted, onUnmounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { channelsService } from "../services/ChannelsService"
import { roomsService } from "../services/RoomsService"
import { computed } from "@vue/reactivity";
import { AppState } from "../AppState";
import ServerList from "../components/HomePage/ServerList.vue";

export default {
  setup() {
    onMounted(() => {
      getChannels();
      // getUsers();
      // getMessages();
    });

    async function getChannels() {
      try {
        await channelsService.getAll();
      }
      catch (error) {
        logger.error("[ERROR]", error);
        Pop.error(("[ERROR]"), error.message);
      }
    }

    // async function getMessages() {
    //   try {
    //     await channelsService.getMessages();
    //   }
    //   catch (error) {
    //     logger.error("[ERROR]", error);
    //     Pop.error(("[ERROR]"), error.message);
    //   }
    // }
    onUnmounted(() => {
      AppState.users = []
    });
    return {
      channels: computed(() => AppState.channels),
      channel: computed(() => AppState.channel),
      rooms: computed(() => AppState.rooms),
      room: computed(() => AppState.room),
      messages: computed(() => AppState.messages),
      users: computed(() => AppState.users),

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
      }
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
  height: 25px;
  width: 25px;
  border-radius: 50%;
}

.bigHeight {
  height: 92.7vh;
}
</style>
