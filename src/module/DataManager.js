const remoteURL = "https://database.macropoloapp.com";
const tempURL = " http://localhost:3004";

export default Object.create(null, {
  get: {
    value: function(resource, id) {
      return fetch(`${tempURL}/${resource}/${id}`).then(data => data.json());
    }
  },
  getAll: {
    value: function(resource) {
      return fetch(`${tempURL}/${resource}`).then(data => data.json());
    }
  },

  getSorted: {
    value: function(resource, userId) {
      return fetch(`${tempURL}/${resource}?userId=${userId}`).then(data =>
        data.json()
      );
    }
  },

  delete: {
    value: function(resource, id) {
      return fetch(`${tempURL}/${resource}/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        }
      }).then(e => e.json());
    }
  },

  post: {
    value: function(newObject, resource) {
      return fetch(`${tempURL}/${resource}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newObject)
      }).then(data => data.json());
    }
  },

  put: {
    value: function(editedObject, resource) {
      return fetch(`${tempURL}/${resource}/${editedObject.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(editedObject)
      }).then(data => data.json());
    }
  },

  patch: {
    value: function(patchedObject, resource) {
      return fetch(`${tempURL}/${resource}/${patchedObject.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(patchedObject)
      }).then(data => data.json());
    }
  }
});
