import api from "./index";

const get_data = () =>
  api.get("/hdoves").then(res => res);

export default get_data;
