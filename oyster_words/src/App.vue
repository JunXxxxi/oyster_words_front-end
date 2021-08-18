<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin: 0!important;
    overflow-x: hidden;
  }
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    height:100%;
    width:100%;
  }
  .panel_shadow{
    height:max-content;
    box-shadow:0 5px 20px rgba(0,0,0,0.07);
    opacity:1;
    border-radius:20px;
    padding:20px;
  }
  .forget{
    font-size:14px;
    font-weight:400;
    line-height:17px;
    color:rgba(136,136,136,1);
    opacity:1;
    text-decoration: none;
  }
</style>
