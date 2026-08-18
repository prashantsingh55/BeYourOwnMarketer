module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[project]/app/api/seats/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/db.ts [app-route] (ecmascript)");
;
;
async function GET(req) {
    try {
        const { searchParams } = new URL(req.url);
        const city = searchParams.get('city') || 'Kathmandu Hub';
        const batch = searchParams.get('batch') || 'Daytime / Afternoon (12:00 PM - 3:00 PM)';
        const sessionDate = searchParams.get('sessionDate');
        let seats = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seat.findMany({
            where: {
                city,
                batch
            },
            orderBy: [
                {
                    row: 'asc'
                },
                {
                    seatNumber: 'asc'
                }
            ]
        });
        // If no seats exist for this city + batch combination, seed a standard 5×5 grid (rows A–E, seats 1–5)
        if (seats.length === 0) {
            const rows = [
                'A',
                'B',
                'C',
                'D',
                'E'
            ];
            const seatsPerRow = 5;
            const createdSeats = [];
            for (const row of rows){
                for(let i = 1; i <= seatsPerRow; i++){
                    const seatNumber = `${row}${i}`;
                    const seatId = `${city}-${batch}-${seatNumber}`;
                    const isVip = row === 'A'; // Front row = VIP
                    createdSeats.push({
                        id: seatId,
                        city,
                        batch,
                        seatNumber,
                        row,
                        status: isVip ? 'vip' : 'available',
                        isVip,
                        priceNpr: 15000
                    });
                }
            }
            for (const seat of createdSeats){
                await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seat.upsert({
                    where: {
                        id: seat.id
                    },
                    update: {},
                    create: seat
                });
            }
            seats = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].seat.findMany({
                where: {
                    city,
                    batch
                },
                orderBy: [
                    {
                        row: 'asc'
                    },
                    {
                        seatNumber: 'asc'
                    }
                ]
            });
        }
        // Query active Bookings for this city, batch, and session date to block booked seats
        const bookingWhere = {
            city,
            batch,
            paymentStatus: {
                not: 'cancelled'
            }
        };
        if (sessionDate) {
            bookingWhere.sessionDate = sessionDate;
        }
        const activeBookings = await __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].booking.findMany({
            where: bookingWhere,
            select: {
                selectedSeatId: true,
                seatId: true
            }
        });
        // Create a Set of all booked seat identifiers
        const bookedSeatSet = new Set();
        for (const b of activeBookings){
            if (b.selectedSeatId) {
                const shortNum = b.selectedSeatId.includes('-') ? b.selectedSeatId.split('-').pop() : b.selectedSeatId;
                bookedSeatSet.add(shortNum.toUpperCase().trim());
                bookedSeatSet.add(b.selectedSeatId.trim());
            }
            if (b.seatId) {
                bookedSeatSet.add(b.seatId.trim());
            }
        }
        // Format seats and set status dynamically per session
        const formattedSeats = seats.map((s)=>{
            const isSeatBooked = bookedSeatSet.has(s.seatNumber.toUpperCase().trim()) || bookedSeatSet.has(s.id.trim()) || s.status === 'booked' || s.status === 'reserved';
            return {
                id: s.id,
                seatLabel: s.seatNumber,
                row: s.row,
                number: parseInt(s.seatNumber.replace(/[^\d]/g, ''), 10) || 1,
                status: isSeatBooked ? 'booked' : s.isVip ? 'vip' : 'available',
                isVip: s.isVip,
                priceNpr: s.priceNpr
            };
        });
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            seats: formattedSeats
        });
    } catch (error) {
        console.error('Error fetching seats:', error);
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error?.message || 'Failed to fetch seats'
        }, {
            status: 500
        });
    }
}
}),
"[project]/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        'query',
        'error',
        'warn'
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__083ao52._.js.map