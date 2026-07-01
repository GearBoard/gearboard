import { departmentRepository } from "../department.repository.js";
import { DepartmentOutputDTO } from "../dto/get-departments.dto.js";

export async function getDepartmentsService() {
    const departments = await departmentRepository.findAll();

    return departments.map((d) =>
        DepartmentOutputDTO.toDTO(d)
    );
}