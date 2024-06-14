import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import APIInstance from '../API';

// Fungsi untuk mengambil data (GET)
const fetchData = async ({ queryKey }) => {
  const [_key, endpoint] = queryKey;
  const { data } = await APIInstance.get(endpoint, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  return data;
};

// Fungsi untuk melakukan login
const login = async ({ endpoint, loginData }) => {
  const { data } = await APIInstance.post(endpoint, loginData);
  return data;
};

// Fungsi untuk membuat data (POST)
const postData = async ({ endpoint, newData }) => {
  const { data } = await APIInstance.post(endpoint, newData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  return data;
};

// Fungsi untuk membuat data (POST Multipart Form)
const postFormData = async ({ endpoint, newData }) => {
  const { data } = await APIInstance.post(endpoint, newData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": 'multipart/form-data',
    }
  });
  return data;
};


// Fungsi untuk memperbarui data (PUT)
const updateData = async ({ endpoint, updatedData }) => {
  const { data } = await APIInstance.put(endpoint, updatedData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  return data;
};

// Fungsi untuk memperbarui data Form (PUT)
const updateFormData = async ({ endpoint, updatedData }) => {
  const { data } = await APIInstance.put(endpoint, updatedData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": 'multipart/form-data',
    }
  });
  return data;
};

// Fungsi untuk memperbarui data Form (PATCH)
const patchFormData = async ({ endpoint, updatedData }) => {
  const { data } = await APIInstance.patch(endpoint, updatedData, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`,
      "Content-Type": 'multipart/form-data',
    }
  });
  return data;
};

// Fungsi untuk menghapus data (DELETE)
const deleteData = async ({ endpoint }) => {
  const { data } = await APIInstance.delete(endpoint, {
    headers: {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
  });
  return data;
};

// Fokus import yang ada dibawah :

// Hook untuk mengirim data
export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

// Hook untuk mengambil data
export const useFetch = (endpoint, queryKey) => {
  return useQuery({
    queryKey: [queryKey, endpoint],
    queryFn: fetchData,
    enabled: !!endpoint,
  });
};

// Hook untuk mengirim data
export const usePostData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

// Hook untuk mengirim data form
export const usePostFormData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postFormData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

// Hook untuk memperbarui data
export const useUpdateData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

// Hook untuk memperbarui data Form
export const useUpdateFormData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateFormData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

// Hook untuk memperbarui data Form
export const usePatchFormData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: patchFormData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

// Hook untuk menghapus data
export const useDeleteData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteData,
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};