export const filrMenus = [
  {
    label: "价格",
    ename: "retail_price",
    key: "order"
  },
  {
    label: "风格",
    ename: "styleId",
    key: "styleId"
  },
  {
    label: "产地",
    ename: "productPlace",
    key: "productPlace"
  },
  {
    label: "材质",
    ename: "texture",
    key: "texture"
  }
]


export const formMap = {
  retail_price: "order",
  styleId: "styleId",
  productPlace: "productPlace",
  texture: "texture"
}

export const mapSearchPaneKes = {
  order: {
    label: 'name',
    value: 'value'
  },
  texture: {
    label: 'desc',
    value: 'code'
  },
  styleId: {
    label: 'value',
    value: 'id'
  },
  productPlace: {
    label: 'desc',
    value: 'code'
  }
}


export const orderPrice = [
  {
    name: '不限',
    value: '',
  },
  {
    name: '由高到低',
    value: 'desc',
  },
  {
    name: '由低到高',
    value: 'asc',
  },
]