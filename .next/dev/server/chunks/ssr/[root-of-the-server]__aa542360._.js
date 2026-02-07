module.exports = [
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/fs [external] (fs, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("fs", () => require("fs"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/http2 [external] (http2, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http2", () => require("http2"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[project]/factory/crudFactory.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** @format */ __turbopack_context__.s([
    "$crud",
    ()=>$crud,
    "CrudFactory",
    ()=>CrudFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$notistack$2f$notistack$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/notistack/notistack.esm.js [app-ssr] (ecmascript)");
;
;
class CrudFactory {
    dateFormat = "MMMM Do YYYY hh:mm A";
    BASE_URL = "https://nexus-backend-sghn.onrender.com/api/";
    // BASE_URL: string = "http://192.168.244.90:9000/api/";
    getUrl(...segments) {
        return segments.reduce((url, segment)=>url + segment, "");
    }
    async get(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "GET",
            url: `${this.BASE_URL}${url}`,
            data,
            ...requestOptions
        });
    }
    async post(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url: `${this.BASE_URL}${url}`,
            data,
            ...requestOptions
        });
    }
    async create(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "POST",
            url: `${this.BASE_URL}create/${url}`,
            data,
            ...requestOptions
        });
    }
    async retrieve(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "GET",
            url: `${this.BASE_URL}retrieve/admin/${url}`,
            data,
            ...requestOptions
        });
    }
    async update(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "PUT",
            url: `${this.BASE_URL}update/admin/${url}`,
            data,
            ...requestOptions
        });
    }
    async delete(url, data = {}, requestOptions = {}) {
        return this.send({
            method: "DELETE",
            url: `${this.BASE_URL}delete/admin/${url}`,
            data,
            ...requestOptions
        });
    }
    async uploadFile(url, formData, requestOptions = {}) {
        const fullUrl = `${this.BASE_URL}${url}`;
        const token = localStorage.getItem("token") || "";
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].post(fullUrl, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data"
                },
                validateStatus: (status)=>status === 200 || status === 400 || status === 401 || status === 201,
                ...requestOptions.ajaxOptions
            });
            if (response.status === 200 || response.status === 201) {
                const res = response.data;
                if (requestOptions.notify !== false) {
                    await this.notify({
                        message: res.message,
                        type: res.type
                    });
                }
                if (res.type === "error") throw res;
                return res;
            } else {
                const res = response.data;
                await this.notify({
                    message: res.message,
                    type: "error"
                });
                throw res;
            }
        } catch (e) {
            if (!e.message) {
                await this.notify({
                    message: "Something went wrong at our end.",
                    type: "error"
                });
            }
            throw e;
        }
    }
    async notify({ message, type }) {
        if (message) {
            console.log(message, "message");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$notistack$2f$notistack$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["enqueueSnackbar"])(message, {
                variant: type,
                autoHideDuration: 3000
            });
        }
    }
    async send(requestOptions = {}) {
        const { url = "", data = {}, method = "GET", notify = true } = requestOptions;
        const options = {
            ...requestOptions.ajaxOptions,
            method,
            data
        };
        const fullUrl = this.getUrl(url);
        const token = localStorage.getItem("token") || "";
        options.headers = {
            ...options.headers,
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        };
        let res = {
            data: [],
            message: "",
            type: "error",
            errors: []
        };
        const finalOptions = {
            ...options,
            url: fullUrl,
            validateStatus: (status)=>status === 200 || status === 400 || status === 401 || status === 201
        };
        try {
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"])(finalOptions);
            if (response.status === 200 || response.status === 201) {
                res = response.data;
                const { type, message } = res;
                if (method !== "GET" && notify) {
                    await this.notify({
                        message,
                        type
                    });
                }
            } else if (response.status === 401 || response.status === 400) {
                res = response.data;
                const { message } = res;
                await this.notify({
                    message,
                    type: "error"
                });
            } else {
                throw new Error(`${response.status} : ${response.statusText}`);
            }
        } catch (e) {
            await this.notify({
                message: "Something went wrong at our end.",
                type: "error"
            });
            throw e;
        }
        if (res.type === "error") throw res;
        return res;
    }
}
const $crud = new CrudFactory();
}),
"[project]/services/studentsService.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudentsService",
    ()=>StudentsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/factory/crudFactory.ts [app-ssr] (ecmascript)");
