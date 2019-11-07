/**
 * vf-OS vApp 4.3 Endpoints
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: 1.0.0
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */

export interface GlobalControlInformation {
    id?: number;
    cps?: string;
    mo?: string;
    ope?: string;
    product?: string;
    product_cost?: string;
    ressource_cost?: string;
    control_type?: string;
    control_size?: string;
    measure?: string;
    max_tolerence?: string;
    customer?: string;
    defect_rate?: any;
    production_rate?: any;
    total_nc_cost?: any;
    total_shutdown_cost?: any;
    impact?:any;
}