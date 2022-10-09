import { RuanRequest } from "../../utils";

export const getBrandListApi = (data) => {
    return RuanRequest("/brand/list", data, 'get')
};