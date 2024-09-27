import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { container } from '@spos/services/common';
import { CatalogueServiceWorkflow, TYPES } from "@spos/services/common";


@Controller('remoteCatalogue')
@ApiTags('remoteCatalogue')
export class RemoteGroupController {
    constructor(
        @inject(TYPES.CatalogueService) private catalogueService: CatalogueService
    ) {}
    
    @Get('filteredCatalog')
    async getFilteredCatalog(@Query('offerName') offerName: string) {
        return this.catalogueService.getFilteredCatalog(offerName);
    }
}