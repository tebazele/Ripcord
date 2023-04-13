<template>
  <div class="col-md-1 bgDark bigHeight">
    <div class="row border-bottom">
      <div class="col-12 text-center my-2">
        <img @click="pushToHome()" class="my-1 channelImage selectable" src="src\assets\img\Group 1.png" title="Ripcord"
          alt="Channel Image" srcset="">
      </div>
    </div>
    <div class="row mt-2" v-for="c in channels" :key="c.id">
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
  background-color: #0d1c16;
  color: whitesmoke;
}

.bigHeight {
  height: 100dvh;
}

.channelImage {
  height: auto;
  width: 100%;
  border-radius: 50%;
  aspect-ratio: 1/1;
  cursor: pointer;
}

.rowHeight {
  height: 10dvh;
}
</style>