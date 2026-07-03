import type { Department } from "../../../../generated/prisma/client.js";

export class DepartmentOutputDTO {
    id!: string;
    name!: string;

    static toDTO(department: Department): DepartmentOutputDTO {
        return {
            id: department.id,
            name: department.name,
        };
    }
}