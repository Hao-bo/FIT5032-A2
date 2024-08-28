<template>
  <div>
    <header class="container-fluid p-3 border-bottom fixed-top">
      <div class="d-flex justify-content-between align-items-center">
        <div class="d-flex align-items-center">
          <span class="fw-bold">Australian elder help</span>
        </div>
        <nav class="d-none d-md-block">
          <ul class="nav">
            <li class="nav-item">
              <button class="btn btn-link nav-link">Volunteer</button>
            </li>
            <li class="nav-item">
              <button class="btn btn-link nav-link">Service</button>
            </li>
            <li class="nav-item">
              <button class="btn btn-link nav-link">Activity</button>
            </li>
          </ul>
        </nav>
        <!-- <button class="btn btn-danger">Login</button> -->
      </div>
    </header>

    <!-- display introduce -->
    <div class="container mt-5 pt-5">
      <section class="intro p-4 bg-light rounded">
        <h2>Introduction</h2>
        <p>
          Welcome to Australian elder help. We are dedicated to providing support and services for
          the elderly in Australia. Whether you are looking to volunteer, need assistance, or want
          to participate in our activities, Please Login and we are here to help.
        </p>
      </section>
    </div>
  </div>
</template>

<style scoped>
header {
  background-color: skyblue;
}

@media (min-width: 1200px) {
  .container-padding {
    padding-top: 70px;
  }
}
</style>
