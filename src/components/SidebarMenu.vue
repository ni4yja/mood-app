<template>
  <div class="sidebar-container">
    ahaha
  </div>
</template>

<style>
.sidebar-container {
  position: fixed;
  box-shadow: inset 0px 1px 0px #f3f3f4;
  height: 7rem;
  bottom: 0;
  width: 100%;
  background: #ffffff;
  z-index: 1000;
}

@media (min-width: 768px) {
  .sidebar-container {
    box-shadow: inset -1px 0px 0px #f3f3f4;
    width: 7rem;
    height: 100vh;
  }
}
</style>