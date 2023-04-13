<template>
  <div class="col-md-1 bgDark bigHeight">
    <div class="row my-5 border-bottom">
      <div class="col-12 text-center">
        <img @click="pushToHome()" class="my-1 channelImage selectable" src="src\assets\img\Group 1.png" title="Ripcord"
          alt="Channel Image" srcset="">
      </div>
    </div>
    <div class="row" v-for="c in channels" :key="c.id">
      <ServerList :server="c" />
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import ServerList from "../HomePage/ServerList.vue";
import { router } from "../../router";

export default {



  setup() {



    return {
      channels: computed(() => AppState.channels),

      pushToHome() {
        try {
          router.push({ name: 'Home' })
        } catch (error) {
          logger.error('[ERROR]', error)
          Pop.error(('[ERROR]'), error.message)
        }
      },

    }
  },
  components: { ServerList }
}
</script>

<style scoped>
.bgDark {
  background-color: #13251f;
  color: whitesmoke;
}

.bigHeight {
  height: 100dvh;
}

.channelImage {
  height: 1rem;
  width: 1rem;
  border-radius: 50%;
  cursor: pointer;
}
</style>