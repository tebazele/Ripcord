<template>
  <section class="container-fluid bigHeight">
    <div class="row">
      <!-- SECTION CHANNEL LIST -->
      <ChannelList />
      <!-- SECTION FRIENDS/ROOMS LIST -->
      <FriendRoomList />
      <!-- SECTION CHAT -->
      <ChatRoom />
      <!-- SECTION WHO'S ONLINE -->
      <WhoIsOnline />
    </div>
  </section>

  <Modal id="editChannel">
    <template #header>
      <div>Edit Channel</div>
    </template>

    <template #body>
      <ChannelForm />
    </template>
  </Modal>

  <Modal id="createRoom">
    <template #header>
      <div>Create Room</div>
    </template>

    <template #body>
      <RoomForm />
    </template>
  </Modal>
</template>

<script>
import { onBeforeMount, onMounted, onUnmounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { channelsService } from "../services/ChannelsService"
import { AppState } from "../AppState";
import FriendRoomList from "../components/HomePage/FriendRoomList.vue";
import ChannelList from "../components/HomePage/ChannelList.vue"
import ChatRoom from "../components/HomePage/ChatRoom.vue"
import WhoIsOnline from "../components/HomePage/WhoIsOnline.vue";
import Modal from "../components/Util/Modal.vue";
import ChannelForm from "../components/Forms/ChannelForm.vue";
import RoomForm from "../components/Forms/RoomForm.vue";
import { useRoute } from "vue-router";
import { roomsService } from "../services/RoomsService";

export default {
  setup() {
    onMounted(() => {
      getChannels();
      getMessages()
    });
    const route = useRoute()
    
    async function getChannels() {
      try {
        await channelsService.getAll();
      }
      catch (error) {
        logger.error("[ERROR]", error);
        Pop.error(("[ERROR]"), error.message);
      }
    }

    async function getMessages() {
      try {
        const roomId = route.params.id
        await roomsService.getMessages(roomId)
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }
    return {
    };
  },
  components: { FriendRoomList, ChannelList, ChatRoom, WhoIsOnline, Modal, ChannelForm, RoomForm }
}
</script>

<style scoped lang="scss">
.bigHeight {
  height: 100dvh;
}
</style>
