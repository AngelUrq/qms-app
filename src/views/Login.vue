<template>
  <div>
    <header>
      <div class="overlay"></div>

      <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
        <source src="@/assets/video.mp4" type="video/mp4" />
      </video>

      <div>
        <div class="container login-form">
          <div class="text-center mt-4">
            <img class="my-3" id="icon-user" src="@/assets/user-icon.png" alt />
          </div>

          <form action>
            <div class="form-group text-center">
              <input type="text" class="form-control my-3" id="user" placeholder="Usuario" />
              <input
                type="password"
                class="form-control my-3"
                name="password"
                id="password"
                placeholder="Contraseña"
              />
              <div class="text-center">
                <b-button variant="info" class="mb-4" type="submit">Ingresar</b-button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </header>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
#icon-user {
  width: 150px;
  height: 110px;
}

.btn {
  width: 50%;
  border-color: #23407e;
  background-color: #23407e;
  color: white;
  font-size: 15px;
}

.btn:hover {
  border-color: #3c5da5;
  background-color: #3c5da5;
  color: white;
}

.login-form {
  width: 30%;
  height: 60%;
  background-color: #f5f5f5;
  border-radius: 10px;
  position: absolute;
  margin-top: 25vh;
}

header {
  position: relative;
  background-color: black;
  height: 100vh;
  min-height: 25rem;
  width: 100%;
  overflow: hidden;
}

header video {
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
  -ms-transform: translateX(-50%) translateY(-50%);
  -moz-transform: translateX(-50%) translateY(-50%);
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
}

header .container {
  position: relative;
  z-index: 2;
}

header .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: black;
  opacity: 0.5;
  z-index: 1;
}

@media (pointer: coarse) and (hover: none) {
  header {
    background: url("https://source.unsplash.com/XT5OInaElMw/1600x900") black
      no-repeat center center scroll;
  }
  header video {
    display: none;
  }
}
</style>
