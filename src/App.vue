<template>
  <div id="app">
    <div id="nav" class="container">
      <div class="row">
        <div class="three columns navbar-header">
          <a class="navbar-brand"></a>
        </div>
        <div class="nav-holder nine columns">
          <router-link to="/" class="u-pull-left">Calendar</router-link>
          <router-link to="/room" class="u-pull-left">Room</router-link>
        </div>
      </div>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/common/_variables.scss';
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $darkblue;
}
#nav {
  .navbar-header {
    padding: 26px 10px;
    margin-right: 0;
    margin-left: 0;
  }
  a.navbar-brand {
    background: url('./assets/logo.png') center no-repeat;
    background-size: auto 50px;
    width: auto;
    height: 50px;
    display: block;
    margin: 0;
    padding: 0;
  }
  .nav-holder {
    margin: 40px 0;
    a {
      font-weight: bold;
      font-size: 1.5rem;
      color: $darkblue;
      text-decoration: none;
      margin: 0 11px;
      text-transform: uppercase;
      &.router-link-exact-active {
        color: $primary;
      }
    }
  }
}
</style>
