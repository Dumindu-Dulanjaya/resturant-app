import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    restaurantId?: number;
    isSuperAdmin?: boolean;
  };
}

@Controller('menus')
@UseGuards(JwtAuthGuard)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post()
  create(@Body() createMenuDto: CreateMenuDto, @Request() req: RequestWithUser) {
    const restaurantId = req.user.isSuperAdmin
      ? (createMenuDto as any).restaurantId
      : req.user.restaurantId;

    return this.menusService.create(createMenuDto, restaurantId || 0);
  }

  @Get()
  findAll(@Request() req: RequestWithUser) {
    if (req.user.isSuperAdmin) {
      return this.menusService.findAllForSuperAdmin();
    }
    return this.menusService.findAll(req.user.restaurantId || 0);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.menusService.findOne(+id, req.user.restaurantId || 0);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMenuDto: UpdateMenuDto,
    @Request() req: RequestWithUser,
  ) {
    return this.menusService.update(
      +id,
      updateMenuDto,
      req.user.restaurantId || 0,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.menusService.remove(+id, req.user.restaurantId || 0);
  }
}
