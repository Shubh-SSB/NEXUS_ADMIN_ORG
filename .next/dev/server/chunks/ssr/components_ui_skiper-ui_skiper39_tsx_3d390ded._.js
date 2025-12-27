module.exports = [
"[project]/components/ui/skiper-ui/skiper39.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "CrowdCanvas",
    ()=>CrowdCanvas,
    "Skiper39",
    ()=>Skiper39
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/gsap@3.14.2/node_modules/gsap/index.js [app-ssr] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/.pnpm/next@16.0.10_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
;
const CrowdCanvas = ({ src, rows = 15, cols = 7 })=>{
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
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
        const randomRange = (min, max)=>min + Math.random() * (max - min);
        const randomIndex = (array)=>randomRange(0, array.length) | 0;
        const removeFromArray = (array, i)=>array.splice(i, 1)[0];
        const removeItemFromArray = (array, item)=>removeFromArray(array, array.indexOf(item));
        const removeRandomFromArray = (array)=>removeFromArray(array, randomIndex(array));
        const getRandomFromArray = (array)=>array[randomIndex(array) | 0];
        // TWEEN FACTORIES
        const resetPeep = ({ stage, peep })=>{
            const direction = Math.random() > 0.5 ? 1 : -1;
            const offsetY = 100 - 250 * __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].parseEase("power2.in")(Math.random());
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
        };
        const normalWalk = ({ peep, props })=>{
            const { startX, startY, endX } = props;
            const xDuration = 10;
            const yDuration = 0.25;
            const tl = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].timeline();
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
        };
        const walks = [
            normalWalk
        ];
        // FACTORY FUNCTIONS
        const createPeep = ({ image, rect })=>{
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
                setRect: (rect)=>{
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
                },
                render: (ctx)=>{
                    ctx.save();
                    ctx.translate(peep.x, peep.y);
                    ctx.scale(peep.scaleX, 1);
                    ctx.drawImage(peep.image, peep.rect[0], peep.rect[1], peep.rect[2], peep.rect[3], 0, 0, peep.width, peep.height);
                    ctx.restore();
                }
            };
            peep.setRect(rect);
            return peep;
        };
        // MAIN
        const img = document.createElement("img");
        const stage = {
            width: 0,
            height: 0
        };
        const allPeeps = [];
        const availablePeeps = [];
        const crowd = [];
        const createPeeps = ()=>{
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
        };
        const initCrowd = ()=>{
            while(availablePeeps.length){
                addPeepToCrowd().walk.progress(Math.random());
            }
        };
        const addPeepToCrowd = ()=>{
            const peep = removeRandomFromArray(availablePeeps);
            const walk = getRandomFromArray(walks)({
                peep,
                props: resetPeep({
                    peep,
                    stage
                })
            }).eventCallback("onComplete", ()=>{
                removePeepFromCrowd(peep);
                addPeepToCrowd();
            });
            peep.walk = walk;
            crowd.push(peep);
            crowd.sort((a, b)=>a.anchorY - b.anchorY);
            return peep;
        };
        const removePeepFromCrowd = (peep)=>{
            removeItemFromArray(crowd, peep);
            availablePeeps.push(peep);
        };
        const render = ()=>{
            if (!canvas) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.scale(devicePixelRatio, devicePixelRatio);
            crowd.forEach((peep)=>{
                peep.render(ctx);
            });
            ctx.restore();
        };
        const resize = ()=>{
            if (!canvas) return;
            stage.width = canvas.clientWidth;
            stage.height = canvas.clientHeight;
            canvas.width = stage.width * devicePixelRatio;
            canvas.height = stage.height * devicePixelRatio;
            crowd.forEach((peep)=>{
                peep.walk.kill();
            });
            crowd.length = 0;
            availablePeeps.length = 0;
            availablePeeps.push(...allPeeps);
            initCrowd();
        };
        const init = ()=>{
            createPeeps();
            resize();
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.add(render);
        };
        img.onload = init;
        img.src = config.src;
        const handleResize = ()=>resize();
        window.addEventListener("resize", handleResize);
        return ()=>{
            window.removeEventListener("resize", handleResize);
            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$gsap$40$3$2e$14$2e$2$2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$locals$3e$__["gsap"].ticker.remove(render);
            crowd.forEach((peep)=>{
                if (peep.walk) peep.walk.kill();
            });
        };
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: "absolute bottom-0 h-[90vh] w-full"
    }, void 0, false, {
        fileName: "[project]/components/ui/skiper-ui/skiper39.tsx",
        lineNumber: 281,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const Skiper39 = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative h-full w-full bg-white text-black",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-linear-to-b after:from-white after:to-black after:content-['']",
                    children: "Croud Canvas"
                }, void 0, false, {
                    fileName: "[project]/components/ui/skiper-ui/skiper39.tsx",
                    lineNumber: 289,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/ui/skiper-ui/skiper39.tsx",
                lineNumber: 288,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 h-full w-screen",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f2e$pnpm$2f$next$40$16$2e$0$2e$10_react$2d$dom$40$19$2e$2$2e$0_react$40$19$2e$2$2e$0_$5f$react$40$19$2e$2$2e$0$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(CrowdCanvas, {
                    src: "/images/all-peeps.png",
                    rows: 10,
                    cols: 5
                }, void 0, false, {
                    fileName: "[project]/components/ui/skiper-ui/skiper39.tsx",
                    lineNumber: 294,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/ui/skiper-ui/skiper39.tsx",
                lineNumber: 293,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/ui/skiper-ui/skiper39.tsx",
        lineNumber: 287,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
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
];

//# sourceMappingURL=components_ui_skiper-ui_skiper39_tsx_3d390ded._.js.map