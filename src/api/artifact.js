import axios from 'axios';
// 新增内容
export const addNewArtifactApi = ({ params }) => axios.post(`/api/artifact`, params);
// 获取文章内容
export const getArtifactApi = ({ artifactId }) => axios.get(`/api/artifact/${artifactId}`);
// 保存编辑文章内容
export const editArtifactApi = ({ artifactId, params }) => axios.put(`/api/artifact/${artifactId}`, params);
// 获取文章列表
export const getArtifactListApi = (params) => axios.get(`/api/artifact`, {params});
// 删除文章
export const deleteArtifactApi = ({ artifactId }) => axios.delete(`/api/artifact/${artifactId}`);
// 删除图片
export const deleteFileApi = ({ artifactId, params }) => axios.delete(`/api/file/${artifactId}`, {params});
// 获取字体列表
export const getFontListApi = (params) => axios.get(`/api/font_list`, {params});
