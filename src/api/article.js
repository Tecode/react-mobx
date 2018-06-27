import axios from 'axios';

// 新增内容
export const addNewArticleApi = () => axios.post(`/api/article`);
