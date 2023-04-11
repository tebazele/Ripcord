<template>
  <div @click="setActiveChannel(server.id)" class="col-12 text-center">
    <img class="my-1 channelImage" :src=server.img :title=server.name alt="Channel Image" srcset="">
  </div>
</template>

<script>
import { Channel } from "../../models/Channel";
import { channelsService } from "../../services/ChannelsService";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";


export default {
  props: { server: { type: Channel, required: true } },


  setup() {



    return {

      async setActiveChannel(serverId) {
        try {
          await channelsService.setActiveChannel(serverId)
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      }

    }
  }
}
</script>

<style scoped>
.channelImage {
  height: 75px;
  width: 75px;
  border-radius: 50%;
}
</style>
