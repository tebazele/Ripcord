<template></template>

<script>
import { onMounted } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { channelsService } from "../services/ChannelsService"

export default {
  setup() {
    onMounted(() => {
      getChannels()
      getUsers()
      getMessages()
    })

    async function getChannels() {
      try {
        await channelsService.getAll()
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getUsers() {
      try {
        await channelsService.getUsers()
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }

    async function getMessages() {
      try {
        await channelsService.getMessages()
      } catch (error) {
        logger.error('[ERROR]', error)
        Pop.error(('[ERROR]'), error.message)
      }
    }
    return {}
  }
}
</script>

<style scoped lang="scss"></style>
