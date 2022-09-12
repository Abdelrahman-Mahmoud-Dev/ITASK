<template>
    <emoji
    :emojiData="$emojiAllData"
    :emojiGroups="$emojiGroups"
    :skinsSelection="false"
    :searchEmojisFeat="true"
    searchEmojiPlaceholder="Search here."
    searchEmojiNotFound="Emojis not found."
    isLoadingLabel="Loading..."
    @emojiUnicodeAdded="addImoji"
    />
</template>

<script>
export default {
  methods: {
    addImoji (emoji) {
      this.$emit('setEmoji', emoji)
    }
  }
}
</script>

<style>
#btn-emoji-default {
    margin: 0;
}
#btn-emoji-default > div > img.emoji {
    width: 20px !important;
    height: 20px !important;
}
</style>
