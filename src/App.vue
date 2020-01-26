<template>
  <div id="app">
      <TheNav/>
      <TheHeader title="Hello"></TheHeader>
      <ChatNotification></ChatNotification>
      <Notifications></Notifications>
      <Section></Section>
      <TheFooter/>
  </div>
</template>

<script>


    import TheHeader from "@/components/TheHeader";
    import TheFooter from "@/components/TheFooter";
    import TheNav from "@/components/TheNav";
    import Section from "@/components/Section";
    import ChatNotification from "@/components/ChatNotification";
    import Notifications from "@/components/Notifications";

    export default {
        name: "app",
        components: {Notifications, ChatNotification, Section, TheNav, TheFooter, TheHeader}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 55px;
}
</style>
