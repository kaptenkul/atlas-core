/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-core
 * File last modified: 11/12/20, 5:25 PM
 * All rights reserved.
 */

import "globals";
import {config} from "./config";
import envDispatcher from "./envDispatcher";

import SystemOptions from "./core/SystemOptions";
const options: SystemOptions.Options = {
    envMask: /ATLAS_(.+)/,
    additionalConfigs: [
        config
    ],
    envDispatcher
};
new SystemOptions(options);
console.log(SystemOptions.config);

import main from "./main";
main().then();


