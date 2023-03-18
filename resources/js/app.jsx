import React from "react";
import { render } from "react-dom";
import { createInertiaApp } from "@inertiajs/inertia-react";

createInertiaApp({
    resolve: name => import(`./Pages/${name}.jsx`),
    setup({ el, App, props }) {
        render(<App {...props} />, el);
    }
});