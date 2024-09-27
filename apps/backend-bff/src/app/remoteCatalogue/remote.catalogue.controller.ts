import { Controller, Get, Query } from '@nestjs/common';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { container } from '@spos/services/common';
import { CatalogueService, TYPES, CategorizedCatalog } from "@spos/services/common";
import { MenuItem, MenuItemCategoryEnum } from '@spos/clients-menu';

export class MenuItemDto implements MenuItem {
    @ApiProperty()
    '_id': string;
  
    @ApiProperty()
    'fullName': string;
  
    @ApiProperty()
    'shortName': string;
  
    @ApiProperty()
    'price': number;
  
    @ApiProperty({ enum: MenuItemCategoryEnum })
    'category': MenuItemCategoryEnum;
  
    @ApiProperty()
    'image': string;
}

export class CategorizedCatalogDto {
    @ApiProperty({ type: 'object', additionalProperties: { type: 'array', items: { $ref: '#/components/schemas/MenuItemDto' } } })
    categories: Record<string, MenuItemDto[]>;
}

@Controller('remoteCatalogue')
@ApiTags('remoteCatalogue')
export class RemoteCatalogueController {
    @Get('filteredCatalog')
    async getFilteredCatalog(@Query('offerName') offerName: string): Promise<CategorizedCatalogDto> {
        const catalog = await container.get<CatalogueService>(TYPES.CatalogueService).getFilteredCatalog(offerName);
        return { categories: catalog };
    }

    @Get('items')
    async getFullItemFromItemIdsArray(@Query('ids') ids: string): Promise<MenuItemDto[]> {
        const idList = ids.split(',');
        return container.get<CatalogueService>(TYPES.CatalogueService).getFullItemFromItemIdsArray(idList);
    }
}