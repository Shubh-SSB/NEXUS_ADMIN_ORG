(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/factory/crudFactory.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/** @format */ __turbopack_context__.s([
    "$crud",
    ()=>$crud,
    "CrudFactory",
    ()=>CrudFactory
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/axios/lib/axios.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$notistack$2f$notistack$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/notistack/notistack.esm.js [app-client] (ecmascript)");
;
;
class CrudFactory {
    dateFormat = "MMMM Do YYYY hh:mm A";
    BASE_URL = "https://nexus-backend-sghn.onrender.com/api/";
    // BASE_URL: string = "http://192.168.0.107:8000/api/";
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
    async notify({ message, type }) {
        if (message) {
            console.log(message, "message");
            (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$notistack$2f$notistack$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enqueueSnackbar"])(message, {
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
            const response = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$axios$2f$lib$2f$axios$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"])(finalOptions);
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/services/studentsService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "StudentsService",
    ()=>StudentsService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/factory/crudFactory.ts [app-client] (ecmascript)");
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$crud"].get(url);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$crud"].get(url);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$crud"].post("create/organization/student", studentData);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$crud"].update(`update/organization/student/${id}`, studentData);
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
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$crud"].get(`retrieve/organization/students/${id}`);
            if (response.data) {
                return this.transformStudent(response.data);
            }
            return null;
        } catch (error) {
            console.error("Error fetching student:", error);
            throw error;
        }
    }
    static async bulkCreateStudents(studentsData) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$crud"].post("create/organization/students/bulk", {
                students: studentsData
            });
            if (response.data && Array.isArray(response.data)) {
                return response.data.map(this.transformStudent);
            }
            throw new Error("Failed to bulk create students");
        } catch (error) {
            console.error("Error bulk creating students:", error);
            throw error;
        }
    }
    static async fetchAvailableCourses() {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$factory$2f$crudFactory$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["$crud"].get("retrieve/organization/assigned/courses");
            // @ts-ignore
            return response.data?.assignedCourses || [];
        } catch (error) {
            console.error("Error fetching courses:", error);
            return [];
        }
    }
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/courses/course-grid.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CourseGrid",
    ()=>CourseGrid
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/services/studentsService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function CourseGrid() {
    _s();
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CourseGrid.useEffect": ()=>{
            __TURBOPACK__imported__module__$5b$project$5d2f$services$2f$studentsService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StudentsService"].fetchAvailableCourses().then({
                "CourseGrid.useEffect": (data)=>setCourses(data)
            }["CourseGrid.useEffect"]);
        }
    }["CourseGrid.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid gap-6 md:grid-cols-2 lg:grid-cols-3",
        children: courses.map((c)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                className: "overflow-hidden",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                            className: "line-clamp-2 text-balance",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-start gap-2",
                                children: [
                                    c.course.name,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-medium text-muted-foreground",
                                        children: [
                                            "Remaining Tokens : ",
                                            c.remainingToken
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/courses/course-grid.tsx",
                                        lineNumber: 28,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/courses/course-grid.tsx",
                                lineNumber: 26,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/courses/course-grid.tsx",
                            lineNumber: 25,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardDescription"], {
                            className: "line-clamp-2 text-balance",
                            children: c.course.description
                        }, void 0, false, {
                            fileName: "[project]/components/courses/course-grid.tsx",
                            lineNumber: 33,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/courses/course-grid.tsx",
                    lineNumber: 24,
                    columnNumber: 11
                }, this)
            }, c.id, false, {
                fileName: "[project]/components/courses/course-grid.tsx",
                lineNumber: 23,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/courses/course-grid.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
_s(CourseGrid, "Ks3haE1eP87BHv/TJ29co0rtnQM=");
_c = CourseGrid;
var _c;
__turbopack_context__.k.register(_c, "CourseGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/courses/course-filters.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CourseFilters",
    ()=>CourseFilters
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
"use client";
;
;
;
function CourseFilters() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative flex-1 max-w-md",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                    className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/components/courses/course-filters.tsx",
                    lineNumber: 9,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                    placeholder: "Search courses...",
                    className: "pl-9"
                }, void 0, false, {
                    fileName: "[project]/components/courses/course-filters.tsx",
                    lineNumber: 10,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/courses/course-filters.tsx",
            lineNumber: 8,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/courses/course-filters.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = CourseFilters;
var _c;
__turbopack_context__.k.register(_c, "CourseFilters");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1d0563a2._.js.map