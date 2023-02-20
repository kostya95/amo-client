import api from "./connection";
import { useValidationError } from "./store/errors";

class Storage {
  names = {};
  getValues(name) {
    return JSON.parse(JSON.stringify(this.names[name].values));
  }
  async storeValues(name, data) {
    const clearData = {};
    const store = useValidationError();
    store.clear();
    Object.entries(data).forEach((el) => {
      if (el[1]) {
        clearData[el[0]] = el[1];
      }
    });
    try {
      const response = await api.post(this.names[name].apiLink, clearData);
      const id = response.data;
      data.id = id;
      this.names[name].values.unshift(data);
      sessionStorage.setItem(name, JSON.stringify(this.names[name].values));
      return data;
    } catch (e) {
      if (e.response.status == 400) {
        e.response.data.message.forEach((el) => {
          Object.values(el.constraints).forEach((err) => {
            store.add(name + "." + el.property, err);
          });
        });
      }
      return null;
    }
  }
  add(name, apiLink) {
    this.names[name] = {};
    this.names[name].apiLink = apiLink;
    let values = JSON.parse(sessionStorage.getItem(name));
    if (!values) values = [];
    this.names[name].values = values;
  }
}

const storage = new Storage();

export default storage;
