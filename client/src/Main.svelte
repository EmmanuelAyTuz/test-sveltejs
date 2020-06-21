<script>
  import Notifications from "svelte-notifications";
  import UserForm from "./UserForm.svelte";
  import NavBar from "./NavBar.svelte";
</script>

<style>
  /*Styles*/
</style>

<NavBar />
<div class="container p-5">
  <Notifications>
    <UserForm />
  </Notifications>
</div>
