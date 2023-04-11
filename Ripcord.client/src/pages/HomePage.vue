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
            <h1 @click="setActiveRoom(r.id)">{{ r.title }}</h1>
          </div>
        </div>
      </div>
      <div v-if="!room" class="col-md-7 bg-dark">center</div>
      <div v-else class="col-md-7 bg-dark">{{ room.title }}</div>
      <div class="col-md-2 bg-success">right</div>
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
      getMessages();
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
    async function getMessages() {
      try {
        await channelsService.getMessages();
      }
      catch (error) {
        logger.error("[ERROR]", error);
        Pop.error(("[ERROR]"), error.message);
      }
    }
    return {
      channels: computed(() => AppState.channels),
      channel: computed(() => AppState.channel),
      rooms: computed(() => AppState.rooms),
      room: computed(() => AppState.room),

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

<style scoped lang="scss"></style>
