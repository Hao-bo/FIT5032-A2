<template>
  <header class="navbar container-fluid p-3 border-bottom fixed-top">
    <div class="d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <span class="fw-bold">Australian elder help</span>
      </div>
      <nav class="d-none d-md-block">
        <ul class="nav">
          <li class="nav-item">
            <!-- <button class="btn btn-link nav-link">Volunteer</button> -->
            <RouterLink to="/volunteer" class="btn btn-link nav-link">Volunteer</RouterLink>
          </li>
          <li class="nav-item">
            <!-- <button class="btn btn-link nav-link">Service</button> -->
            <RouterLink to="/service" class="btn btn-link nav-link">Service</RouterLink>
          </li>
          <li class="nav-item">
            <!-- <button class="btn btn-link nav-link">Activity</button> -->
            <RouterLink to="/activity" class="btn btn-link nav-link">Activity</RouterLink>
          </li>
          <li class="nav-item">
            <!-- <button class="btn btn-link nav-link">Activity</button> -->
            <RouterLink to="/rate" class="btn btn-link nav-link">Rate</RouterLink>
          </li>
          <!-- registion Page -->
          <li>
            <RouterLink to="fireRegister" class="nav-link" active-class="active"
              >Firebase Registion</RouterLink
            >
          </li>
          <!-- log in Page -->
          <li>
            <RouterLink to="/fireLogin" class="nav-link" active-class="active"
              >Firebase login</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/sendEmail" class="nav-link" active-class="active"
              >Send Email</RouterLink
            >
          </li>
        </ul>
      </nav>
      <!-- <button class="btn btn-danger">Login</button> -->
      <!-- <li class="nav-item">
        <RouterLink to="/registion" class="btn btn-danger">Login</RouterLink>
      </li> -->
    </div>
  </header>
</template>

<!-- <style scoped>
header {
  background-color: skyblue;
}

@media (min-width: 1200px) {
  .container-padding {
    padding-top: 70px;
  }
}
</style> -->
<style scoped>
.navbar {
  background-color: skyblue;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影效果 */
}

/* 适配不同屏幕尺寸的导航栏样式 */
.navbar .nav-link {
  color: #0056b3;
  font-weight: bold;
}

.navbar .nav-link:hover {
  text-decoration: underline;
}
</style>
