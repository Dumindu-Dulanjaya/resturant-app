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
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  menuImageFileFilter,
  menuImageStorage,
  maxMenuImageFileSize,
} from '../config/menu-image-multer.config';
import { MenusService } from './menus.service';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '../auth/enums/role.enum';

interface RequestWithUser extends Request {
  user: {
    id: number;
    email: string;
    restaurantId?: number;
    isSuperAdmin?: boolean;
  };
}

@Controller('menus')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN, UserRole.SUPER_ADMIN)
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: menuImageStorage,
      fileFilter: menuImageFileFilter,
      limits: { fileSize: maxMenuImageFileSize },
    }),
  )
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      return {
        success: false,
        message: 'No file uploaded',
      };
    }

    const imageUrl = `/uploads/menus/${file.filename}`;

    return {
      success: true,
      message: 'Menu image uploaded successfully',
      imageUrl,
      filename: file.filename,
      size: file.size,
    };
  }

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
