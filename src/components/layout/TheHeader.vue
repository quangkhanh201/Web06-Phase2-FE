<template>
  <div class="header">
    <div class="header__body">
      <div class="header__logo">
        <div class="icon-left-header">
        </div>
        <div class="icon-logo">
        </div>
      </div>
      <div class="header__right-1">
        <div class="header__restaurant">
          <div class="menu--input">Chuỗi nhà hàng</div>
          <div class="menu--icon">
            <base-icon iconName="icon-white-drop-arrow"></base-icon>
          </div>
        </div>
      </div>
      <div class="header__right-2">
        <div class="header__language">
          <div class="menu--input">Tiếng Việt</div>
          <div class="menu--icon">
            <base-icon iconName="icon-white-drop-arrow"></base-icon>
          </div>
        </div>
        <base-icon iconName="icon-notification"></base-icon>
        <div class="user__setting">
          <div class="username">
            Phạm Quang Khánh
          </div>
          <base-icon iconName="icon-white-drop-arrow"></base-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {

}
</script>

<style scoped>
@import url(@/css/layout/header.css);
</style>