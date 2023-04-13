<template>
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
</template>

<script>
import { computed, ref } from "vue";
import { AppState } from "../../AppState";
import { logger } from "../../utils/Logger";
import Pop from "../../utils/Pop";


export default {



  setup() {
    let editable = ref({})



    return {
      room: computed(() => AppState.room),
      messages: computed(() => AppState.messages),
      editable,

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

    }
  }
}
</script>

<style scoped>
.profilePicture {
  height: 50px;
  width: 50px;
  aspect-ratio: 1/1;
  border-radius: 50%;
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
</style>