;
class StudentsService {
    // Transform raw API student data to our StudentData interface
    static transformStudent(student) {
        return {
            id: student.id?.toString() || Math.random().toString(),
            name: student.name || "—",
            email: student.email || "—",
            phone: student.phone || "—",
            dob: student.dob ? new Date(student.dob).toLocaleDateString() : "—",
            courses: student.enrolledCourses || student.courses || 0
        };
    }
    static async fetchStudents(params) {
        try {
            let url = "retrieve/organization/students";
            if (params) {
                url += `?page=${params.page}&limit=${params.limit}`;
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["$crud"].get(url);
            // Handle the actual API response structure: response.data.rows
            //   @ts-ignore
            if (response.data?.rows && Array.isArray(response.data.rows)) {
                // @ts-ignore
                return response.data.rows.map(this.transformStudent);
            } else {
                console.warn("Unexpected API response format:", response);
                return [];
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            throw error;
        }
    }
    static async fetchStudentsWithMeta(params) {
        try {
            let url = "retrieve/organization/students";
            if (params) {
                url += `?page=${params.page}&limit=${params.limit}`;
            }
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["$crud"].get(url);
            // @ts-ignore
            if (response.data?.rows && Array.isArray(response.data.rows)) {
                // @ts-ignore
                const students = response.data.rows.map(this.transformStudent);
                //   @ts-ignore
                const totalRecords = response.data.totalRecords || students.length;
                const currentPage = params?.page ?? 0;
                const limit = params?.limit || totalRecords;
                const totalPages = Math.ceil(totalRecords / limit);
                return {
                    students,
                    totalRecords,
                    currentPage,
                    totalPages,
                    hasNextPage: currentPage < totalPages - 1,
                    hasPrevPage: currentPage > 0
                };
            } else {
                console.warn("Unexpected API response format:", response);
                return {
                    students: [],
                    totalRecords: 0,
                    currentPage: 0,
                    totalPages: 0,
                    hasNextPage: false,
                    hasPrevPage: false
                };
            }
        } catch (error) {
            console.error("Error fetching students:", error);
            throw error;
        }
    }
    static async createStudent(studentData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["$crud"].post("create/organization/student", studentData);
            if (response.data) {
                return this.transformStudent(response.data);
            }
            throw new Error("Failed to create student");
        } catch (error) {
            console.error("Error creating student:", error);
            throw error;
        }
    }
    static async updateStudent(id, studentData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["$crud"].update(`update/organization/student/${id}`, studentData);
            if (response.data) {
                return this.transformStudent(response.data);
            }
            throw new Error("Failed to update student");
        } catch (error) {
            console.error("Error updating student:", error);
            throw error;
        }
    }
    static async getStudent(id) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["$crud"].get(`retrieve/organization/students/${id}`);
            if (response.data) {
                return this.transformStudent(response.data);
            }
            return null;
        } catch (error) {
            console.error("Error fetching student:", error);
            throw error;
        }
    }
    static async bulkCreateStudents(csvFile) {
        try {
            const formData = new FormData();
            formData.append("csv", csvFile);
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["$crud"].uploadFile("create/organization/students/bulk", formData);
            if (response.data && Array.isArray(response.data)) {
                return response.data.map(this.transformStudent);
            }
            return [];
        } catch (error) {
            console.error("Error bulk creating students:", error);
            throw error;
        }
    }
    static async fetchAvailableCourses(params) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["$crud"].get(`retrieve/organization/assigned/courses?search=${params?.search || ""}`);
            // @ts-ignore
            return response.data?.assignedCourses || [];
        } catch (error) {
            return [];
        }
    }
}
}),
"[project]/hooks/useStudents.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useStudents",
    ()=>useStudents
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/studentsService.ts [app-ssr] (ecmascript)");
;
;
const useStudents = (initialParams)=>{
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [paginatedData, setPaginatedData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        students: [],
        totalRecords: 0,
        currentPage: 0,
        totalPages: 0,
        hasNextPage: false,
        hasPrevPage: false
    });
    const [pagination, setPagination] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialParams || {
        page: 0,
        limit: 10
    });
    const fetchStudents = async (params)=>{
        try {
            setIsLoading(true);
            setError(null);
            const currentParams = params || pagination;
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StudentsService"].fetchStudentsWithMeta(currentParams);
            setPaginatedData(data);
            setPagination(currentParams);
        } catch (err) {
            console.error("Error fetching students:", err);
            setError(err.message || "Failed to fetch students data");
            setPaginatedData({
                students: [],
                totalRecords: 0,
                currentPage: 0,
                totalPages: 0,
                hasNextPage: false,
                hasPrevPage: false
            });
        } finally{
            setIsLoading(false);
        }
    };
    const goToPage = (page)=>{
        if (page >= 0 && page <= paginatedData.totalPages - 1) {
            fetchStudents({
                ...pagination,
                page
            });
        }
    };
    const changeLimit = (limit)=>{
        fetchStudents({
            page: 0,
            limit
        });
    };
    const nextPage = ()=>{
        if (paginatedData.hasNextPage) {
            goToPage(paginatedData.currentPage + 1);
        }
    };
    const prevPage = ()=>{
        if (paginatedData.hasPrevPage) {
            goToPage(paginatedData.currentPage - 1);
        }
    };
    const refetch = ()=>{
        fetchStudents(pagination);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchStudents();
    }, []);
    return {
        // Data
        students: paginatedData.students,
        totalRecords: paginatedData.totalRecords,
        currentPage: paginatedData.currentPage,
        totalPages: paginatedData.totalPages,
        hasNextPage: paginatedData.hasNextPage,
        hasPrevPage: paginatedData.hasPrevPage,
        // State
        isLoading,
        error,
        pagination,
        // Actions
        refetch,
        goToPage,
        changeLimit,
        nextPage,
        prevPage
    };
};
}),
"[project]/components/ui/skeleton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Skeleton",
    ()=>Skeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Skeleton({ className, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        "data-slot": "skeleton",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("bg-accent animate-pulse rounded-md", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/skeleton.tsx",
        lineNumber: 5,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/ui/courseSkeleton.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CourseSkeleton",
    ()=>CourseSkeleton
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/skeleton.tsx [app-ssr] (ecmascript)");
;
;
;
function CourseSkeleton({ rows = 10 }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
        children: Array.from({
            length: rows
        }).map((_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "overflow-hidden border-foreground/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-between items-start gap-2 mb-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-10 w-10 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/courseSkeleton.tsx",
                                    lineNumber: 12,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-6 w-24 rounded-full"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/courseSkeleton.tsx",
                                    lineNumber: 14,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/courseSkeleton.tsx",
                            lineNumber: 10,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "line-clamp-2 text-balance",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-6 w-3/4 mb-2"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/courseSkeleton.tsx",
                                    lineNumber: 17,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-4 w-1/2"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/courseSkeleton.tsx",
                                    lineNumber: 18,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/courseSkeleton.tsx",
                            lineNumber: 16,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                            className: "line-clamp-2 text-balance mt-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-4 w-full mb-1"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/courseSkeleton.tsx",
                                    lineNumber: 21,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$skeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Skeleton"], {
                                    className: "h-4 w-5/6"
                                }, void 0, false, {
                                    fileName: "[project]/components/ui/courseSkeleton.tsx",
                                    lineNumber: 22,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/ui/courseSkeleton.tsx",
                            lineNumber: 20,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/ui/courseSkeleton.tsx",
                    lineNumber: 9,
                    columnNumber: 11
                }, this)
            }, index, false, {
                fileName: "[project]/components/ui/courseSkeleton.tsx",
                lineNumber: 8,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/ui/courseSkeleton.tsx",
        lineNumber: 6,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/courses/course-grid.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CourseGrid",
    ()=>CourseGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/studentsService.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useStudents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/hooks/useStudents.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$courseSkeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/courseSkeleton.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
;
;
;
function CourseGrid({ searchQuery }) {
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])([]);
    const { isLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$hooks$2f$useStudents$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useStudents"])({
        page: 0,
        limit: 10
    });
    const fetchCourses = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (query)=>{
        // Replace with your actual API call
        const data = await __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentsService$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["StudentsService"].fetchAvailableCourses({
            search: query
        });
        setCourses(data);
    }, []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        fetchCourses(searchQuery);
    }, [
        searchQuery,
        fetchCourses
    ]);
    if (isLoading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$courseSkeleton$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CourseSkeleton"], {}, void 0, false, {
            fileName: "[project]/components/courses/course-grid.tsx",
            lineNumber: 36,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
        children: courses.length === 0 && courses.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "col-span-full text-center py-8 text-muted-foreground",
            children: [
                'No courses found matching "',
                searchQuery,
                '"'
            ]
        }, void 0, true, {
            fileName: "[project]/components/courses/course-grid.tsx",
            lineNumber: 42,
            columnNumber: 9
        }, this) : courses.map((c, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Card"], {
                className: "overflow-hidden border-foreground/50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "line-clamp-2 text-balance",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start gap-2",
                                children: [
                                    c.course.name,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-main-bg",
                                        children: [
                                            "Remaining Tokens : ",
                                            c.remainingToken,
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "text-white",
                                                children: c.remainingToken
                                            }, void 0, false, {
                                                fileName: "[project]/components/courses/course-grid.tsx",
                                                lineNumber: 54,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/courses/course-grid.tsx",
                                        lineNumber: 52,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/courses/course-grid.tsx",
                                lineNumber: 50,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/courses/course-grid.tsx",
                            lineNumber: 49,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CardDescription"], {
                            className: "line-clamp-2 text-balance",
                            children: c.course.description
                        }, void 0, false, {
                            fileName: "[project]/components/courses/course-grid.tsx",
                            lineNumber: 58,
                            columnNumber: 15
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/courses/course-grid.tsx",
                    lineNumber: 48,
                    columnNumber: 13
                }, this)
            }, index, false, {
                fileName: "[project]/components/courses/course-grid.tsx",
                lineNumber: 47,
                columnNumber: 11
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/courses/course-grid.tsx",
        lineNumber: 40,
        columnNumber: 5
    }, this);
}
}),
"[project]/components/ui/input.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-ssr] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["cn"])("file:text-foreground cursor-pointer  dark:hover:bg-input/80 placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]", "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
;
}),
"[project]/components/courses/course-filters.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CourseFilters",
    ()=>CourseFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-ssr] (ecmascript) <export default as Search>");
