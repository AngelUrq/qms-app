<template>
<body>
    <div id="mySidebar" class="sidebar">
    <a class="closebtn" v-on:click="closeSidebar">&times;</a>
    <a href="#">Estadísticas</a>
    <a href="#">Planes de acción</a>
    <a href="#">Usuarios</a>
    <a href="#">Reportes</a>
  </div>
  <div>
  <b-navbar id="myNavbar" class="navbar" toggleable="lg" type="dark" variant="info">
    <b-button pill id="openSidebarBtn" variant="info" style="font-size:25px;cursor:pointer" v-on:click="openSidebar">&#9776;</b-button>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>

      <b-navbar-nav class="mx-auto">
        <b-navbar-brand href="#/home">
          <img src="@/assets/upb_logo.png" id="logo_upb" class="d-inline-block align-top" alt="logo">
        SCC
        </b-navbar-brand>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown>

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</body>
</template>

<script>
export default {
  methods: {
    openSidebar: function () {
      document.getElementById('mySidebar').style.width = '250px'
      document.body.style.backgroundColor = 'rgba(0,0,0,0.4)'
    },
    closeSidebar: function () {
      document.getElementById('mySidebar').style.width = '0'
      document.body.style.backgroundColor = 'white'
    }
  }
}
</script>

<style scoped>
body {
  font-family: "Lato", sans-serif;
}
#logo_upb {
  width: 40px;
  height: 30px;
}
#myNavbar {
  background-color: rgb(26, 90, 116) !important;
}
#openSidebarBtn {
  background-color:  rgb(26, 90, 116) !important;
  border-color: rgb(26, 90, 116) !important;
}

.navbar .b-navbar-brand {
  position: fixed;
}

.sidebar {
  height: 100%;
  width: 0;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: rgb(26, 90, 116);
  overflow-x: hidden;
  transition: 0.5s;
  padding-top: 60px;
}

.sidebar a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: rgb(209, 227, 235);
  display: block;
  transition: 0.3s;
}

.sidebar a:hover {
  color: #adadad;
}

.sidebar .closebtn {
  position: absolute;
  top: 0;
  right: 25px;
  color: #adadad;
  font-size: 36px;
  margin-left: 50px;
}

@media screen and (max-height: 450px) {
  .sidebar {padding-top: 15px;}
  .sidebar a {font-size: 18px;}
}
</style>
