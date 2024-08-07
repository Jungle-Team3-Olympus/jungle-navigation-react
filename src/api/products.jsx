import { axiosCRUDInstance } from "./axios";

// 상품 등록
export const createProduct = async (productDto, imgFiles) => {
  const formData = new FormData();

  Object.keys(productDto).forEach((key) => {
    formData.append(key, productDto[key]);
  });

  imgFiles.forEach((file) => {
    formData.append("imgFiles", file);
  });

  try {
    const response = await axiosCRUDInstance.post("/api/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
      // data: {
      //   productDto : productDto,
      //   imgFiles : imgFiles,
      // }
    });
    return response.data;
  } catch (error) {
    // throw error;
  }
};

// 모든 상품 조회
export const getAllProducts = async () => {
  try {
    const response = await axiosCRUDInstance.get("/api/products");
    return response.data;
  } catch (error) {
    // throw error;
  }
};

// 특정 상품 조회
export const getProductById = async (id) => {
  try {
    const response = await axiosCRUDInstance.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    // throw error;
  }
};

// 상품 수정
export const updateProduct = async (id, productDto, imgFiles) => {
  const formData = new FormData();

  Object.keys(productDto).forEach((key) => {
    formData.append(key, productDto[key]);
  });

  imgFiles.forEach((file) => {
    formData.append("imgFiles", file);
  });

  try {
    const response = await axiosCRUDInstance.put(
      `/api/products/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    // throw error;
  }
};

// 상품 삭제
export const deleteProduct = async (id) => {
  try {
    const response = await axiosCRUDInstance.delete(`/api/products/${id}`);
    return response.status;
  } catch (error) {
    // throw error;
  }
};

// 특정 상품의 이미지 파일들 조회
export const getProductFiles = async (productId) => {
  try {
    const response = await axiosCRUDInstance.get(
      `/api/products/${productId}/files`
    );
    return response.data;
  } catch (error) {
    // throw error;
  }
};

// 구매 희망 등록
export const createPurchaseWish = async (productId) => {
  try {
    const response = await axiosCRUDInstance.post(
      "/api/purchase-wish?productId=" + productId
    );
    if (response.status === 201) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    // throw error;
  }
};

// 판매자 확인 로직
export const checkSellerTrueOrFalse = async (username, productId) => {
  try {
    const response = await axiosCRUDInstance.post(
      `/api/products/check`,
      { id: username, productId: productId },
      {
        headers: {
          "Content-Type": "application/json",
          authorization: "Bearer " + sessionStorage.getItem("user"),
        },
      }
    );
    return response.data;
  } catch (error) {
    // throw error;
  }
};

// 판매자의 판매 제품 확인
export const checkSellerProduct = async () => {
  try {
    const response = await axiosCRUDInstance.get(`/api/products/my`, {
      headers: {
        "Content-Type": "application/json",
        authorization: "Bearer " + sessionStorage.getItem("user"),
      },
    });
    return response.data;
  } catch (error) {
    // throw error;
  }
};
