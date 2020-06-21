<script>
  import axios from "axios";
  import { onMount } from "svelte";

  //Notifications
  import { getNotificationsContext } from "svelte-notifications";
  const { addNotification } = getNotificationsContext();

  //Field
  let id = "";
  let name = "";
  let flastname = "";
  let mlastname = "";
  let email = "";
  let folder = "";
  let img = "";
  let users = [];

  //More
  let files;
  //let dataFile = null;

  //Disable button
  let btnIsDisabled = false;
  let btnIsHidden = false;

  onMount(async () => {
    readUsers();
  });

  //CRUD
  const createUser = async () => {
    const singleUser = {
      name: name,
      flastname: flastname,
      mlastname: mlastname,
      email: email,
      folder: Math.floor(Math.random() * 101 + 0) + "_" + Date.now()
    };
    try {
      const response = await axios.post("/api/users/", singleUser); //Create a single user into mongo
      if (response.status == 200) {
        users = users.concat(response.data);
        btnIsDisabled = true;
        clearFields();
        notification(
          "Usuario con ID (" +
            response.data._id +
            ") ha sido creado existosamente",
          "top-right",
          "success",
          3000
        );
      }
    } catch (e) {
      notification(
        "Error creando usuario: " + e.message,
        "top-right",
        "warning",
        3000
      );
    }
    //singleUser = [response.data, ...users];
  };

  const readUsers = async () => {
    const { data, status } = await axios.get("/api/users");
    if (status == 200) {
      users = data; //Read the user into mongo
    }
  };

  const updateUser = async () => {
    const singleUser = {
      name: name,
      flastname: flastname,
      mlastname: mlastname,
      email: email,
      imgprofile: { original: img }
    };
    try {
      const response = await axios.put("/api/users/" + id, singleUser);
      if (response.status == 200) {
        clearFields();
        notification(
          "Usuario con ID (" +
            response.data.id +
            ") ha sido actualizado existosamente",
          "top-right",
          "success",
          3000
        );
        readUsers();
        btnIsHidden = false;
      }
    } catch (e) {
      notification(
        "Error actualizando usuario: " + e.message,
        "top-right",
        "warning",
        3000
      );
    }
  };

  const deleteUser = async user => {
    const response = await axios.delete("/api/users/" + user._id);
    try {
      if (response.status == 200) {
        //if (response.data.id == user._id) {
        users = users.filter(t => t._id != user._id);
        notification(
          "Usuario con ID (" +
            response.data.id +
            ") ha sido eliminado existosamente",
          "top-right",
          "danger",
          3000
        );
      }
    } catch (e) {
      notification(
        "Error eliminando usuario: " + e.message,
        "top-right",
        "warning",
        3000
      );
    }
  };

  //Submit handler of tag form
  const onSubmitHandler = async () => {
    if (btnIsHidden) {
      await uploadFile();
      await updateUser();
    } else {
      createUser();
    }
  };

  //Fill fields
  const setFieldsUpdateUser = async user => {
    id = user._id;
    name = user.name;
    flastname = user.flastname;
    mlastname = user.mlastname;
    email = user.email;
    btnIsHidden = true;
    btnIsDisabled = false;
    notification(
      "Modifique los campos (" + id + ")",
      "top-right",
      "info",
      3000
    );
  };

  //Create notifications
  const notification = (msg, pos, type, time) => {
    addNotification({
      text: msg,
      position: pos,
      type: type,
      removeAfter: time
    });
  };

  //Reset fields
  const clearFields = () => {
    name = "";
    flastname = "";
    mlastname = "";
    email = "";
  };

  //File upload
  const uploadFile = async () => {
    let formData = new FormData();
    let imagefile = document.querySelector("#profile");
    let fileup = imagefile.files[0];
    formData.append("profile", fileup);
    if (fileup) {
      const response = await axios.post("/api/upload/" + id, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      if (response.status == 200) {
        img = response.data.data.filename; //New filename of upload image
      }
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
      on:submit|preventDefault={onSubmitHandler}
      on:change={() => {
        btnIsDisabled = false;
      }}>
      <h1 class="text-center">Usuario</h1>
      {#if btnIsHidden}
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
      {#if btnIsHidden}
        <!--Show in update-->
        <div class="form-group">
          <input
            id="profile"
            name="profile"
            type="file"
            bind:files
            class="form-control" />
        </div>
      {/if}
      <button
        class="btn btn-primary btn-block"
        disabled={btnIsDisabled}
        hidden={btnIsHidden}>
        GUARDAR
      </button>
      <button
        class="btn btn-primary btn-block"
        disabled={btnIsDisabled}
        hidden={!btnIsHidden}>
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
              {#if user.imgprofile.original != 'profile_default.png'}
                <img
                  src="/api/{user.folder}/{user.imgprofile.original}"
                  alt={user._id}
                  width="75%" />
              {:else}
                <img src="/img/{user.imgprofile.original}" alt={user._id} />
              {/if}

              <h5 class="card-title text-center">
                ID:
                <b>{user._id}</b>
              </h5>
              <p class="card-text">
                Nombre: {user.name} {user.flastname} {user.mlastname}
                <br />
                Email: {user.email}
                <br />
                Carpeta: {user.folder}
                <br />
                Imagen: {user.imgprofile.original}
              </p>
              <button
                class="btn btn-warning"
                on:click={() => setFieldsUpdateUser(user)}>
                Actualizar
              </button>
              <button class="btn btn-danger" on:click={() => deleteUser(user)}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</div>
