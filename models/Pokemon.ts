import { Table, Column, Model, PrimaryKey, AutoIncrement} from 'sequelize-typescript';

@Table
class Pokemon extends Model<Pokemon> {
    @PrimaryKey
    @AutoIncrement
    @Column
    id: number;

    @Column
    tipo: string;

    @Column
    treinador: string;

    @Column
    nivel: number;
}

export default Pokemon;