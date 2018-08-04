import axios from 'axios';
// 新增内容
export const addNewArtifactApi = ({ params }) => axios.post(`/api/artifact`, params);
