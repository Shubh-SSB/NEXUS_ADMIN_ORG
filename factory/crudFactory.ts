/** @format */

import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { enqueueSnackbar } from "notistack";

interface RequestOptions extends AxiosRequestConfig {
  url?: string;
  data?: Record<string, any>;
  notify?: boolean;
  ajaxOptions?: AxiosRequestConfig;
}

interface NotifyOptions {
  message: string;
  type: string;
}

interface ResponseData {
  data: any[];
  message: string;
  type: "error" | "success";
  errors?: any[];
}

export class CrudFactory {
  dateFormat: string = "MMMM Do YYYY hh:mm A";
  BASE_URL: string = "https://nexus-backend-sghn.onrender.com/api/";
  // BASE_URL: string = "http://192.168.244.90:9000/api/";

  getUrl(...segments: string[]): string {
    return segments.reduce((url, segment) => url + segment, "");
  }

  async get(
    url: string,
    data: Record<string, any> = {},
    requestOptions: RequestOptions = {},
  ) {
    return this.send({
      method: "GET",
      url: `${this.BASE_URL}${url}`,
      data,
      ...requestOptions,
    });
  }

  async post(
    url: string,
    data: Record<string, any> = {},
    requestOptions: RequestOptions = {},
  ) {
    return this.send({
      method: "POST",
      url: `${this.BASE_URL}${url}`,
      data,
      ...requestOptions,
    });
  }

  async create(
    url: string,
    data: Record<string, any> = {},
    requestOptions: RequestOptions = {},
  ) {
    return this.send({
      method: "POST",
      url: `${this.BASE_URL}create/${url}`,
      data,
      ...requestOptions,
    });
  }

  async retrieve(
    url: string,
    data: Record<string, any> = {},
    requestOptions: RequestOptions = {},
  ) {
    return this.send({
      method: "GET",
      url: `${this.BASE_URL}retrieve/admin/${url}`,
      data,
      ...requestOptions,
    });
  }

  async update(
    url: string,
    data: Record<string, any> = {},
    requestOptions: RequestOptions = {},
  ) {
    return this.send({
      method: "PUT",
      url: `${this.BASE_URL}update/admin/${url}`,
      data,
      ...requestOptions,
    });
  }

  async delete(
    url: string,
    data: Record<string, any> = {},
    requestOptions: RequestOptions = {},
  ) {
    return this.send({
      method: "DELETE",
      url: `${this.BASE_URL}delete/admin/${url}`,
      data,
      ...requestOptions,
    });
  }

  async uploadFile(
    url: string,
    formData: FormData,
    requestOptions: RequestOptions = {},
  ): Promise<ResponseData> {
    const fullUrl = `${this.BASE_URL}${url}`;
    const token = localStorage.getItem("token") || "";

    try {
      const response = await axios.post(fullUrl, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
        validateStatus: (status) =>
          status === 200 || status === 400 || status === 401 || status === 201,
        ...requestOptions.ajaxOptions,
      });

      if (response.status === 200 || response.status === 201) {
        const res = response.data;
        if (requestOptions.notify !== false) {
          await this.notify({ message: res.message, type: res.type });
        }
        if (res.type === "error") throw res;
        return res;
      } else {
        const res = response.data;
        await this.notify({ message: res.message, type: "error" });
        throw res;
      }
    } catch (e: any) {
      if (!e.message) {
        await this.notify({
          message: "Something went wrong at our end.",
          type: "error",
        });
      }
      throw e;
    }
  }

  async notify({ message, type }: NotifyOptions) {
    if (message) {
      console.log(message, "message");
      enqueueSnackbar(message, {
        variant: type as "success" | "error" | "info" | "warning",
        autoHideDuration: 3000,
      });
    }
  }

  async send(requestOptions: RequestOptions = {}): Promise<ResponseData> {
    const {
      url = "",
      data = {},
      method = "GET",
      notify = true,
    } = requestOptions;

    const options: AxiosRequestConfig = {
      ...requestOptions.ajaxOptions,
      method,
      data,
    };

    const fullUrl = this.getUrl(url);
    const token = localStorage.getItem("token") || "";

    options.headers = {
      ...options.headers,
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    let res: ResponseData = {
      data: [],
      message: "",
      type: "error",
      errors: [],
    };

    const finalOptions: AxiosRequestConfig = {
      ...options,
      url: fullUrl,
      validateStatus: (status) =>
        status === 200 || status === 400 || status === 401 || status === 201,
    };

    try {
      const response: AxiosResponse<ResponseData> = await axios(finalOptions);

      if (response.status === 200 || response.status === 201) {
        res = response.data;
        const { type, message } = res;

        if (method !== "GET" && notify) {
          await this.notify({ message, type });
        }
      } else if (response.status === 401 || response.status === 400) {
        res = response.data;
        const { message } = res;
        await this.notify({ message, type: "error" });
      } else {
        throw new Error(`${response.status} : ${response.statusText}`);
      }
    } catch (e) {
      await this.notify({
        message: "Something went wrong at our end.",
        type: "error",
      });
      throw e;
    }

    if (res.type === "error") throw res;

    return res;
  }
}

export const $crud = new CrudFactory();
