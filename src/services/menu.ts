import request from '@/utils/request'

// 获取全部菜单
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll',
  })
}
// 按条件分页查询菜单
export const getMenuPages = (params: any) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getMenuPages',
    params,
  })
}

// 新增或编辑菜单
export const saveOrUpdate = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data,
  })
}
// 获取编辑菜单页面信息
export const getEditMenuInfo = (id: string | number) => {
  return request({
    method: 'GET',
    url: `/boss/menu/getEditMenuInfo?id=${id}`,
  })
}
// 获取编辑菜单页面信息
export const deleteMenuInfo = (id: string) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`,
  })
}
