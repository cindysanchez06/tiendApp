import { fetchService } from "./constants";

const URI_REGISTER = "/mark/create";
const URI_GET = "/mark/list";
const URI_EDIT = "/mark/edit";
const URI_DELETE = "/mark/delete";

class MarkService {
  async register(data) {
    return fetchService({
          method: "POST",
          uri: URI_REGISTER,
          data: { name: data.name, reference: data.reference },
        });
  }

  async edit(data) {
    return fetchService({
      method: "POST",
      uri: `${URI_EDIT}/${data.id}`,
      data: { name: data.name, reference: data.reference },
    });
  }

  async getList() {
    return fetchService({
          method: "GET",
          uri: URI_GET,
        });
  }

  async delete(id) {
    return fetchService({
          method: "DELETE",
          uri: `${URI_DELETE}/${id}`,
        });
  }
}

export default new MarkService();
