<template>
    <header class="header">
        <ul class="nav-items">
            <li>
                <nuxt-link to="/">Home</nuxt-link>
                
            </li>
            <li>
<nuxt-link to="/users">Users</nuxt-link>
            </li>
            <li>
                <nuxt-link to="/product">Product</nuxt-link>

            </li>
        </ul>
    </header>
</template>

<style scoped>
.header {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: gray;
}

.nav-items {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 80%;
}

.nav-items a {
  color: black;
  text-decoration: none;
}

.nav-items a:hover,
.nav-items a:hover {
  color: white;
}
</style>
