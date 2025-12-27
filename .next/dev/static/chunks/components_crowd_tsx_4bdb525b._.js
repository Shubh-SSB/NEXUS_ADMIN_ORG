(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/crowd.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CrowdCanvas",
    ()=>CrowdCanvas,
    "Skiper39",
    ()=>Skiper39
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
const CrowdCanvas = ({ src, rows = 15, cols = 7 })=>{
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CrowdCanvas.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            const config = {
                src,
                rows,
                cols
            };
            // UTILS
            const randomRange = {
                "CrowdCanvas.useEffect.randomRange": (min, max)=>min + Math.random() * (max - min)
            }["CrowdCanvas.useEffect.randomRange"];
            const randomIndex = {
                "CrowdCanvas.useEffect.randomIndex": (array)=>randomRange(0, array.length) | 0
            }["CrowdCanvas.useEffect.randomIndex"];
            const removeFromArray = {
                "CrowdCanvas.useEffect.removeFromArray": (array, i)=>array.splice(i, 1)[0]
            }["CrowdCanvas.useEffect.removeFromArray"];
            const removeItemFromArray = {
                "CrowdCanvas.useEffect.removeItemFromArray": (array, item)=>removeFromArray(array, array.indexOf(item))
            }["CrowdCanvas.useEffect.removeItemFromArray"];
            const removeRandomFromArray = {
                "CrowdCanvas.useEffect.removeRandomFromArray": (array)=>removeFromArray(array, randomIndex(array))
            }["CrowdCanvas.useEffect.removeRandomFromArray"];
            const getRandomFromArray = {
                "CrowdCanvas.useEffect.getRandomFromArray": (array)=>array[randomIndex(array) | 0]
            }["CrowdCanvas.useEffect.getRandomFromArray"];
            // TWEEN FACTORIES
            const resetPeep = {
                "CrowdCanvas.useEffect.resetPeep": ({ stage, peep })=>{
                    const direction = Math.random() > 0.5 ? 1 : -1;
                    const offsetY = 100 - 250 * __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].parseEase("power2.in")(Math.random());
                    const startY = stage.height - peep.height + offsetY;
                    let startX;
                    let endX;
                    if (direction === 1) {
                        startX = -peep.width;
                        endX = stage.width;
                        peep.scaleX = 1;
                    } else {
                        startX = stage.width + peep.width;
                        endX = 0;
                        peep.scaleX = -1;
                    }
                    peep.x = startX;
                    peep.y = startY;
                    peep.anchorY = startY;
                    return {
                        startX,
                        startY,
                        endX
                    };
                }
            }["CrowdCanvas.useEffect.resetPeep"];
            const normalWalk = {
                "CrowdCanvas.useEffect.normalWalk": ({ peep, props })=>{
                    const { startX, startY, endX } = props;
                    const xDuration = 10;
                    const yDuration = 0.25;
                    const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline();
                    tl.timeScale(randomRange(0.5, 1.5));
                    tl.to(peep, {
                        duration: xDuration,
                        x: endX,
                        ease: "none"
                    }, 0);
                    tl.to(peep, {
                        duration: yDuration,
                        repeat: xDuration / yDuration,
                        yoyo: true,
                        y: startY - 10
                    }, 0);
                    return tl;
                }
            }["CrowdCanvas.useEffect.normalWalk"];
            const walks = [
                normalWalk
            ];
            // FACTORY FUNCTIONS
            const createPeep = {
                "CrowdCanvas.useEffect.createPeep": ({ image, rect })=>{
                    const peep = {
                        image,
                        rect: [],
                        width: 0,
                        height: 0,
                        drawArgs: [],
                        x: 0,
                        y: 0,
                        anchorY: 0,
                        scaleX: 1,
                        walk: null,
                        setRect: {
                            "CrowdCanvas.useEffect.createPeep": (rect)=>{
                                peep.rect = rect;
                                peep.width = rect[2];
                                peep.height = rect[3];
                                peep.drawArgs = [
                                    peep.image,
                                    ...rect,
                                    0,
                                    0,
                                    peep.width,
                                    peep.height
                                ];
                            }
                        }["CrowdCanvas.useEffect.createPeep"],
                        render: {
                            "CrowdCanvas.useEffect.createPeep": (ctx)=>{
                                ctx.save();
                                ctx.translate(peep.x, peep.y);
                                ctx.scale(peep.scaleX, 1);
                                ctx.drawImage(peep.image, peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3], 0, 0, peep.width, peep.height);
                                ctx.restore();
                            }
                        }["CrowdCanvas.useEffect.createPeep"]
                    };
                    peep.setRect(rect);
                    return peep;
                }
            }["CrowdCanvas.useEffect.createPeep"];
            // MAIN
            const img = document.createElement("img");
            const stage = {
                width: 0,
                height: 0
            };
            const allPeeps = [];
            const availablePeeps = [];
            const crowd = [];
            const createPeeps = {
                "CrowdCanvas.useEffect.createPeeps": ()=>{
                    const { rows, cols } = config;
                    const { naturalWidth: width, naturalHeight: height } = img;
                    const total = rows * cols;
                    const rectWidth = width / rows;
                    const rectHeight = height / cols;
                    for(let i = 0; i < total; i++){
                        allPeeps.push(createPeep({
                            image: img,
                            rect: [
                                i % rows * rectWidth,
                                (i / rows | 0) * rectHeight,
                                rectWidth,
                                rectHeight
                            ]
                        }));
                    }
                }
            }["CrowdCanvas.useEffect.createPeeps"];
            const initCrowd = {
                "CrowdCanvas.useEffect.initCrowd": ()=>{
                    while(availablePeeps.length){
                        addPeepToCrowd().walk.progress(Math.random());
                    }
                }
            }["CrowdCanvas.useEffect.initCrowd"];
            const addPeepToCrowd = {
                "CrowdCanvas.useEffect.addPeepToCrowd": ()=>{
                    const peep = removeRandomFromArray(availablePeeps);
                    const walk = getRandomFromArray(walks)({
                        peep,
                        props: resetPeep({
                            peep,
                            stage
                        })
                    }).eventCallback("onComplete", {
                        "CrowdCanvas.useEffect.addPeepToCrowd.walk": ()=>{
                            removePeepFromCrowd(peep);
                            addPeepToCrowd();
                        }
                    }["CrowdCanvas.useEffect.addPeepToCrowd.walk"]);
                    peep.walk = walk;
                    crowd.push(peep);
                    crowd.sort({
                        "CrowdCanvas.useEffect.addPeepToCrowd": (a, b)=>a.anchorY - b.anchorY
                    }["CrowdCanvas.useEffect.addPeepToCrowd"]);
                    return peep;
                }
            }["CrowdCanvas.useEffect.addPeepToCrowd"];
            const removePeepFromCrowd = {
                "CrowdCanvas.useEffect.removePeepFromCrowd": (peep)=>{
                    removeItemFromArray(crowd, peep);
                    availablePeeps.push(peep);
                }
            }["CrowdCanvas.useEffect.removePeepFromCrowd"];
            const render = {
                "CrowdCanvas.useEffect.render": ()=>{
                    if (!canvas) return;
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.save();
                    ctx.scale(devicePixelRatio, devicePixelRatio);
                    crowd.forEach({
                        "CrowdCanvas.useEffect.render": (peep)=>{
                            peep.render(ctx);
                        }
                    }["CrowdCanvas.useEffect.render"]);
                    ctx.restore();
                }
            }["CrowdCanvas.useEffect.render"];
            const resize = {
                "CrowdCanvas.useEffect.resize": ()=>{
                    if (!canvas) return;
                    stage.width = canvas.clientWidth;
                    stage.height = canvas.clientHeight;
                    canvas.width = stage.width * devicePixelRatio;
                    canvas.height = stage.height * devicePixelRatio;
                    crowd.forEach({
                        "CrowdCanvas.useEffect.resize": (peep)=>{
                            peep.walk.kill();
                        }
                    }["CrowdCanvas.useEffect.resize"]);
                    crowd.length = 0;
                    availablePeeps.length = 0;
                    availablePeeps.push(...allPeeps);
                    initCrowd();
                }
            }["CrowdCanvas.useEffect.resize"];
            const init = {
                "CrowdCanvas.useEffect.init": ()=>{
                    createPeeps();
                    resize();
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.add(render);
                }
            }["CrowdCanvas.useEffect.init"];
            img.onload = init;
            img.src = config.src;
            const handleResize = {
                "CrowdCanvas.useEffect.handleResize": ()=>resize()
            }["CrowdCanvas.useEffect.handleResize"];
            window.addEventListener("resize", handleResize);
            return ({
                "CrowdCanvas.useEffect": ()=>{
                    window.removeEventListener("resize", handleResize);
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.remove(render);
                    crowd.forEach({
                        "CrowdCanvas.useEffect": (peep)=>{
                            if (peep.walk) peep.walk.kill();
                        }
                    }["CrowdCanvas.useEffect"]);
                }
            })["CrowdCanvas.useEffect"];
        }
    }["CrowdCanvas.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute bottom-0 h-[90vh] w-full"
    }, void 0, false, {
        fileName: "[project]/components/crowd.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CrowdCanvas, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = CrowdCanvas;
const Skiper39 = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-full w-full bg-white text-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']",
                    children: "Croud Canvas"
                }, void 0, false, {
                    fileName: "[project]/components/crowd.tsx",
                    lineNumber: 289,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/crowd.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 h-full w-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CrowdCanvas, {
                    src: "/images/peeps/all-peeps.png",
                    rows: 15,
                    cols: 7
                }, void 0, false, {
                    fileName: "[project]/components/crowd.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/crowd.tsx",
                lineNumber: 293,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/crowd.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c1 = Skiper39;
;
var _c, _c1;
__turbopack_context__.k.register(_c, "CrowdCanvas");
__turbopack_context__.k.register(_c1, "Skiper39");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
 /**
 * Skiper 39 Canvas_Landing_004 — React + Canvas
 * Inspired by and adapted from https://codepen.io/zadvorsky/pen/xxwbBQV
 * illustration by https://www.openpeeps.com/
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 * These animations aren’t associated with the codepen.io . They’re independent recreations meant to study interaction design
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */ }),
]);

//# sourceMappingURL=components_crowd_tsx_4bdb525b._.js.map