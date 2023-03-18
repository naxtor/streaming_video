import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";
import Layout from "./Components/Layout";

import "../css/app.css";

createInertiaApp({
    resolve: (name) => import(`./Pages/${name}.jsx`),
    setup({ el, App, props }) {
        render(<Layout App={App} props={props} />, el);
    },
});
