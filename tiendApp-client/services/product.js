import { fetchService } from "./constants";

const URI_REGISTER = "/product/create";
const URI_GET = '/product/list';
const URI_DELETE = "/product/delete";
const URI_EDIT = "/product/edit";

class ProductService {
  async register(data) {
    return fetchService({
          method: "POST",
          uri: URI_REGISTER,
          data: { ...data },
        });
  }

  async getList() {
    return fetchService({
          method: "GET",
          uri: URI_GET,
        });
  }

  async edit(data) {
    return fetchService({
      method: "POST",
      uri: `${URI_EDIT}/${data.id}`,
      data: { ...data },
    });
  }

  async delete(id) {
    return fetchService({
          method: "DELETE",
          uri: `${URI_DELETE}/${id}`,
        });
  }
}

export default new ProductService();