"use client";
;
;
;
;
function CourseFilters({ onSearchChange }) {
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    // Debounce search
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const timer = setTimeout(()=>{
            onSearchChange(inputValue);
        }, 300);
        return ()=>clearTimeout(timer);
    }, [
        inputValue,
        onSearchChange
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex-1 max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                    className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/components/courses/course-filters.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Input"], {
                    placeholder: "Search courses...",
                    className: "pl-9",
                    value: inputValue,
                    onChange: (e)=>setInputValue(e.target.value)
                }, void 0, false, {
                    fileName: "[project]/components/courses/course-filters.tsx",
                    lineNumber: 24,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/courses/course-filters.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/courses/course-filters.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/(admin)/courses/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CoursesPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$course$2d$grid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/courses/course-grid.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$course$2d$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/courses/course-filters.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
function CoursesPage() {
    const [searchQuery, setSearchQuery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-semibold tracking-tight",
                            children: "Courses"
                        }, void 0, false, {
                            fileName: "[project]/app/(admin)/courses/page.tsx",
                            lineNumber: 14,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-muted-foreground mt-1",
                            children: "View learning content"
                        }, void 0, false, {
                            fileName: "[project]/app/(admin)/courses/page.tsx",
                            lineNumber: 15,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/(admin)/courses/page.tsx",
                    lineNumber: 13,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/(admin)/courses/page.tsx",
                lineNumber: 12,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$course$2d$filters$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CourseFilters"], {
                onSearchChange: setSearchQuery
            }, void 0, false, {
                fileName: "[project]/app/(admin)/courses/page.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$courses$2f$course$2d$grid$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CourseGrid"], {
                searchQuery: searchQuery
            }, void 0, false, {
                fileName: "[project]/app/(admin)/courses/page.tsx",
                lineNumber: 20,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/(admin)/courses/page.tsx",
        lineNumber: 11,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__aa542360._.js.map