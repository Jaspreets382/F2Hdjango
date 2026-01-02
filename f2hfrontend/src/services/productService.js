import API from "../api/axios";

export const getProducts = async () => {
  const res = await API.get("products/");
  return res.data;
};

export const deleteProduct=async(productId)=>{
  await API.post(`products/${productId}/delete`)
}

export const createProduct=async(data)=>{
  const res=await API.post('products/',data)
  return res.data

}

export const updateProduct=async(productId,data)=>{
  const res = await API.patch(`products/${productId}/edit`,data)
  return res.data
}