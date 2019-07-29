<template>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" id="mainNav">
        <div class="container">
            <router-link :to="{name: 'home'}" class="navbar-brand">Projecty Web</router-link>
            <button aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"
                    class="navbar-toggler"
                    data-target="#navbarResponsive" data-toggle="collapse" type="button">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarResponsive">
                <ul class="navbar-nav ml-auto">

                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
    export default {
        name: "TheNav"
    }
</script>

<style scoped>

</style>
