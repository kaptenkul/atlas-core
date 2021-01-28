/*
 * Copyright (c) 2021. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-core
 * File last modified: 1/28/21, 3:03 PM
 * All rights reserved.
 */

import Controller from "../core/Controller";


namespace Route {
    export interface Meta {
        method: string;
        route: string;
    }
}

function Route(method: "GET" | "POST" | "PUT" | "DELETE", route: string) {
    return (
        target: Controller,
        propertyKey: string,
        descriptor: PropertyDescriptor,
    ) => {
        if (!target.meta) target.meta = {};
        if (!target.meta.routes) target.meta.routes = {};
        target.meta.routes[propertyKey] = {method, route};
    }
}

export default Route;
