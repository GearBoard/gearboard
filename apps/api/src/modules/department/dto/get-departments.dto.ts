import type { Department } from "../department.repository.js";

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