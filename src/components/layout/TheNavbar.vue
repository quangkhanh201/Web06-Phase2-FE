<template>
    <div class="navbar">
      <router-link to="/overview" class="navbar__item">
          <div class="navbar__item--icon icon-dashboard"></div>
          <div class="navbar__item--text">Tổng quan</div>
      </router-link>
      <router-link to="/menu-food" class="navbar__item">
          <div class="navbar__item--icon icon-menu"></div>
          <div class="navbar__item--text">Thực đơn</div>
      </router-link>
    </div>
  </template>
  
  <script>
  
  export default {
    components : {
      
    },
  }
  </script>
  
  <style scoped>
    .navbar {
      background-color: #0973b9;
      color: #fff;
    }
    .navbar__item {
    display: flex;
    align-items: center;
    height: 36px;
    width: 100%;
    cursor: pointer;
    border-bottom: 1px solid #016087;
    border-top: 1px solid #038ac1;
}

.navbar__item:hover {
    background-color: #eb7728;
}

.navbar__item:focus {
    background-color: #0199fb;
}

.navbar__item--icon {
    flex: 10%;
    margin: 0 16px;
}

.navbar__item--text {
    width: calc(100% - 48px);
    font-size: 13px;
}

a {
    color: #fff;
    text-decoration: none;
}
  </style>