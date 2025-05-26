import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePerfilDto } from './dto/create-perfil.dto';
import { UpdatePerfilDto } from './dto/update-perfil.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Perfil } from './entities/perfil.entity';
import { FindManyOptions, Repository } from 'typeorm';

@Injectable()
export class PerfilService {
  constructor(
    @InjectRepository(Perfil) private readonly perfilRepository : Repository<Perfil>
  ){}
  create(createPerfilDto: CreatePerfilDto) {
    const user = this.perfilRepository.create(createPerfilDto)
    return this.perfilRepository.save(user)
  }

  findAll() {
    return this.perfilRepository.find();
  }

  async findOne(id: number) {
    const options:FindManyOptions<Perfil>={
      where:{
        id
      }
    }
    const perfil= await this.perfilRepository.findOne(options)
    if(!perfil){
      throw new NotFoundException('Perfil no encontrado')
    }
    return perfil;
  }

  async update(id: number, updatePerfilDto: UpdatePerfilDto) {
    const perfil = await this.findOne(id)
    perfil.name = updatePerfilDto.name
    return await this.perfilRepository.save(perfil);
  }

  async remove(id: number) {
    const perfil = await this.findOne(id)
    await this.perfilRepository.remove(perfil)
    return "Perfil eliminado";
  }
}
