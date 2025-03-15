import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
    layout("./layouts/AuthenticatedLayout.tsx", [
        index("./routes/home.tsx"),
        route("/counter", "./routes/counter.tsx"),
        route("/products", "./routes/products.tsx"),
    ]),
    layout("./layouts/GuestLayout.tsx", [
        route("/login", "./routes/login.tsx"),
    ]),
] satisfies RouteConfig;
