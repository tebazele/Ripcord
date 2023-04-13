<template>
  <!-- SECTION FRIENDS -->
  <div v-if="!channel" class="col-md-2 bgPrimary">
    <div class="row topChat border-bottom align-items-center">
      <div class=" col-12">
        <h5 class="m-0">Friends</h5>
      </div>
    </div>
    <div class="row middleChat verticalScroll">
      <div v-for="f in friends" :key="f.id" class="col-12 mt-2">
        <router-link :to="{ name: 'Friend', params: { id: f.id } }">
          <h6 class="selectable" @click="setActiveFriend(f.id)">
            <img class="onlinePicture" :src="f.Friend.picture" alt=""> {{ f.Friend.name }}
          </h6>
        </router-link>
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
  <!-- SECTION ROOMS -->
  <div v-else class="col-md-2 bgPrimary">
    <div class="row topChat">
      <div class="col-12 my-3 border-bottom border-dark">
        <h5 class="m-0">{{ channel.name }}</h5>
      </div>
    </div>
    <div class="row middleChat verticalScroll">
      <div v-for="r in rooms" :key="r.id" class="col-12 middleChatDiv mt-3">
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
        <i class="selectable mdi mdi-cog">
          <Login />
        </i>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";
import { roomsService } from "../../services/RoomsService";
import { friendsService } from "../../services/FriendsService"
import Login from "../../components/Login.vue"


export default {
  setup() {
    return {
      channel: computed(() => AppState.channel),
      friends: computed(() => AppState.friends),
      account: computed(() => AppState.account),
      rooms: computed(() => AppState.rooms),
      async setActiveRoom(roomId) {
        try {
          await roomsService.setActiveRoom(roomId);
        }
        catch (error) {
          logger.error("[ERROR]", error);
          Pop.error(("[ERROR]"), error.message);
        }
      },
      async setActiveFriend(friendId) {
        try {
          await friendsService.setActiveFriend(friendId);
        }
        catch (error) {
          logger.error("[ERROR]", error);
          Pop.error(("[ERROR]"), error.message);
        }
      }
    };
  },
  components: { Login }
}
</script>

<style scoped>
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

.bgPrimary {
  background-color: #1c3a2e;
  color: whitesmoke;
}

.onlinePicture {
  height: 35px;
  width: 35px;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
