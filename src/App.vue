<template>
<div id="app">
  <body class="site">
    <TheNav />
    <TheHeader title="Hello"></TheHeader>
    <Notification></Notification>
    <main class="site-content">
      <Section></Section>
    </main>
    <TheFooter />
  </body>
</div>
</template>

<script>
import TheHeader from "@/components/TheHeader";
import TheFooter from "@/components/TheFooter";
import TheNav from "@/components/TheNav";
import Section from "@/components/Section";
import Notification from "@/components/Notification";

export default {
  name: "app",
  components: { Notification, Section, TheNav, TheFooter, TheHeader }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.site {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
}

.site-content {
  flex: 1;
}
</style>
