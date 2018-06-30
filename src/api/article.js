import axios from 'axios';
// 新增内容
export const addNewArticleApi = ({ params }) => axios.post(`/api/article`, params);
// 获取文章内容
export const getArticleApi = ({ articleId }) => axios.get(`/api/article/${articleId}`);
// 保存编辑文章内容
export const editArticleApi = ({ alpha, params }) => axios.put(`/api/article/${alpha}`, params);
// 获取文章列表
export const getArticleListApi = (params) => axios.get(`/api/article`, {params});
// 删除文章
export const deleteArticleApi = ({ articleId }) => axios.delete(`/api/article/${articleId}`);
// 删除图片
export const deleteFileApi = ({ articleId, params }) => axios.delete(`/api/file/${articleId}`, {params});

