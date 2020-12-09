/*
 * Copyright (c) 2020. This code created and belongs to Atlas render manager project.
 * Owner and project architect: Danil Andreev | danssg08@gmail.com |  https://github.com/DanilAndreev
 * Project: atlas-core
 * File last modified: 09.12.2020, 18:43
 * All rights reserved.
 */

import {EntitySubscriberInterface, UpdateEvent} from "typeorm";
import RenderTaskAttempt from "../entities/RenderTaskAttempt";
import User from "../entities/User";
import WebSocket from "../core/WebSocket";
import {CWS_RENDER_TASK_UPDATE} from "../globals";


export default class RenderTaskAttemptSubscriber implements EntitySubscriberInterface<RenderTaskAttempt> {
    listenTo(): Function | string {
        return RenderTaskAttempt;
    }

    public async afterUpdate(event: UpdateEvent<RenderTaskAttempt>): Promise<any> {
        try {
            const attempt: RenderTaskAttempt = await RenderTaskAttempt.findOne({
                where: {id: event.databaseEntity.id},
                relations: ["task", "task.job", "task.job.organization", "task.job.organization.users"]
            });

            const users: User[] = attempt.task.job.organization.users;

            for (const user of users) {
                WebSocket.sendToUser(user.id, {type: CWS_RENDER_TASK_UPDATE, payload: {id: attempt.task.id}});
            }
        } catch (error) {
            //TODO: handle
        }
    }
}