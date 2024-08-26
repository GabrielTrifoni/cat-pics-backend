import { PartialType } from "@nestjs/mapped-types";
import { CreateCatDto } from "./cat/create-cat.dto";

export class UpdateCatDto extends PartialType(CreateCatDto) {
    
}