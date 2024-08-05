<template>
    <div v-for="msg in msgs" :key="msg.id">
        <!-- IF MESSAGE IS FROM CURRENT USER -->
        <div class="tile current-user" v-if="msg.id === id">
            <div class="tile-content current-user">
                <p class="tile-title text-bold current-user">
                    {{ msg.name }} @ {{ msg.time }}
                </p>
                <p class="tile-subtitle">{{ msg.msg }}</p>
            </div>
        </div>
        <!-- END OF CURRENT USER MESSAGE -->

        <!-- MESSAGES RECEIVED FROM OTHER USERS -->
        <div class="tile other-user" v-if="msg.id !== id">
            <div class="tile-icon">
                <figure class="avatar" v-bind:data-initial="msg.name"></figure>
            </div>
            <div class="tile-content other-user">
                <p class="tile-title text-bold other-user">
                    {{ msg.name }} @@ {{ msg.time }}
                </p>
                <p class="tile-subtitle">{{ msg.msg }}</p>
            </div>
        </div>
        <!-- END OF MESSAGES RECEIVED FROM OTHER USERS -->
    </div>

</template>

<script>

</script>


<style scoped>
@import './../assets/chatbox_style.css';
</style>
