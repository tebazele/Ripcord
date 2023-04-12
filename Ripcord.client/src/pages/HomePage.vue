<template>
  <section class="container-fluid">
    <div class="row">
      <!-- SECTION CHANNEL LIST -->
      <div class="col-md-1 bg-primary">
        <div class="row" v-for="c in channels" :key="c.id">
          <ServerList :server="c" />
        </div>
      </div>
      <!-- SECTION CHANNEL INFORMATION/CHAT ROOMS -->
      <div v-if="channel" class="col-md-2 bg-secondary">
        <div class="row">
          <div class="col-12">
            {{ channel.name }}
          </div>
          <div v-for="r in rooms" :key="r.id" class="col-12">
            <h5 @click="setActiveRoom(r.id)">{{ r.title }}</h5>
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
          <div class="col-12">Who's Online</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted } from "vue";
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
      getUsers();
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
    async function getUsers() {
      try {
        await channelsService.getUsers();
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
    return {
      channels: computed(() => AppState.channels),
      channel: computed(() => AppState.channel),
      rooms: computed(() => AppState.rooms),
      room: computed(() => AppState.room),
      messages: computed(() => AppState.messages),

      async setActiveRoom(roomId) {
        try {
          await roomsService.setActiveRoom(roomId)
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
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
</style>
