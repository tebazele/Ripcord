<template>
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
</template>

<script>
import { computed } from "vue";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import { channelsService } from "../../services/ChannelsService";


export default {



  setup() {
    async function whoIsOnline() {
      try {
        let channelId = AppState.editChannel.id
        await channelsService.getUsers(channelId)
      } catch (error) {
        logger.error('[ERROR]',error)
        Pop.error(('[ERROR]'), error.message)
      }
    }



    return {
      users: computed(() => AppState.users)

    }
  }
}
</script>

<style scoped>
.onlinePicture {
  height: 35px;
  width: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.bgLight {
  background-color: #265e49;
  color: whitesmoke;
}
</style>
