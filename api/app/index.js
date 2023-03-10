import { RuanRequest } from "utils"

export const checkedVersionApi = data => {
  return RuanRequest('/log/getVersionIsNew', data, 'get')
}