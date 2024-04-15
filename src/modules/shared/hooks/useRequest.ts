import axios from "axios";
import { useState } from "react"
import Swal from "sweetalert2";

export const useRequest = () => {
  const [loading, setLoading] = useState(false);

  const getRequest = async (url: string) => {
    setLoading(true);
    await axios({
      method: 'get',
      url: 'http://localhost:3002',
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Swal.fire({
        title: 'Erro!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })
  }

  const authRequest = async <T>(url: string, body: any): Promise<T> => {
    setLoading(true);
    const resultData = await axios({
      method: 'post',
      url: 'http://localhost:3002/users/auth',
      data: body
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Swal.fire({
        title: 'Erro!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })

    return resultData;
  }

  const taskGetRequest = async <T>(url: string): Promise<T> => {
    const resultData = await axios({
      method: 'get',
      url: "http://localhost:3002" + url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Swal.fire({
        title: 'Erro!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })

    return resultData;
  }

  const taskPutRequest = async <T>(url: string, body: any): Promise<T> => {
    setLoading(true);
    const resultData = await axios({
      method: 'put',
      url: "http://localhost:3002" + url,
      data: body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Swal.fire({
        title: 'Erro!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })

    return resultData;
  }

  const taskDeleteRequest = async <T>(url: string): Promise<T> => {
    setLoading(true);
    const resultData = await axios({
      method: 'delete',
      url: "http://localhost:3002" + url,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Swal.fire({
        title: 'Erro!',
        text: error.response.data.message,
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })

    return resultData;
  }

  const taskPostRequest = async <T>(url: string, body: any): Promise<T> => {
    setLoading(true);
    const resultData = await axios({
      method: 'post',
      url: 'http://localhost:3002/task/',
      data: body,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`
      }
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      Swal.fire({
        title: 'Erro!',
        text: "Houve um erro. Faça login novamente",
        icon: 'error',
        confirmButtonText: 'Ok'
      })
    })

    return resultData;
  }

  return {
    loading,
    getRequest,
    authRequest,
    taskGetRequest,
    taskPutRequest,
    taskDeleteRequest,
    taskPostRequest
  }
}