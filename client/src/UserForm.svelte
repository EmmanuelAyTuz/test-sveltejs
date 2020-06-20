<script>
  import axios from "axios";
  import { onMount } from "svelte";

  let id = "";
  let name = "";
  let flastname = "";
  let mlastname = "";
  let email = "";
  let users = [];

  let btnIsEnable = false;
  let btnIsHide = false;

  onMount(async () => {
    const { data, status } = await axios.get("/api/users/");
    users = data; //Read the user into mongo
  });

  const createUser = async () => {
    const singleUser = {
      name: name,
      flastname: flastname,
      mlastname: mlastname,
      email: email
    };
    const response = await axios.post("/api/users/", singleUser); //Create a single user into mongo
    singleUser = [response.data, ...users];
    name = "";
    flastname = "";
    mlastname = "";
    email = "";
    btnIsEnable = true;
  };

  const deleteUser = async user => {
    const response = await axios.delete("/api/users/" + user._id);
    if (response.data.id == user._id) {
      users = users.filter(t => t._id != user._id);
    }
  };

  const setFieldsUpdateUser = async user => {
    id = user._id;
    name = user.name;
    flastname = user.flastname;
    mlastname = user.mlastname;
    email = user.email;
    btnIsHide = true;
  };

  const updateUser = async () => {
    const singleUser = {
      name: name,
      flastname: flastname,
      mlastname: mlastname,
      email: email
    };
    const response = await axios.put("/api/users/" + id, singleUser);
    if (response.data._id == id) {
      users = users.filter(t => t._id != id);
    }
  };
</script>

<style>
  button:hover {
    background-position: 0;
    background: rgba(218, 216, 216, 0.425);
    color: black;
  }
</style>

<div class="row">
  <div class="col-md-4 pb-3">
    <form
      on:submit={() => {
        if (btnIsHide) {
          updateUser();
        } else {
          createUser();
        }
      }}>
      <h1 class="text-center">Usuario</h1>
      {#if id}
        <br />
        <h4 class="text-center">({id})</h4>
      {/if}
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="Nombre(s)"
          bind:value={name}
          autofocus
          required />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="flastname"
          placeholder="Apellido paterno"
          bind:value={flastname}
          required />
      </div>
      <div class="form-group">
        <input
          type="text"
          class="form-control"
          id="mlastname"
          placeholder="Apellido materno"
          bind:value={mlastname}
          required />
      </div>
      <div class="form-group">
        <input
          type="email"
          class="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          placeholder="Correo electronico"
          bind:value={email}
          required />
        <small id="emailHelp" class="form-text text-muted">
          Nosotros no compartimos tu correo con nadien
        </small>
      </div>
      <button
        type="submit"
        class="btn btn-primary btn-block"
        disabled={btnIsEnable}
        hidden={btnIsHide}>
        GUARDAR
      </button>
      <button
        type="submit"
        class="btn btn-primary btn-block"
        disabled={btnIsEnable}
        hidden={!btnIsHide}>
        ACTUALIZAR
      </button>
    </form>
  </div>
  <div class="col-md-8">
    <div class="row">
      {#each users as user}
        <div class="col-md-6 pb-3">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title text-center">
                ID:
                <b>{user._id}</b>
              </h5>
              <p class="card-text">
                Nombre: {user.name} {user.flastname} {user.mlastname}
                <br />
                Email: {user.email}
              </p>
              <button
                class="btn btn-warning"
                on:click={() => setFieldsUpdateUser(user)}
                disabled={btnIsEnable}>
                Actualizar
              </button>
              <button
                class="btn btn-danger"
                on:click={() => deleteUser(user)}
                disabled={btnIsEnable}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
